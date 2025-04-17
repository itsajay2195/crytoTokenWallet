import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import WalletCard from "./components/WalletCard";
import IConComponent from "../../components/common/IconComponent";

const renderItem = ({ item }: any) => (
  <TouchableOpacity style={styles.itemBox}>
    <Text>{item.title}</Text>
    <IConComponent name={item?.iconName} library={item?.iconLibrary} />
  </TouchableOpacity>
);
const listData = [
  { id: 1, title: "Send", iconName: "send", iconLibrary: "Ionicons" },
  {
    id: 2,
    title: "Receive",
    iconName: "call-received",
    iconLibrary: "MaterialIcons",
  },
];
const HomeScreen = () => {
  const { address, balance } = useSelector(
    (state: any) => state.wallet.walletData
  );
  // console.log("walletInfo>>>", walletInfo);
  return (
    <View style={styles.container}>
      <WalletCard address={address} balance={balance} />
      {/* <FlatList
        data={listData}
        numColumns={3} // Wraps into 3 columns per row
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemBox}>
            <Text>{item.title}</Text>
          </View>
        )}
        contentContainerStyle={{ gap: 8 }}
      /> */}
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
