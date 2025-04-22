import { AlchemyProvider, Wallet } from "ethers";
import { ALCHEMY_API_KEY } from "@env";

const ALCHEMY_NETWORK = "sepolia";
// const ALCHEMY_API_KEY = "svEoaVYaL6yFL6Yjq9OiETXIVu39pnnf";

export const getWalletInstance = (privateKey: string) => {
  const provider = new AlchemyProvider(ALCHEMY_NETWORK, ALCHEMY_API_KEY);
  const wallet = new Wallet(privateKey, provider);
  const address = wallet.address;

  return { provider, wallet, address, privateKey };
};
