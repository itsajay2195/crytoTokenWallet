import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import AppText from "@/components/ui/AppText";
import AnimationItem from "@/components/ui/LottieAnimation";
import AppTextInput from "@/components/ui/AppTextInput";
import AppTouchableOpacity from "@/components/ui/AppTouchableOpacity";
import { getETHBalance } from "@/services/wallet";
import { useDispatch } from "react-redux";
import { updateWalletData } from "@/store/slices/walletSlice";
import { useSnackBar } from "@/context/SnackBarProvider";
import { setPrivateKey as setPrivateKeyToState } from "../../store/slices/sendTokenSlice";
import { getTokenBalances } from "@/services/token";
import { getWalletInstance } from "@/utils/walletUtils";
import { setTokens } from "@/store/slices/tokensSlice";
import { useFocusEffect } from "@react-navigation/native";

const ConnectWalletScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [privateKey, setPrivateKey] = useState("");
  const [loading, setLoading] = useState(false);
  const { triggerSnackBar } = useSnackBar();

  useFocusEffect(
    useCallback(() => {
      // Screen is focused
      return () => {
        // Screen is unfocused (navigated away)
        setPrivateKey("");
      };
    }, [])
  );

  const onConnectPRess = useCallback(async () => {
    try {
      setLoading(true);
      let result = await getETHBalance(privateKey);
      if (result?.isValid) {
        dispatch(setPrivateKeyToState(privateKey));
        navigation?.navigate("Home");
      } else {
        triggerSnackBar(result?.message || "Something went wrong");
      }
    } catch (error) {
      triggerSnackBar("Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [privateKey]);

  return (
    <View style={styles.container}>
      <AppText style={styles.textInputStyles}>Connect To Your Wallet</AppText>

      <AnimationItem
        source={require("../../assets/Animation/web3_wallet.json")}
      />

      <AppTextInput
        label="Private Key"
        placeholder="Enter your private key"
        secureTextEntry
        value={privateKey}
        onChangeText={setPrivateKey}
        containerStyle={{ paddingHorizontal: "10%" }}
      />

      <AppTouchableOpacity
        onPress={onConnectPRess}
        bgColor="#eee"
        style={{ marginHorizontal: "10%", opacity: !privateKey ? 0.5 : 1 }}
        disabled={!privateKey}
      >
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <AppText size="lg" weight="bold" style={{ textAlign: "center" }}>
            🪙 Connect
          </AppText>
        )}
      </AppTouchableOpacity>
    </View>
  );
};

export default ConnectWalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    gap: 20,
    backgroundColor: "white",
  },
  textInputStyles: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: "10%",
    textAlign: "center",
  },
});
