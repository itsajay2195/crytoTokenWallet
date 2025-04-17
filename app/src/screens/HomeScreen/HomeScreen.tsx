import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import WalletCard from "./components/WalletCard";

const HomeScreen = () => {
  const { address, balance } = useSelector(
    (state: any) => state.wallet.walletData
  );
  // console.log("walletInfo>>>", walletInfo);
  return (
    <View style={styles.container}>
      <WalletCard address={address} balance={balance} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
});
