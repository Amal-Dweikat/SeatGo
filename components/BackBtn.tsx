import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";



export default function BackBtn() {
  return (
<TouchableOpacity
          onPress={() => router.back()}
          style={{
        position: "absolute",
        top: 60,
        left: 15,
        zIndex: 20,
        backgroundColor: "#fff",
        padding: 8,
        borderRadius: 20,
      }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

  );
    
}
