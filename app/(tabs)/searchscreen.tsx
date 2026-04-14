import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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
        price: filters.price ?? "",
        passengers: filters.passengers ?? "",
        sortTime: filters.time ?? "",
      },
    });
  };
  const [filters, setFilters] = useState({
    price: null as "low" | "high" | null,
    passengers: null as number | null,
    time: null as "earliest" | "latest" | null,
  });

  return (
    <View style={styles.container}>
      {!open && (
        <TouchableOpacity
          style={styles.collapsedCard}
          onPress={() => setOpen(true)}
        >
          <Text style={styles.searchText}>🔍 Tap to search trips</Text>
        </TouchableOpacity>
      )}

      {open && (
        <View style={styles.card}>
          <Text style={styles.title}>Search Trips</Text>

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
            placeholder="Time (e.g 08:00)"
            placeholderTextColor="#888"
            style={styles.input}
            value={time}
            onChangeText={setTime}
          />

          {/* <TouchableOpacity
            style={[
              styles.filterBtn,
              filters.price === "low" && { backgroundColor: "#4A90E2" },
            ]}
            onPress={() =>
              setFilters({
                ...filters,
                price: filters.price === "low" ? null : "low",
              })
            }
          >
        <Text>💰 Low Price</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterBtn,
              filters.passengers === 4 && { backgroundColor: "#4A90E2" },
            ]}
            onPress={() =>
              setFilters({
                ...filters,
                passengers: filters.passengers === 4 ? null : 4,
              })
            }
          >
            <Text>👥 4+ Passengers</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterBtn,
              filters.time === "earliest" && { backgroundColor: "#4A90E2" },
            ]}
            onPress={() =>
              setFilters({
                ...filters,
                time: filters.time === "earliest" ? null : "earliest",
              })
            }
          >
            <Text>⏰ Earliest</Text>
          </TouchableOpacity>
      */}
          {/* SEARCH BUTTON */}
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

  collapsedCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 15,
    elevation: 5,
    alignItems: "center",
  },

  searchText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 15,
    elevation: 5,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },

  filterTitle: {
    marginTop: 10,
    fontWeight: "600",
    color: "#555",
  },

  filtersRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },

  filterBtn: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
  },

  btn: {
    backgroundColor: "#d86828",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  closeText: {
    marginTop: 10,
    textAlign: "center",
    color: "#888",
    fontWeight: "600",
  },
});
