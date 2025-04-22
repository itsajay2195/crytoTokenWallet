import { StyleSheet } from "react-native";
import React from "react";
import AppText from "@/components/ui/AppText";

const ListEmptyComponent = () => {
  return (
    <AppText align="center" color="#888" style={{ marginTop: 20 }}>
      You currently only hold ETH. Add some ERC-20 tokens to see them here.
    </AppText>
  );
};

export default ListEmptyComponent;

const styles = StyleSheet.create({});
