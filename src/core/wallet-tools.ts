import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import * as walletTools from './wallet/index.js';
import { routerService } from './services/router.js';
import type { Hex } from 'viem';

/**
 * Register all wallet-related tools with the MCP server
 *
 * @param server The MCP server instance
 */
export function registerWalletTools(server: McpServer): void {
  // Define schemas for each tool using Zod
  const transferSchema = z.object({
    toAddress: z.string().describe('Recipient address or ENS name'),
    amount: z.string().describe('Amount to transfer as a string'),
    network: z
      .string()
      .optional()
      .describe('Network name or chain ID. Defaults to Ethereum mainnet.')
  });

  //   const tokenTransferSchema = transferSchema.extend({
  //     tokenAddress: z.string().describe('The contract address of the ERC20 token')
  //   });

  const swapSchema = z.object({
    privateKey: z
      .string()
      .describe(
        'Private key in hex format (with or without 0x prefix). SECURITY: This is used only for transaction signing and is not stored.'
      ),
    walletName: z.string().describe('Name of the stored wallet'),
    slippagePercent: z
      .string()
      .describe('Maximum slippage percentage allowed for the swap'),
    network: z
      .string()
      .describe('Network name or chain ID. Defaults to Ethereum mainnet.')
  });

  const buySchema = swapSchema.extend({
    amountWantToBuy: z.string().describe('Amount of USDT to buy')
  });

  const sellSchema = swapSchema.extend({
    amountToSell: z.string().describe('Amount of USDT to sell')
  });

  // Register swap tools
  server.tool(
    'buy_usdt_from_wallet',
    "Buy USDT using PancakeSwap's Router",
    buySchema.shape,
    async ({ privateKey, amountWantToBuy, slippagePercent, network }) => {
      try {
        const txHash = await routerService.executeBuyUSDT(
          privateKey as Hex,
          amountWantToBuy,
          network,
          Number.parseFloat(slippagePercent)
        );

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  success: true,
                  transactionHash: txHash,
                  slippagePercent,
                  amountWantToBuy,
                  network
                },
                null,
                2
              )
            }
          ]
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error executing swap: ${error instanceof Error ? error.message : String(error)}`
            }
          ],
          isError: true
        };
      }
    }
  );

  server.tool(
    'sell_usdt_from_wallet',
    "Sell USDT for ETH using PancakeSwap's Router",
    sellSchema.shape,
    async ({ privateKey, amountToSell, slippagePercent, network }) => {
      try {
        const txHash = await routerService.executeSellUSDT(
          privateKey as Hex,
          amountToSell,
          network,
          Number.parseFloat(slippagePercent)
        );

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  success: true,
                  transactionHash: txHash,
                  slippagePercent,
                  amountToSell,
                  network
                },
                null,
                2
              )
            }
          ]
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error executing swap: ${error instanceof Error ? error.message : String(error)}`
            }
          ],
          isError: true
        };
      }
    }
  );
}
