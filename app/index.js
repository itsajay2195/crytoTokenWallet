//index.js
// import "react-native-get-random-values";
import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";

// Must be exported or Fast Refresh won't update the context
export function App() {
  const ctx = require.context("./App.tsx"); //Path with src folder
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
