import {
  type Address,
  type Hash,
  type Hex,
  type ReadContractParameters,
  type GetLogsParameters,
  type Log,
  parseUnits,
  zeroAddress,
  getContract
} from 'viem';
import { getPublicClient, getWalletClient } from './clients.js';
import { resolveAddress } from './ens.js';
import {
  ERC20_ABI,
  ERC20_BYTECODE,
  ERC20_TAX_ABI,
  ERC20_TAX_BYTECODE,
  erc20InfoAbi
} from '../constants/erc20.js';
import { privateKeyToAccount } from 'viem/accounts';

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
  const receipt = await publicClient.waitForTransactionReceipt({
    hash: txHash
  });

  if (!receipt.contractAddress) {
    throw new Error(
      'Contract deployment failed: No contract address in receipt'
    );
  }

  return {
    txHash,
    contractAddress: receipt.contractAddress
  };
}

/**
 * Deploys an ERC20 token with tax functionality on buy/sell transactions
 *
 * This function deploys a custom ERC20 token that implements:
 * - Buy/sell fees that can be set independently
 * - Development fund address to receive collected fees
 * - Integration with DEX router for liquidity management
 * - Owner controls for fee adjustments and trading parameters
 *
 * @param name - Token name (e.g. "My Token")
 * @param symbol - Token symbol/ticker (e.g. "MTK")
 * @param dexRouter - DEX router contract address for liquidity pair creation
 * @param developmentFund - Address that receives collected transaction fees, defaults to zero address
 * @param percentageBuyFee - Fee percentage charged on buy transactions (e.g. 5 for 5%)
 * @param percentageSellFee - Fee percentage charged on sell transactions (e.g. 5 for 5%)
 * @param totalSupply - Total supply of tokens to mint (default: 100M)
 * @param network - Target blockchain network to deploy on (default: 'bsc-testnet')
 *
 * @returns Object containing transaction hash and deployed contract address
 * @throws Error if contract deployment fails or receipt lacks contract address
 */
export async function deployERC20TokenTax(
  privateKey: Hex,
  name: string,
  symbol: string,
  dexRouter: Address,
  developmentFund: Address = zeroAddress,
  percentageBuyFee: number = 0, // Default to 0% buy fee
  percentageSellFee: number = 0, // Default to 0% sell fee
  totalSupply: number = 100000000,
  network = 'bsc'
): Promise<{ txHash: Hash; contractAddress: Address }> {
  // Create wallet client with stored wallet
  const client = await getWalletClient(privateKey, network);

  // Convert total supply to the correct number of decimals
  const totalSupplyWithDecimals = parseUnits(totalSupply.toString(), 18);

  console.error(`totalSupplyWithDecimals: ${totalSupplyWithDecimals}`);
  console.error(
    `args: ${[
      name,
      symbol,
      totalSupplyWithDecimals,
      dexRouter,
      developmentFund,
      percentageBuyFee,
      percentageSellFee
    ]}`
  );

  // Deploy the contract
  const txHash = await client.deployContract({
    abi: ERC20_TAX_ABI,
    bytecode: ERC20_TAX_BYTECODE,
    args: [
      name,
      symbol,
      totalSupplyWithDecimals,
      dexRouter,
      developmentFund,
      percentageBuyFee,
      percentageSellFee
    ],
    account: client.account!,
    chain: client.chain
  });

  // Wait for the transaction to be mined to get the contract address
  const publicClient = getPublicClient(network);
  const receipt = await publicClient.waitForTransactionReceipt({
    hash: txHash
  });

  if (!receipt.contractAddress) {
    throw new Error(
      'Contract deployment failed: No contract address in receipt'
    );
  }

  return {
    txHash,
    contractAddress: receipt.contractAddress
  };
}

/**
 * Enable trading for a tax token contract
 */
export async function setSwapAndLiquifyEnabled(
  privateKey: Hex,
  contractAddress: string,
  enabled: boolean,
  network = 'bsc'
): Promise<Hash> {
  const client = await getWalletClient(privateKey, network);

  return await client.writeContract({
    address: contractAddress as `0x${string}`,
    chain: client.chain,
    account: client.account!,
    abi: [
      {
        inputs: [
          {
            internalType: 'bool',
            name: '_enabled',
            type: 'bool'
          }
        ],
        name: 'setSwapAndLiquifyEnabled',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      }
    ],
    functionName: 'setSwapAndLiquifyEnabled',
    args: [enabled]
  });
}

export async function enableTrading(
  privateKey: Hex,
  tokenAddress: string,
  maxHolder: string,
  maxBuy: string,
  swapAtAmount: string,
  network = 'bsc'
): Promise<Hash> {
  const client = await getWalletClient(privateKey, network);
  // Get token details
  const publicClient = getPublicClient(network);
  const contract = getContract({
    address: tokenAddress as `0x${string}`,
    abi: erc20InfoAbi,
    client: publicClient
  });

  // Get token decimals and symbol
  const decimals = await contract.read.decimals();

  // Parse the amount with the correct number of decimals
  const rawMaxHolder = parseUnits(maxHolder, decimals);
  const rawMaxBuy = parseUnits(maxBuy, decimals);
  const rawSwapAtAmount = parseUnits(swapAtAmount, decimals);

  return await client.writeContract({
    address: tokenAddress as `0x${string}`,
    chain: client.chain,
    account: client.account!,
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_maxHolder',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'maxBuy',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: '_swapAtAmt',
            type: 'uint256'
          }
        ],
        name: 'enableTrading',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      }
    ],
    functionName: 'enableTrading',
    args: [rawMaxHolder, rawMaxBuy, rawSwapAtAmount]
  });
}

/**
 * Write to a contract for a specific network using a stored wallet
 */
export async function writeContractWithStoredWallet(
  privKey: Hex,
  params: Record<string, any>,
  network = 'bsc'
): Promise<Hash> {
  const client = await getWalletClient(privKey, network);
  return await client.writeContract(params as any);
}

/**
 * Read from a contract for a specific network
 */
export async function readContract(
  params: ReadContractParameters,
  network = 'ethereum'
) {
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
export async function getLogs(
  params: GetLogsParameters,
  network = 'ethereum'
): Promise<Log[]> {
  const client = getPublicClient(network);
  return await client.getLogs(params);
}

/**
 * Check if an address is a contract
 * @param addressOrEns Address or ENS name to check
 * @param network Network name or chain ID
 * @returns True if the address is a contract, false if it's an EOA
 */
export async function isContract(
  addressOrEns: string,
  network = 'ethereum'
): Promise<boolean> {
  // Resolve ENS name to address if needed
  const address = await resolveAddress(addressOrEns, network);

  const client = getPublicClient(network);
  const code = await client.getBytecode({ address });
  return code !== undefined && code !== '0x';
}
