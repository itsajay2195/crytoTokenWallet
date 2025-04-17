// src/services/wallet.ts
import "react-native-get-random-values";
import "@ethersproject/shims";
import {
  ethers,
  Wallet,
  JsonRpcProvider, //jsonRpcProvider() is used for Ganache/Hardhat/Foundry
  formatEther,
  AlchemyProvider,
} from "ethers";

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

    console.log("Address:", wallet.address);
    console.log("ETH Balance:", ethBalance);

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
