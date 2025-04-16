import React from "react";
import { Text, StyleSheet, TextProps, TextStyle } from "react-native";

interface AppTextProps extends TextProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  weight?: "light" | "regular" | "medium" | "bold" | "semibold";
  color?: string;
  align?: TextStyle["textAlign"];
  style?: TextStyle;
}

const fontSizeMap = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
};

const fontWeightMap = {
  light: "300",
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
};

const AppText: React.FC<AppTextProps> = ({
  children,
  size = "md",
  weight = "regular",
  color = "#000",
  align = "left",
  style,
  ...rest
}) => {
  return (
    <Text
      style={[
        {
          fontSize: fontSizeMap[size],
          fontWeight: fontWeightMap[weight],
          color,
          textAlign: align,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default AppText;
