import AppText from "@/components/ui/AppText";
import AppTouchableOpacity from "@/components/ui/AppTouchableOpacity";
import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";

interface WalletCardProps {
  address: string;
  balance: string;
}

const WalletCard: React.FC<WalletCardProps> = ({ address, balance }) => {
  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  const handleCopy = () => {
    Clipboard.setString(address);
    Alert.alert("Copied", "Wallet address copied to clipboard");
  };

  return (
    <AppTouchableOpacity style={styles.card} onPress={handleCopy}>
      <AppText size="sm" weight="medium" color="#888">
        Wallet Address
      </AppText>
      <AppText size="md" weight="bold">
        {shortAddress}
      </AppText>

      <View style={styles.divider} />

      <AppText size="sm" weight="medium" color="#888">
        ETH Balance
      </AppText>
      <AppText size="lg" weight="bold">
        {balance} ETH
      </AppText>
    </AppTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    alignItems: "center",
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    width: "100%",
    marginVertical: 12,
  },
});

export default WalletCard;
