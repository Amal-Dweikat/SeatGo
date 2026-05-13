import { resetPasswordApi } from "@/api/authApi";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AuthBackground from "@/components/AuthBackground";
import Back from "@/components/Back";

export default function ResetPassword() {
  const { email, code } = useLocalSearchParams();
  const [password, setPassword] = useState("");
  console.log("EMAIL:", email);
  console.log("CODE:", code);
  console.log("PASSWORD:", password);

  const reset = async () => {
    try {
      const res = await resetPasswordApi({
        email: email as string,
        code: code as string,
        password,
      });

      Alert.alert("Success", "Password changed");

      router.replace("/login");
    } catch (err: any) {
      const msg = err?.response?.data?.message;

      if (msg === "USER_NOT_FOUND") {
        Alert.alert("Error", "This account is not registered in the app ");
        return;
      }

      if (msg === "INVALID_CODE") {
        Alert.alert("Error", "Verification code is wrong ");
        return;
      }

      Alert.alert("Error", "Failed to reset password");
    }
  };

  return (
    <View style={styles.container}>
      <AuthBackground />
      <Back />
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtitle}>Enter your new password below</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="New Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={reset}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    color: "#777",
    marginBottom: 30,
  },

  inputContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 3,
    marginBottom: 20,
  },

  input: {
    fontSize: 16,
    color: "#333",
  },

  button: {
    backgroundColor: "#E55C16",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    elevation: 4,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
