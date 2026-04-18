import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Item = {
  id: number;
  FromCity: string;
  ToCity: string;
  DepartureTime: string;
  transport: string;
  Price: number;
  BookedSeats: number;
  driver_name: string;
  driver_image: string;
};

type Props = {
  item: Item;
};

export default function ItemCard({ item }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.city}>
          📍 {item.FromCity} → {item.ToCity}
        </Text>

        <Text style={styles.price}>{item.Price} ₪</Text>
      </View>

      <View style={styles.row}>
        <Text>{item.DepartureTime}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.tag}>🚗 {item.transport}</Text>
        <Text>{item.BookedSeats} people</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.tag}> {item.driver_image}</Text>
        <Text>{item.driver_name}</Text>
      </View>

      <View style={styles.bottomcard}>
        <TouchableOpacity
  style={styles.button}
  onPress={() =>
    router.push({
      pathname: "/(Trip)/[id]",
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
    elevation: 4,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  city: {
    fontSize: 16,
    color: "#000",
  },

  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4A90E2",
  },

  row: {
    flexDirection: "row",
    gap: 10,
    marginTop: 5,
  },

  tag: {
    backgroundColor: "#f2f6ff",
    padding: 5,
    borderRadius: 10,
  },

  bottomcard: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  button: {
    backgroundColor: "#E55C16",
    padding: 10,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
