import { useEffect, useState } from "react";

import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { getFavoriteDriversApi, removeFavoriteDriverApi } from "@/api/authApi";

export default function FavoriteDrivers() {
  const [drivers, setDrivers] = useState<any[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const res = await getFavoriteDriversApi();

      console.log("FAVORITES:", res.data);

      setDrivers(res.data);
    } catch (err: any) {
      console.log("FAVORITES ERROR:", err?.response?.data);

      Alert.alert("Error", "Failed to load favorites");
    }
  };

  const removeDriver = async (driverId: number) => {
    try {
      await removeFavoriteDriverApi(driverId);

      setDrivers((prev) => prev.filter((item) => item.id !== driverId));

      Alert.alert("Success", "Driver removed");
    } catch (err: any) {
      console.log("REMOVE ERROR:", err?.response?.data);

      Alert.alert("Error", "Failed to remove driver");
    }
  };

  const renderDriver = ({ item }: any) => {
    return (
      <View style={styles.card}>
        <View style={styles.leftSection}>
          <Image
            source={{
              uri:
                item.image ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            }}
            style={styles.image}
          />

          <View>
            <Text style={styles.name}>{item.full_name}</Text>

            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFA500" />

              <Text style={styles.rating}>{item.average_rating ?? "0.0"}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeDriver(item.id)}
        >
          <Ionicons name="trash" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Drivers</Text>

      {drivers.length === 0 ? (
        <Text style={styles.emptyText}>No favorite drivers yet</Text>
      ) : (
        <FlatList
          data={drivers}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={renderDriver}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    paddingTop: 80,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#777",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 3,
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 65,
    height: 65,
    borderRadius: 50,
    marginRight: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  rating: {
    marginLeft: 5,
    fontSize: 15,
    color: "#666",
  },

  removeButton: {
    backgroundColor: "#E55C16",
    width: 45,
    height: 45,
    borderRadius: 50,

    justifyContent: "center",
    alignItems: "center",
  },
});
