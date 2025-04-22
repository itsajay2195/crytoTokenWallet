import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import AppText from "@/components/ui/AppText";
import AppTextInput from "@/components/ui/AppTextInput";
import AppTouchableOpacity from "@/components/ui/AppTouchableOpacity";
import { useDispatch, useSelector } from "react-redux";
import { useSnackBar } from "@/context/SnackBarProvider";
import { setAmount, setToAddress } from "@/store/slices/sendErcTokenSlice";

const SendErcTokensScreen = () => {
  const { triggerSnackBar } = useSnackBar();

  const dispatch = useDispatch();
  const amount = useSelector((state: any) => state.ercTokens.amount);
  const privateKey = useSelector((state: any) => state.sendToken.privateKey);
  const toAddress = useSelector((state: any) => state.ercTokens.toAddress);
  const loading = useSelector((state: any) => state.ercTokens.isLoading);
  const setAmountValue = useCallback((val: string) => {
    dispatch(setAmount(val));
  }, []);

  const setToaddressValue = useCallback((val: string) => {
    dispatch(setToAddress(val));
  }, []);

  const handleSend = useCallback(() => {}, []);
  return (
    <View style={styles.container}>
      <AppText size="lg" weight="bold">
        Send ETH
      </AppText>

      <AppTextInput
        label="Recipient Address"
        placeholder="0x..."
        value={toAddress}
        onChangeText={setToaddressValue}
        autoCapitalize="none"
      />

      <AppTextInput
        label="Amount (ETH)"
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
