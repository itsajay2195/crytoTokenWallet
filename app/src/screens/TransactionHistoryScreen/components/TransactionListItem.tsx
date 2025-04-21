import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppText from "@/components/ui/AppText";

interface Props {
  item: {
    from: string;
    to: string;
    value: number;
    hash: string;
    date: string;
    success: boolean;
  };
  selfAddress: string;
}

const TransactionListItem = ({ item, selfAddress }: any) => {
  const isSent = item.from.toLowerCase() === selfAddress.toLowerCase();

  return (
    <View style={styles.card}>
      <AppText size="sm" weight="medium" color={isSent ? "#d32f2f" : "#388e3c"}>
        {isSent ? "Sent" : "Received"} {item.value.toFixed(4)} ETH
      </AppText>

      <AppText size="xs" color="#666">
        {isSent ? `To: ${item.to}` : `From: ${item.from}`}
      </AppText>

      <AppText size="xs" color="#999">
        {new Date(item.date).toLocaleString()}
      </AppText>

      <AppText size="xs" color={item.success ? "#4caf50" : "#f44336"}>
        {item.success ? "✅ Success" : "❌ Failed"}
      </AppText>
    </View>
  );
};

export default TransactionListItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 20,
    marginBottom: 10,
    elevation: 2,
    gap: 10,
  },
});
