import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import WalletCard from "./components/WalletCard";
import IConComponent from "../../components/common/IconComponent";
import { sendETH } from "@/services/wallet";

const ListItem = ({ item, onPress }: any) => (
  <TouchableOpacity
    style={styles.itemBox}
    onPress={() => onPress(item?.navigateTo)}
  >
    <Text>{item.title}</Text>
    <IConComponent name={item?.iconName} library={item?.iconLibrary} />
  </TouchableOpacity>
);
const listData = [
  {
    id: 1,
    title: "Send",
    iconName: "send",
    iconLibrary: "Ionicons",
    navigateTo: "SendTokens",
  },
  {
    id: 2,
    title: "Receive",
    iconName: "call-received",
    iconLibrary: "MaterialIcons",
    navigateTo: "ReceiveTokens",
  },
];
const HomeScreen = ({ navigation }: any) => {
  const { address, balance } = useSelector(
    (state: any) => state.wallet.walletData
  );

  const onPress = useCallback((screenName: string) => {
    navigation?.navigate(screenName);
  }, []);

  // console.log("walletInfo>>>", walletInfo);
  const renderItem = ({ item }: any) => (
    <ListItem item={item} onPress={onPress} />
  );

  return (
    <View style={styles.container}>
      <WalletCard address={address} balance={balance} />
      <FlatList
        data={listData}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  itemBox: {
    flex: 1,
    margin: 4,
    padding: 16,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    borderRadius: 8,
    flexDirection: "row",
  },
});
