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
  SEND_ERC_TOKENS_SCREEN,
  SEND_TOKENS_SCREEN,
  TRANSACTION_HISTORY_SCREEN,
} from "@/constants/screenConstants";
import TransactionHistoryScreen from "@/screens/TransactionHistoryScreen/TransactionHistoryScreen";
import ErrorBoundary from "@/HOC/ErrorBoundary";
import SendErcTokensScreen from "@/screens/SendErcTokensScreen/SendErcTokensScreen";

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
            <ErrorBoundary>
              <Stack.Navigator
                initialRouteName={CONNECT_WALLET_SCREEN}
                screenOptions={{ headerShown: false }}
              >
                <Stack.Screen
                  name={CONNECT_WALLET_SCREEN}
                  component={ConnectWalletScreen}
                />
                <Stack.Screen
                  name={HOME_SCREEN}
                  component={HomeScreen}
                  options={{ gestureEnabled: false }}
                />
                <Stack.Screen
                  name={SEND_TOKENS_SCREEN}
                  component={SendTokensScreen}
                />
                <Stack.Screen
                  name={RECEIVE_TOKENS_SCREEN}
                  component={ReceiveTokens}
                />
                <Stack.Screen
                  name={TRANSACTION_HISTORY_SCREEN}
                  component={TransactionHistoryScreen}
                />
                <Stack.Screen
                  name={SEND_ERC_TOKENS_SCREEN}
                  component={SendErcTokensScreen}
                />
              </Stack.Navigator>
            </ErrorBoundary>
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
