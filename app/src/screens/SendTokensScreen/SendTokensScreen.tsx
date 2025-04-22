import AppText from "@/components/ui/AppText";
import AppTextInput from "@/components/ui/AppTextInput";
import AppTouchableOpacity from "@/components/ui/AppTouchableOpacity";
import { useSnackBar } from "@/context/SnackBarProvider";
import { sendETH } from "@/services/wallet";
import { setAmount, setToAddress } from "@/store/slices/sendTokenSlice";
import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function SendETHScreen({ route }: any) {
  const { triggerSnackBar } = useSnackBar();
  const dispatch = useDispatch();
  const amount = useSelector((state: any) => state.sendToken.amount);
  const privateKey = useSelector((state: any) => state.sendToken.privateKey);
  const toAddress = useSelector((state: any) => state.sendToken.toAddress);
  // const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  // console.log("toaddres>>>", toAddress);
  const setAmountValue = useCallback((val: string) => {
    dispatch(setAmount(val));
  }, []);

  const setToaddressValue = useCallback((val: string) => {
    dispatch(setToAddress(val));
  }, []);

  useEffect(() => {
    return () => {
      setToaddressValue("");
      setAmountValue("");
    };
  }, []);

  const handleSend = async () => {
    if (!toAddress || !amount) {
      Alert.alert("Error", "Please enter both address and amount");
      return;
    }

    setLoading(true);
    const result = await sendETH(privateKey, toAddress, amount);
    setLoading(false);

    if (result.success) {
      triggerSnackBar(`Success ✅, Transaction Hash:${result.txHash}`);
    } else {
      triggerSnackBar(`Failed ❌, ${result.error || "Transaction failed"}`);
    }
  };

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
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center" },
});
