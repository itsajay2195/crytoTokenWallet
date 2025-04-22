// src/services/wallet.ts
import "react-native-get-random-values";
import "@ethersproject/shims";
import {
  ethers,
  Wallet,
  JsonRpcProvider, //jsonRpcProvider() is used for Ganache/Hardhat/Foundry
  formatEther,
  AlchemyProvider,
  parseEther,
  Contract,
  parseUnits,
} from "ethers";
import axios from "axios";
import { COVALENT_API_KEY } from "@env";

export const getETHBalance = async (privateKey: string) => {
  try {
    const sepoliaRpc = "https://rpc.sepolia.org";

    // ✅ Pass both RPC and network name or chainId
    const provider = new AlchemyProvider(
      "sepolia",
      "svEoaVYaL6yFL6Yjq9OiETXIVu39pnnf"
    );

    const wallet = new Wallet(privateKey, provider);

    const rawBalance = await provider.getBalance(wallet.address);
    const ethBalance = formatEther(rawBalance);

    // console.log("Address:", wallet.address);
    // console.log("ETH Balance:", ethBalance);

    return {
      address: wallet.address,
      balance: ethBalance,
      isValid: true,
    };
  } catch (error) {
    console.error("Error fetching balance:", error);
    return {
      address: "",
      balance: "0",
      isValid: false,
      message: "Error fetching balance:",
    };
  }
};

export const sendETH = async (
  privateKey: string,
  toAddress: string,
  amountInEth: string
): Promise<{ success: boolean; txHash?: string; error?: string }> => {
  try {
    const provider = new AlchemyProvider(
      "sepolia",
      "svEoaVYaL6yFL6Yjq9OiETXIVu39pnnf"
    );
    const wallet = new Wallet(privateKey, provider);
    const fromAddress = wallet.address;
    // Create and send transaction
    const tx = await wallet.sendTransaction({
      from: fromAddress,
      to: toAddress,
      value: parseEther(amountInEth),
    });

    console.log("Transaction sent:", tx.hash);

    // Wait for confirmation (optional but nice UX)
    await tx.wait();

    return { success: true, txHash: tx.hash };
  } catch (error: any) {
    console.error("Send ETH error:", error);
    return { success: false, error: error.code || "Unknown error" };
  }
};

export const getTransactions = async (privateKey: string) => {
  try {
    const provider = new AlchemyProvider(
      "sepolia",
      "svEoaVYaL6yFL6Yjq9OiETXIVu39pnnf"
    );
    const wallet = new Wallet(privateKey, provider);
    const walletAddress = wallet.address;
    const url = `https://api.covalenthq.com/v1/eth-sepolia/address/${walletAddress}/transactions_v2/?key=${COVALENT_API_KEY}`;

    const res = await axios.get(url);
    const data = res.data.data.items;

    // Filter out failed txs and format
    const txs = data.map((tx: any) => ({
      hash: tx.tx_hash,
      from: tx.from_address,
      to: tx.to_address,
      value: Number(tx.value) / 1e18, // Convert from Wei to ETH
      success: tx.successful,
      date: tx.block_signed_at,
    }));

    return txs;
  } catch (err) {
    console.error("Failed to fetch transactions:", err);
    return [];
  }
};

// Standard ERC-20 ABI (just the essentials we need)
const ERC20_ABI = [
  "function transfer(address to, uint256 value) returns (bool)",
  "function decimals() view returns (uint8)",
];

const provider = new AlchemyProvider(
  "sepolia",
  "svEoaVYaL6yFL6Yjq9OiETXIVu39pnnf"
);

export const sendERC20Token = async (
  privateKey: string,
  tokenAddress: string,
  toAddress: string,
  amount: string
): Promise<{ success: boolean; txHash?: string; error?: string }> => {
  try {
    const wallet = new Wallet(privateKey, provider);
    const contract = new Contract(tokenAddress, ERC20_ABI, wallet);

    // Get token decimals
    const decimals = await contract.decimals();
    const parsedAmount = parseUnits(amount, decimals);

    // Send transaction
    const tx = await contract.transfer(toAddress, parsedAmount);
    await tx.wait();

    return { success: true, txHash: tx.hash };
  } catch (error: any) {
    console.error("Send ERC20 error:", error);
    return {
      success: false,
      error: error?.reason || error?.message || "Unknown error",
    };
  }
};
