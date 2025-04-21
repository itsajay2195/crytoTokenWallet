import React, { useCallback, useRef } from "react";
import { View, StyleSheet, Alert } from "react-native";
import QRCode from "react-native-qrcode-svg"; // install this!
import * as Clipboard from "expo-clipboard";
import { Wallet } from "ethers";
import AppText from "@/components/ui/AppText";
import AppTouchableOpacity from "@/components/ui/AppTouchableOpacity";
import { useSelector } from "react-redux";
import * as Sharing from "expo-sharing";
import { captureRef } from "react-native-view-shot";
import * as FileSystem from "expo-file-system";
import IConComponent from "../../components/common/IconComponent";
import { useSnackBar } from "@/context/SnackBarProvider";

export default function ReceiveScreen({ route }: any) {
  const { triggerSnackBar } = useSnackBar();
  const privateKey = useSelector((state: any) => state.sendToken.privateKey);
  const wallet = new Wallet(privateKey);
  const address = wallet.address;
  const qrRef = useRef<View>(null);

  const copyToClipboard = useCallback(async () => {
    await Clipboard?.setStringAsync(address);
    triggerSnackBar("Wallet address copied to clipboard");
  }, [address]);

  const handleShare = useCallback(async () => {
    try {
      const uri = await captureRef(qrRef, {
        format: "png",
        quality: 1,
      });

      const newPath = `${FileSystem.cacheDirectory}wallet-qr.png`;
      await FileSystem.copyAsync({
        from: uri,
        to: newPath,
      });

      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert("Error", "Sharing is not available on this device");
        return;
      }

      await Sharing.shareAsync(newPath, {
        mimeType: "image/png",
        dialogTitle: "Share your wallet QR code",
      });
    } catch (err) {
      console.log("Share error:", err);
    }
  }, []);

  return (
    <View style={styles.container}>
      <AppText size="lg" weight="bold" align="center">
        Receive ETH
      </AppText>
      <AppText align="center" style={styles.subtext}>
        Send only Sepolia ETH to this address
      </AppText>

      <View ref={qrRef} collapsable={false} style={styles.qrWrapper}>
        <QRCode value={address} size={200} />
      </View>

      <AppText size="sm" weight="medium" align="center" color="#666">
        {address}
      </AppText>

      <AppTouchableOpacity onPress={copyToClipboard} style={styles.CtaStyle}>
        <AppText weight="bold" align="center">
          Copy Address
        </AppText>
        <IConComponent size={20} name={"copy"} library={"Ionicons"} />
      </AppTouchableOpacity>

      <AppTouchableOpacity onPress={handleShare} style={styles.CtaStyle}>
        <AppText weight="bold" align="center">
          Share
        </AppText>
        <IConComponent size={20} name={"share"} library={"Entypo"} />
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
  CtaStyle: {
    marginTop: 16,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },
});
