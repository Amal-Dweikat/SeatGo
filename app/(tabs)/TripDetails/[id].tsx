import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import api from "../../../api/TripDetails";

type TripType = {
  FromCity: string;
  ToCity: string;
  DateTrip: string;
  Price: number;
  available_seats: number;
};

type BookingType = {
  id: number;
  status: string;
  accepted_at?: string; 
  user: {
    full_name: string;
    image?: string;
  };
};

export default function TripDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const tripId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();
  const [trip, setTrip] = useState<TripType>({
    FromCity: "",
    ToCity: "",
    DateTrip: "",
    Price: 0,
    available_seats: 0,
  });

  const [pending, setPending] = useState<BookingType[]>([]);
  const [accepted, setAccepted] = useState<BookingType[]>([]);

  const fetchTrip = async () => {
    try {
      if (!tripId) return;

      const res = await api.get(`/trips/${tripId}`);

    if (res.data.trip) setTrip(res.data.trip);   
   setPending(res.data.pending ?? []);
      setAccepted(res.data.accepted ?? []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (tripId) fetchTrip();
  }, [tripId]);

  const deleteTrip = async () => {
    Alert.alert("Delete Trip", "Are you sure you want to delete this trip?", [
      { text: "Cancel", style: "cancel" },

      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/trips/${tripId}`);

            console.log("Trip deleted ✔");

            router.back();
          } catch (err: any) {
            console.log("DELETE ERROR:", err?.response?.data || err.message);
            Alert.alert("Error", "Failed to delete trip");
          }
        },
      },
    ]);
  };

  const editTrip = () => {
    console.log("Navigate to edit trip screen");
  };

  const acceptBooking = async (bookingId: number) => {
  try {
    await api.post(`/booking/${bookingId}/accept`);

    console.log("Accepted ✔");

    const acceptedUser = pending.find(b => b.id === bookingId);

    if (acceptedUser) {
      setPending(prev => prev.filter(b => b.id !== bookingId));
      setAccepted(prev => [...prev, { ...acceptedUser, status: "accepted" }]);
    }

  } catch (err: any) {
    console.log("ACCEPT ERROR:", err?.response?.data || err.message);
  }
};

  const rejectBooking = async (bookingId: number) => {
    try {
      await api.post(`/booking/${bookingId}/reject`);

      console.log("Rejected ");

      fetchTrip(); 
    } catch (err: any) {
      console.log("REJECT ERROR:", err?.response?.data || err.message);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.route}>
            {trip.FromCity} → {trip.ToCity}
          </Text>

          <Text style={styles.date}>{trip.DateTrip}</Text>

          <View style={styles.tripActions}>
            <TouchableOpacity style={styles.editBtn} onPress={editTrip}>
              <Text style={styles.btnText}>Edit Trip</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteBtn} onPress={deleteTrip}>
              <Text style={styles.btnText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* RIGHT SIDE MAP 
        <View style={styles.mapBox}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 31.95, 
              longitude: 35.23,
              latitudeDelta: 0.5,
              longitudeDelta: 0.5,
            }}
          >
            <Marker
              coordinate={{ latitude: 31.95, longitude: 35.23 }}
              title="Trip Route"
            />
          </MapView>
        </View>*/}
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Price per Seat</Text>
          <Text style={styles.infoValue}>{trip.Price} ₪</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Seats Available</Text>
          <Text style={styles.infoValue}>{trip.available_seats}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pending Requests</Text>

        {pending.length === 0 && <Text style={styles.empty}>No requests</Text>}

        {pending.map((b) => (
          <View key={b.id} style={styles.userCard}>
            {b.user?.image ? (
              <Image
                source={{ uri: b.user.image }}
                style={styles.avatarImage}
              />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {b.user?.full_name?.charAt(0)}
                </Text>
              </View>
            )}

            <Text style={styles.userName}>{b.user?.full_name}</Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.acceptBtn}
                onPress={() => acceptBooking(b.id)}
              >
                <Text style={styles.btnText}>✔</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.rejectBtn}
                onPress={() => rejectBooking(b.id)}
              >
                <Text style={styles.btnText}>✖</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accepted Passengers</Text>

        {accepted.length === 0 && (
          <Text style={styles.empty}>No passengers</Text>
        )}

        {accepted.map((b) => (
          <View key={b.id} style={styles.userCard}>
           <Text style={{ color: "#888", fontSize: 12 }}>
  Accepted at: {b.accepted_at
    ? new Date(b.accepted_at).toLocaleString()
    : "just now"}
</Text>
            {b.user?.image ? (
              <Image
                source={{ uri: b.user.image }}
                style={styles.avatarImage}
              />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {b.user?.full_name?.charAt(0)}
                </Text>
              </View>
            )}

            <Text style={styles.userName}>{b.user?.full_name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    padding: 16,
  },

  header: {
    flexDirection: "row",
    backgroundColor: "#E55C16",
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerLeft: {
    flex: 1,
    paddingRight: 10,
  },

  mapBox: {
    width: 120,
    height: 120,
    borderRadius: 15,
    overflow: "hidden",
  },

  map: {
    width: "100%",
    height: "100%",
  },

  route: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  date: {
    color: "#fff",
    marginTop: 5,
  },

  tripActions: {
    flexDirection: "row",
    marginTop: 15,
    gap: 10,
  },

  editBtn: {
    backgroundColor: "#0c318186",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },

  deleteBtn: {
    backgroundColor: "#aa0a0a",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  infoCard: {
    backgroundColor: "#fff",
    width: "48%",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    elevation: 4,
  },

  infoLabel: {
    color: "#888",
    marginBottom: 5,
  },

  infoValue: {
    fontSize: 18,
    fontWeight: "bold",
  },

  section: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  empty: {
    color: "#999",
    textAlign: "center",
  },

  userCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E55C16",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  avatarText: {
    color: "#fff",
    fontWeight: "bold",
  },

  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "#E55C16",
  },

  userName: {
    flex: 1,
  },

  actions: {
    flexDirection: "row",
  },

  acceptBtn: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 10,
    marginRight: 5,
  },

  rejectBtn: {
    backgroundColor: "#F44336",
    padding: 8,
    borderRadius: 10,
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
