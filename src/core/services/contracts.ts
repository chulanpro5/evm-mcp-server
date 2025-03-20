import { 
  type Address, 
  type Hash, 
  type Hex,
  type ReadContractParameters,
  type GetLogsParameters,
  type Log
} from 'viem';
import { getPublicClient, getWalletClient } from './clients.js';
import { resolveAddress } from './ens.js';
import { ERC20_ABI, ERC20_BYTECODE } from '../constants/erc20.js';


/**
 * Deploy a new ERC20 token contract
 * @param name Token name
 * @param symbol Token symbol
 * @param decimals Token decimals (default: 18)
 * @param totalSupply Total supply in tokens (default: 100,000,000)
 * @param network Network name or chain ID
 * @returns Transaction hash and contract address
 */
export async function deployERC20Token(
  privateKey: Hex,
  name: string,
  symbol: string,
  decimals: number = 18,
  totalSupply: number = 100000000,
  network = 'bsc-testnet'
): Promise<{ txHash: Hash; contractAddress: Address }> {
  const client = getWalletClient(privateKey, network);

  // Convert total supply to the correct number of decimals
  // const totalSupplyWithDecimals = parseUnits(
  //   totalSupply.toString(),
  //   decimals
  // );

  // Deploy the contract
  const txHash = await client.deployContract({
    abi: ERC20_ABI,
    bytecode: ERC20_BYTECODE,
    args: [name, symbol, decimals, totalSupply],
    account: client.account!,
    chain: client.chain
  });

  // Wait for the transaction to be mined to get the contract address
  const publicClient = getPublicClient(network);
  const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });

  if (!receipt.contractAddress) {
    throw new Error('Contract deployment failed: No contract address in receipt');
  }

  return {
    txHash,
    contractAddress: receipt.contractAddress
  };
}

/**
 * Read from a contract for a specific network
 */
export async function readContract(params: ReadContractParameters, network = 'ethereum') {
  const client = getPublicClient(network);
  return await client.readContract(params);
}

/**
 * Write to a contract for a specific network
 */
export async function writeContract(
  privateKey: Hex, 
  params: Record<string, any>, 
  network = 'ethereum'
): Promise<Hash> {
  const client = getWalletClient(privateKey, network);
  return await client.writeContract(params as any);
}

/**
 * Get logs for a specific network
 */
export async function getLogs(params: GetLogsParameters, network = 'ethereum'): Promise<Log[]> {
  const client = getPublicClient(network);
  return await client.getLogs(params);
}

/**
 * Check if an address is a contract
 * @param addressOrEns Address or ENS name to check
 * @param network Network name or chain ID
 * @returns True if the address is a contract, false if it's an EOA
 */
export async function isContract(addressOrEns: string, network = 'ethereum'): Promise<boolean> {
  // Resolve ENS name to address if needed
  const address = await resolveAddress(addressOrEns, network);
  
  const client = getPublicClient(network);
  const code = await client.getBytecode({ address });
  return code !== undefined && code !== '0x';
} 