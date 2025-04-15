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
              initialRouteName="ConnectWallet"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen
                name="ConnectWallet"
                component={ConnectWalletScreen}
              />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="SendToken" component={SendTokensScreen} />
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
