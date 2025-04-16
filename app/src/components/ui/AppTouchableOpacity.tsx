import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from "react-native";

interface AppTouchableOpacityProps extends TouchableOpacityProps {
  children: React.ReactNode;
  padding?: number;
  borderRadius?: number;
  bgColor?: string;
  style?: StyleProp<ViewStyle>;
}

const AppTouchableOpacity: React.FC<AppTouchableOpacityProps> = ({
  children,
  padding = 12,
  borderRadius = 10,
  bgColor = "#f2f2f2",
  style,
  ...rest
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        {
          backgroundColor: bgColor,
          padding,
          borderRadius,
        },
        styles.shadow,
        style,
      ]}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default AppTouchableOpacity;
