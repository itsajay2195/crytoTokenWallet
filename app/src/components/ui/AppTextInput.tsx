import React from "react";
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  View,
  Text,
} from "react-native";

interface AppTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: any;
}

const AppTextInput: React.FC<AppTextInputProps> = ({
  label,
  error,
  ...props
}) => {
  return (
    <View
      style={[styles.container, props.containerStyle && props.containerStyle]}
    >
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        placeholderTextColor="#888"
        style={[styles.input, error && styles.inputError]}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "red",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});

export default AppTextInput;
