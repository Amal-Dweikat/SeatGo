import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { forgotPasswordApi, verifyCodeApi } from "@/api/authApi";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import AuthBackground from "@/components/AuthBackground";
import Back from "@/components/Back";

export default function VerifyCode() {
  const { email } = useLocalSearchParams();
  const [code, setCode] = useState("");

  const verify = async () => {
    try {
      const res = await verifyCodeApi({
        email: email as string,
        code: code.trim(),
      });

      console.log("VERIFY SUCCESS:", res.data);

      Alert.alert("Success", "Code verified successfully");

      router.push({
        pathname: "/ResetPassword",
        params: {
          email: email as string,
          code: code.trim(),
        },
      });
    } catch (err: any) {
      console.log("VERIFY ERROR:", err?.response?.data);

      Alert.alert("Error", err?.response?.data?.message || "Invalid code");
    }
  };

  const resendCode = async () => {
    try {
      const res = await forgotPasswordApi({
        email: email as string,
      });

      console.log("NEW CODE:", res.data);

      Alert.alert("Success", "A new code has been sent 📩");
    } catch (err: any) {
      console.log(err?.response?.data);

      Alert.alert("Error", "Failed to resend code");
    }
  };

  return (
    <View style={styles.container}>
      <AuthBackground />
      <Back />
      <Text style={styles.title}>Verify Code</Text>

      <Text style={styles.subtitle}>
        Enter the verification code sent to your email
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Code"
          placeholderTextColor="#aaa"
          value={code}
          onChangeText={setCode}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={verify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={resendCode}>
        <Text style={styles.resend}>Resend Code</Text>
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
    fontSize: 20,
    color: "#333",
    textAlign: "center",
    letterSpacing: 6,
    fontWeight: "bold",
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

  resend: {
    textAlign: "center",
    marginTop: 15,
    color: "#E55C16",
    fontWeight: "bold",
  },
});
