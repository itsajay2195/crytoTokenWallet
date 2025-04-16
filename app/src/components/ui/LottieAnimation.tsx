import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

interface AnimationItemProps {
  animationUrl?: string;
  source?: string;
  heightRatio?: number; // e.g. 0.2 for 20% screen height
}

const AnimationItem: React.FC<AnimationItemProps> = ({
  animationUrl,
  heightRatio = 0.2,
  source,
}) => (
  <View style={styles.container}>
    <LottieView
      source={animationUrl ? { uri: animationUrl } : source}
      style={[styles.lottie, { height: height * heightRatio }]}
      autoPlay
      loop
      resizeMode="contain"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    marginVertical: 4,
  },
  lottie: {
    width: width,
  },
});

export default AnimationItem;
