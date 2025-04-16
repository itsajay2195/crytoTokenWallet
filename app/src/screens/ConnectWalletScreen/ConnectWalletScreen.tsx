import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AppText from "@/components/ui/AppText";
import AnimationItem from "@/components/ui/LottieAnimation";
import AppTextInput from "@/components/ui/AppTextInput";

const ConnectWalletScreen = () => {
  const [privateKey, setPrivateKey] = useState("");
  return (
    <View style={styles.container}>
      <AppText
        style={{
          fontSize: 24,
          fontWeight: "bold",
          paddingHorizontal: "10%",
          textAlign: "center",
        }}
      >
        Connect Wallet
      </AppText>

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
});
