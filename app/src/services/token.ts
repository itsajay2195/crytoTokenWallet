import axios from "axios";

const COVALENT_API_KEY = "cqt_rQkrRYYQVB8BYKk3hWHkXXmjjm3D"; // replace with your key

export const getTokenBalances = async (walletAddress: string) => {
  try {
    const url = `https://api.covalenthq.com/v1/eth-sepolia/address/${walletAddress}/balances_v2/?key=${COVALENT_API_KEY}`;
    const response = await axios.get(url);

    const tokens = response.data.data.items.filter(
      (item: any) =>
        item.type === "cryptocurrency" &&
        Number(item.balance) > 0 &&
        item.contract_decimals > 0
    );

    return tokens.map((token: any) => ({
      name: token.contract_name,
      symbol: token.contract_ticker_symbol,
      logo: token.logo_url,
      balance: Number(token.balance) / 10 ** token.contract_decimals,
      address: token.contract_address,
    }));
  } catch (err) {
    console.error("Failed to fetch token balances:", err);
    return [];
  }
};
