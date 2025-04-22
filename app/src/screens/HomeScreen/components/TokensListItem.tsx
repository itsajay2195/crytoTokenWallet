import { StyleSheet, Image, View } from "react-native";
import React from "react";
import AppText from "@/components/ui/AppText";

const TokensListItem = ({ item }: any) => {
  console.log("item?.log>>", item.logo);
  return (
    <View style={styles.card}>
      <Image
        source={
          item.logo?.includes("logos")
            ? require("../../../assets/png/default-token.png")
            : { uri: item.logo }
        }
        style={styles.logo}
      />

      <View style={{ flex: 1, marginHorizontal: 10 }}>
        <AppText weight="bold">{item.symbol}</AppText>
        <AppText size="sm" color="#666">
          {item.name}
        </AppText>
      </View>
      <AppText weight="medium">{item.balance.toFixed(2)}</AppText>
    </View>
  );
};

export default TokensListItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 10,
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
});
