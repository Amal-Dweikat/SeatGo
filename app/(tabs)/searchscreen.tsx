import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function SearchScreen() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [from_city, setFrom] = useState("");
  const [to_city, setTo] = useState("");
  const [time, setTime] = useState("");

  

const handleSearch = () => {
    router.push({
      pathname: "/resultsSearchScreen",
      params: {
        from: from_city,
        to: to_city,
        time: time,
      },
    });
  };


  return (
    <View style={styles.container}>

  {!open && (
    <TouchableOpacity
      style={styles.openBtn}
      onPress={() => setOpen(true)}
    >
      <Text style={{ color: "#fff", fontWeight: "bold" }}>
        🔍 Open Search
      </Text>
    </TouchableOpacity>
  )}

  {open && (
  <View style={styles.card}>

    <TextInput
      placeholder="From"
      placeholderTextColor="#888"
      style={styles.input}
      value={from_city}
      onChangeText={setFrom}
    />

    <TextInput
      placeholder="To"
      placeholderTextColor="#888"
      style={styles.input}
      value={to_city}
      onChangeText={setTo}
    />

    <TextInput
      placeholder="Time"
      placeholderTextColor="#888"
      style={styles.input}
      value={time}
      onChangeText={setTime}
    />

    <TouchableOpacity style={styles.btn} onPress={handleSearch}>
      <Text style={{ color: "#fff" }}>Search Ride</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => setOpen(false)}>
      <Text style={styles.closeText}>Close</Text>
    </TouchableOpacity>

  </View>
)}

</View>
  );
}
const styles = StyleSheet.create({
  container: {
  flex: 1,
  justifyContent: "center",
  paddingHorizontal: 20,
  backgroundColor: "#f5f5f5",
},

  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },

  card: {
  backgroundColor: "#fff",
  padding: 15,
  borderRadius: 15,
  elevation: 5,
},

  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    color: "#000",
  },

  btn: {
    backgroundColor: "#d86828",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  openBtn: {
  backgroundColor: "#d86828",
  padding: 12,
  margin: 20,
  borderRadius: 10,
  alignItems: "center",
},

closeText: {
  marginTop: 10,
  textAlign: "center",
  color: "#888",
  fontWeight: "600",
},
});