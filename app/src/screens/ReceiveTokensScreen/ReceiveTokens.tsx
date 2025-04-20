import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import QRCode from "react-native-qrcode-svg"; // install this!
import * as Clipboard from "expo-clipboard";
import { Wallet } from "ethers";
import AppText from "@/components/ui/AppText";
import AppTouchableOpacity from "@/components/ui/AppTouchableOpacity";
import { useSelector } from "react-redux";

export default function ReceiveScreen({ route }: any) {
  // const { privateKey } = route.params;
  const privateKey = useSelector((state: any) => state.sendToken.privateKey);
  const wallet = new Wallet(privateKey);
  const address = wallet.address;

  const copyToClipboard = async () => {
    await Clipboard?.setStringAsync(address);
    Alert.alert("Copied", "Wallet address copied to clipboard");
  };

  return (
    <View style={styles.container}>
      <AppText size="lg" weight="bold" align="center">
        Receive ETH
      </AppText>
      <AppText align="center" style={styles.subtext}>
        Send only Sepolia ETH to this address
      </AppText>

      <View style={styles.qrWrapper}>
        <QRCode value={address} size={200} />
      </View>

      <AppText size="sm" weight="medium" align="center" color="#666">
        {address}
      </AppText>

      <AppTouchableOpacity onPress={copyToClipboard} style={{ marginTop: 16 }}>
        <AppText weight="bold" align="center">
          Copy Address
        </AppText>
      </AppTouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    justifyContent: "center",
  },
  qrWrapper: { marginVertical: 30 },
  subtext: { marginTop: 8, marginBottom: 20, color: "#555" },
});
