// import type { Tool, CallToolResult } from "@modelcontextprotocol/sdk/types.js";
// import { routerService } from "../services/router.js";

// type BuyUsdtParams = {
// 	privateKey: string;
// 	walletName: string;
// 	amountWantToBuy: string;
// 	slippagePercent: string;
// 	network?: string;
// };

// type SellUsdtParams = {
// 	privateKey: string;
// 	walletName: string;
// 	amountToSell: string;
// 	slippagePercent: string;
// 	network?: string;
// };

// export const buyUsdtFromWallet: Tool = {
// 	name: "buy_usdt_from_wallet",
// 	description: "Buy USDT using PancakeSwap's Router",
// 	inputSchema: {
// 		type: "object",
// 		properties: {
// 			privateKey: { type: "string", description: "Private key in hex format (with or without 0x prefix). SECURITY: This is used only for address derivation and is not stored." },
// 			walletName: { type: "string", description: "Name of the stored wallet to execute swap from" },
// 			amountWantToBuy: { type: "string", description: "Amount of USDT to buy" },
// 			slippagePercent: { type: "string", description: "Maximum slippage percentage (e.g., 0.5 for 0.5%)" },
// 			network: { type: "string", description: "Network name (default: bsc-testnet)" }
// 		},
// 		required: ["walletName", "amountWantToBuy", "slippagePercent"]
// 	},
// 	async execute({privateKey, walletName, amountWantToBuy, slippagePercent, network = 'bsc-testnet' }: BuyUsdtParams): Promise<CallToolResult> {
// 		try {
// const txHash = await routerService.executeBuyUSDT(
// privateKey,
// 				amountWantToBuy,
// 				Number.parseFloat(slippagePercent),
// 				network
// 			);

// 			return {
// 				content: [{
// 					type: "text",
// 					text: JSON.stringify({
// success: true,
// transactionHash: txHash,
// 						slippagePercent,
// 						amountWantToBuy,
// 						network
// 					}, null, 2)
// 				}]
// 			};
// 		} catch (error) {
// 			return {
// 				content: [{
// 					type: "text",
// 					text: `Error executing swap: ${error instanceof Error ? error.message : String(error)}`
// 				}],
// 				isError: true
// 			};
// 		}
// 	}
// };

// export const sellUsdtFromWallet: Tool = {
// 	name: "sell_usdt_from_wallet",
// 	description: "Sell USDT for ETH using PancakeSwap's Router",
// 	inputSchema: {
// 		type: "object",
// 		properties: {
// 			privateKey: { type: "string", description: "Private key in hex format (with or without 0x prefix). SECURITY: This is used only for address derivation and is not stored." },
// 			walletName: { type: "string", description: "Name of the stored wallet to execute swap from" },
// 			amountToSell: { type: "string", description: "Amount of USDT to sell" },
// 			slippagePercent: { type: "string", description: "Maximum slippage percentage (e.g., 0.5 for 0.5%)" },
// 			network: { type: "string", description: "Network name (default: bsc-testnet)" }
// 		},
// 		required: ["walletName", "amountToSell", "slippagePercent"]
// 	},
// 	async execute({privateKey, walletName, amountToSell, slippagePercent, network = 'bsc-testnet' }: SellUsdtParams): Promise<CallToolResult> {
// 		try {
// const txHash = await routerService.executeSellUSDT(
// privateKey,
// 				amountToSell,
// 				Number.parseFloat(slippagePercent),
// 				network
// 			);

// 			return {
// 				content: [{
// 					type: "text",
// 					text: JSON.stringify({
// success: true,
// transactionHash: txHash,
// 						slippagePercent,
// 						amountToSell,
// 						network
// 					}, null, 2)
// 				}]
// 			};
// 		} catch (error) {
// 			return {
// 				content: [{
// 					type: "text",
// 					text: `Error executing swap: ${error instanceof Error ? error.message : String(error)}`
// 				}],
// 				isError: true
// 			};
// 		}
// 	}
// };
