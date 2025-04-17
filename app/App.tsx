import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RootNavigation from "@/navigation/RootNavigation";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { SnackBarProvider } from "@/context/SnackBarProvider";

const App = () => {
  return (
    <Provider store={store}>
      <SnackBarProvider>
        <RootNavigation />
      </SnackBarProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
