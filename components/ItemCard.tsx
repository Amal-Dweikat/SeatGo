import { router, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity , Image, FlatList } from "react-native";


type Item = {
  id: number;
  from_city: string;
  to_city: string;
  time: string;
  transport: string;
  price: number;
  passengers: number;
  driver_name: string;
  driver_image: string;
};

type Props = {
  item: Item;
  onPress?: () => void;
};

export default function ItemCard({ item, onPress }: Props)
 { 
  



   return (
    
    <View style={styles.card}>

      <View style={styles.header}>
      <Text style={styles.city}>📍 {item.from_city} → {item.to_city}</Text>

        <Text style={styles.price}>{item.price} ₪</Text>
      </View>

      
      <View style={styles.row}>
        <Text style={styles.timetag}>{item.time}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.tag}>🚗 {item.transport}</Text>
        <Text style={styles.tag}>👥 {item.passengers} people</Text>
      </View>

      
<View style={styles.bottomcard}>
  <View style={styles.driverRow}>
    <Image
      source={{ uri: item.driver_image }}
      style={styles.driverImage}
    />

    <Text style={styles.driverName}>
      {item.driver_name}
    </Text>
  </View>

  <TouchableOpacity
    style={styles.button}
    onPress={() =>
      router.push({
        pathname: "/",
        params: { id: item.id },
      })
    }
  >
    <Text style={styles.buttonText}>View Details</Text>
  </TouchableOpacity>
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 12,
    borderRadius: 16,

    // shadow iOS
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },

    // shadow Android
    elevation: 4,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    flex: 1,
  },

  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4A90E2",
  },

  city: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  tag: {
    backgroundColor: "#f2f6ff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    fontSize: 12,
    color: "#333",
  },
  timetag: {
    marginBottom: 2,
    paddingVertical: 5,},

  button: {
    backgroundColor: "#ff9914",
    padding: 10,
    borderRadius: 10,
    
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  bottomcard: {
  marginTop: 15,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

  driverRow: {
  flexDirection: "row",
  alignItems: "center",
},

driverImage: {
  width: 35,
  height: 35,
  borderRadius: 18,
  marginRight: 10,
  backgroundColor: "#ddd",
},

driverName: {
  fontSize: 14,
  fontWeight: "600",
  color: "#333",
},
searchCard: {
  backgroundColor: "#fff",
  margin: 15,
  marginTop: -20,
  padding: 15,
  borderRadius: 12,
  elevation: 5,
},

searchText: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#333",
},

searchSubText: {
  marginTop: 5,
  color: "#777",
},
});