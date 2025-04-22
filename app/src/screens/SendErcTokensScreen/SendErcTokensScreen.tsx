import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import AppText from "@/components/ui/AppText";
import AppTextInput from "@/components/ui/AppTextInput";
import AppTouchableOpacity from "@/components/ui/AppTouchableOpacity";
import { useDispatch, useSelector } from "react-redux";
import { useSnackBar } from "@/context/SnackBarProvider";
import { setAmount, setToAddress } from "@/store/slices/sendErcTokenSlice";
import { sendERC20Token } from "@/services/wallet";

const SendErcTokensScreen = () => {
  const { triggerSnackBar } = useSnackBar();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const amount = useSelector((state: any) => state.ercTokens.amount);
  const privateKey = useSelector((state: any) => state.sendToken.privateKey);
  const toAddress = useSelector((state: any) => state.ercTokens.toAddress);
  const tokenInfo = useSelector((state: any) => state.ercTokens.tokenInfo);
  //   const loading = useSelector((state: any) => state.ercTokens.isLoading);
  const setAmountValue = useCallback((val: string) => {
    dispatch(setAmount(val));
  }, []);

  const setToaddressValue = useCallback((val: string) => {
    dispatch(setToAddress(val));
  }, []);

  const handleSend = useCallback(async () => {
    if (!toAddress || !amount) {
      triggerSnackBar("Please enter both address and amount");
      return;
    }

    setLoading(true);
    const result = await sendERC20Token(
      privateKey,
      tokenInfo?.address,
      toAddress,
      amount
    );
    setLoading(false);

    if (result.success) {
      triggerSnackBar(`Success ✅, Transaction Hash:${result.txHash}`);
    } else {
      triggerSnackBar(`Failed ❌, ${result.error || "Transaction failed"}`);
    }
  }, [tokenInfo, toAddress, amount]);
  return (
    <View style={styles.container}>
      <AppText size="lg" weight="bold">
        Send Token
      </AppText>

      <AppTextInput
        label="Recipient Address"
        placeholder="0x..."
        value={toAddress}
        onChangeText={setToaddressValue}
        autoCapitalize="none"
      />

      <AppTextInput
        label={`"Amount (${tokenInfo?.symbol})`}
        placeholder="e.g. 0.01"
        value={amount}
        onChangeText={setAmountValue}
        keyboardType="decimal-pad"
      />

      <AppTouchableOpacity onPress={handleSend} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <AppText weight="bold" align="center">
            Send
          </AppText>
        )}
      </AppTouchableOpacity>
    </View>
  );
};

export default SendErcTokensScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center" },
});
