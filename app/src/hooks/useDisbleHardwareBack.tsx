import { BackHandler, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

const useDisbleHardwareBack = () => {
  useEffect(() => {
    // Disable the back button on this screen
    const backAction = () => {
      return true; // Return true to prevent default behavior
    };

    BackHandler.addEventListener("hardwareBackPress", backAction);

    // Clean up the event listener when the component is unmounted
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  }, []);
};

export default useDisbleHardwareBack;

const styles = StyleSheet.create({});
