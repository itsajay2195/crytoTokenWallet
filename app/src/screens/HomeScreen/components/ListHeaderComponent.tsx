import { StyleSheet, FlatList, View, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import WalletCard from "./WalletCard";
import AppText from "@/components/ui/AppText";
import IConComponent from "../../../components/common/IconComponent";
import { useNavigation } from "@react-navigation/native";

const ListItem = ({ item, onPress }: any) => (
  <TouchableOpacity
    style={styles.itemBox}
    onPress={() => onPress(item?.navigateTo)}
  >
    <AppText>{item.title}</AppText>
    <IConComponent name={item?.iconName} library={item?.iconLibrary} />
  </TouchableOpacity>
);

const ListHeaderComponent = ({ address, balance, listData }: any) => {
  const navigation = useNavigation();
  const onPress = useCallback((screenName: any) => {
    navigation?.navigate(screenName);
  }, []);
  const renderItem = ({ item }: any) => (
    <ListItem item={item} onPress={onPress} />
  );

  return (
    <View>
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

export default ListHeaderComponent;

const styles = StyleSheet.create({
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
