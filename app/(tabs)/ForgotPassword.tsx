import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useState } from "react";
import { forgotPasswordApi } from "@/api/authApi";
import { router } from "expo-router";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const sendCode = async () => {
  try {
    console.log("Sending email:", email);

    const res = await forgotPasswordApi({ email });

    console.log("SUCCESS RESPONSE:", res.data);

    Alert.alert("Success", "Code sent");

    router.push({
      pathname: "/VerifyCode",
      params: { email },
    });

  } catch (err: any) {
    console.log("FULL ERROR:", err);
    console.log("RESPONSE ERROR:", err?.response?.data);
    console.log("MESSAGE:", err.message);

    Alert.alert("Error", "Check console");
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Enter your email to receive a verification code
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email address"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={sendCode}>
        <Text style={styles.buttonText}>Send Code</Text>
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