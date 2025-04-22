import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
// import { createThemedStyles } from "@/theme/createStyledTheme";

interface HeaderProps {
  leftNode?: JSX.Element;
  headerText?: string;
  rightNode?: JSX.Element;
  onLeftPress?: () => void;
  onRightPress?: () => void;
}

const HEADER_HEIGHT = Platform.select({
  ios: 44 + (StatusBar.currentHeight || 0), // Include status bar height for iOS
  android: 56 + (StatusBar.currentHeight || 0), // Material Design height + status bar for Android
  default: 50, // Default for other platforms
});

const Header: React.FC<HeaderProps> = ({
  leftNode,
  headerText,
  rightNode,
  onLeftPress,
  onRightPress,
}) => {
  //   const styles = headerStyles();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onLeftPress} style={styles.leftItem}>
        {leftNode}
      </TouchableOpacity>
      <View style={styles.headerItem}>
        <Text style={styles.headerTextStyle}>{headerText}</Text>
      </View>
      <TouchableOpacity onPress={onRightPress} style={styles.rightItem}>
        {rightNode}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    //   paddingHorizontal: theme.padding.medium,
    //   backgroundColor: theme.colors.background,
    height: HEADER_HEIGHT,
  },
  headerItem: {
    flex: 2,
    alignItems: "center",
  },
  headerTextStyle: { fontSize: 20, fontWeight: 700 },
  leftItem: { flex: 1, alignItems: "flex-start" },
  rightItem: { flex: 1, alignItems: "flex-end" },
});
