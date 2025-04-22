import { FlatList, StyleSheet, View } from "react-native";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppText from "@/components/ui/AppText";
import TokensListItem from "./components/TokensListItem";
import { useIsFocused } from "@react-navigation/native";
import {
  CONNECT_WALLET_SCREEN,
  SEND_ERC_TOKENS_SCREEN,
  SEND_TOKENS_SCREEN,
} from "@/constants/screenConstants";
import { setTokenInfo } from "@/store/slices/sendErcTokenSlice";
import Header from "@/components/common/Header";
import AppTouchableOpacity from "@/components/ui/AppTouchableOpacity";
import useDisbleHardwareBack from "@/hooks/useDisbleHardwareBack";
import { useSnackBar } from "@/context/SnackBarProvider";
import AnimationItem from "@/components/ui/LottieAnimation";
import useFetchTokensAndBalance from "./hooks/useFetchTokensAndBalance";
import ListEmptyComponent from "./components/ListEmptyComponent";
import ListHeaderComponent from "./components/ListHeaderComponent";
import { WALLET_LIST_DATA } from "@/constants/dataConstants";

const HomeScreen = ({ navigation }: any) => {
  const { triggerSnackBar } = useSnackBar();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { address, balance } = useSelector(
    (state: any) => state.wallet.walletData
  );
  const isLoading = useSelector((state: any) => state.wallet.loading);
  const privateKey = useSelector((state: any) => state.sendToken.privateKey);
  const tokens = useSelector((state: any) => state.tokens.tokens);
  useDisbleHardwareBack();
  useFetchTokensAndBalance(privateKey, triggerSnackBar, isFocused);

  const onTokenItemPress = useCallback((item: any) => {
    if (item.symbol === "ETH") {
      navigation.navigate(SEND_TOKENS_SCREEN);
    } else {
      navigation.navigate(SEND_ERC_TOKENS_SCREEN);
      dispatch(setTokenInfo(item));
    }
  }, []);

  const tokenListRenderItem = useCallback(({ item }: any) => {
    return <TokensListItem item={item} onPress={onTokenItemPress} />;
  }, []);

  return (
    <View style={styles.container}>
      <Header
        headerText="Account"
        rightNode={
          <AppTouchableOpacity
            style={{ padding: 0, backgroundColor: "" }}
            onPress={() => navigation?.navigate(CONNECT_WALLET_SCREEN)}
          >
            <AppText style={styles.disconnectTextStyle}>Disconnect</AppText>
          </AppTouchableOpacity>
        }
      />
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <AnimationItem
            source={require("../../assets/Animation/transaction-loader.json")}
          />
        </View>
      ) : (
        <FlatList
          data={
            tokens?.length === 1 && tokens[0].symbol === "ETH" ? [] : tokens
          }
          renderItem={tokenListRenderItem}
          keyExtractor={(item, index) => index?.toString()}
          ListHeaderComponent={
            <ListHeaderComponent
              address={address}
              balance={balance}
              listData={WALLET_LIST_DATA}
            />
          }
          ListEmptyComponent={<ListEmptyComponent />}
          nestedScrollEnabled={false}
        />
      )}
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
  loaderContainer: { flex: 1, justifyContent: "center" },
  disconnectTextStyle: { color: "red", paddingRight: 10 },
});
