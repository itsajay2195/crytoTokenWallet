import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ConnectWalletScreen from "@/screens/ConnectWalletScreen/ConnectWalletScreen";
import HomeScreen from "@/screens/HomeScreen/HomeScreen";
import SendTokensScreen from "@/screens/SendTokensScreen/SendTokensScreen";
import ReceiveTokens from "@/screens/ReceiveTokensScreen/ReceiveTokens";
import {
  CONNECT_WALLET_SCREEN,
  HOME_SCREEN,
  RECEIVE_TOKENS_SCREEN,
  SEND_TOKENS_SCREEN,
} from "@/constants/screenConstat";

const Stack = createNativeStackNavigator();
const RootNavigation = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 24 : 20}
            style={styles.flex1}
          >
            {/* <ThemeProvider> */}
            {/* <NetInfoWrapper> */}
            {/* <ErrorBoundary> */}
            {/* <UIContainer> */}

            <Stack.Navigator
              initialRouteName={CONNECT_WALLET_SCREEN}
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen
                name={CONNECT_WALLET_SCREEN}
                component={ConnectWalletScreen}
              />
              <Stack.Screen name={HOME_SCREEN} component={HomeScreen} />
              <Stack.Screen
                name={SEND_TOKENS_SCREEN}
                component={SendTokensScreen}
              />
              <Stack.Screen
                name={RECEIVE_TOKENS_SCREEN}
                component={ReceiveTokens}
              />
            </Stack.Navigator>

            {/* </UIContainer>
                </ErrorBoundary>
              </NetInfoWrapper>
            </ThemeProvider> */}
          </KeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
