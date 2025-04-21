import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TransactionListItem from "./components/TransactionListItem";
import AnimationItem from "@/components/ui/LottieAnimation";
import { getWalletInstance } from "@/utils/walletUtils";
import useFetchTransactionshook from "./hooks/useFetchTransactionshook";

const TransactionHistoryScreen = () => {
  const privateKey = useSelector((state: any) => state.sendToken.privateKey);
  const { address: walletAddress } = getWalletInstance(privateKey);
  const isTransactionLoading = useSelector(
    (state: any) => state.transactions.isLoading
  );
  const transactions = useSelector(
    (state: any) => state.transactions.transactionHistory
  );
  useFetchTransactionshook(privateKey);

  const renderItem = ({ item }: any) => {
    return <TransactionListItem item={item} selfAddress={walletAddress} />;
  };
  return (
    <View style={{ flex: 1 }}>
      {isTransactionLoading ? (
        <View style={styles.loaderContainer}>
          <AnimationItem
            source={require("../../assets/Animation/transaction-loader.json")}
          />
        </View>
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderItem}
          keyExtractor={(item, index) => item?.hash?.toString()}
          contentContainerStyle={{ padding: 20 }}
        />
      )}
    </View>
  );
};

export default TransactionHistoryScreen;

const styles = StyleSheet.create({
  loaderContainer: { flex: 1, justifyContent: "center" },
});
