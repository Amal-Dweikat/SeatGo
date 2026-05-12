import baseApi from "@/api/baseApi";
import { bookingStatus } from "@/api/notification";
import Back from "@/components/Back";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
type TripType = {
  FromCity: string;
  ToCity: string;
  DateTrip: string;
  Price: number;
  TotalSeats: number;
  BookedSeats: number;
};

type BookingType = {
  id: number;
  status: string;
  accepted_at?: string;
  user: {
    full_name: string;
    image?: string;
  };
  numSeatBooked: number;
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
    TotalSeats: 0,
    BookedSeats: 0,
  });

  const [pending, setPending] = useState<BookingType[]>([]);
  const [accepted, setAccepted] = useState<BookingType[]>([]);
  const [editVisible, setEditVisible] = useState(false);

  const [editData, setEditData] = useState<TripType>({
    FromCity: "",
    ToCity: "",
    DateTrip: "",
    Price: 0,
    TotalSeats: 0,
    BookedSeats: 0,
  });

  const fetchTrip = async () => {
    try {
      if (!tripId) return;

      const res = await baseApi.get(`/trips/${tripId}`);

      setTrip(res.data.trip);
      setPending(res.data.pending);
      setAccepted(res.data.accepted);
    } catch (err: any) {
      console.log(err?.response?.data || err.message);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchTrip();
    }, [tripId]),
  );

  useEffect(() => {
    if (tripId) fetchTrip();
  }, [tripId]);

  const deleteTrip = () => {
    Alert.alert(
      "Delete Trip",
      "Are you sure you want to delete this trip?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              console.log("Deleting trip:", tripId);

              await baseApi.delete(`/trips/${tripId}`);

              console.log("Trip deleted ");

              router.back();
            } catch (err: any) {
              console.log("DELETE ERROR:", err?.response?.data || err.message);
              Alert.alert("Error", "Failed to delete trip");
            }
          },
        },
      ],
      { cancelable: true },
    );
  };
  const editTrip = () => {
    setEditData({
      FromCity: trip.FromCity,
      ToCity: trip.ToCity,
      DateTrip: trip.DateTrip,
      Price: trip.Price,
      TotalSeats: trip.TotalSeats,
      BookedSeats: trip.BookedSeats,
    });

    setEditVisible(true);
  };

  const updateTrip = async () => {
    try {
      const res = await baseApi.put(`/trips/${tripId}`, {
        FromCity: editData.FromCity,
        ToCity: editData.ToCity,
        DateTrip: editData.DateTrip,
        Price: editData.Price,
        TotalSeats: editData.TotalSeats,
        BookedSeats: editData.BookedSeats,
      });

      setTrip({
        ...trip,
        ...res.data.trip,
      });

      setEditVisible(false);

      Alert.alert("Success", "Trip updated successfully");
    } catch (err: any) {
      console.log(err?.response?.data || err.message);
      Alert.alert("Error", "Update failed");
    }
  };

  const handleAccept = async (bookingId: number) => {
    try {
      if (trip.BookedSeats >= trip.TotalSeats) {
        Alert.alert("Trip Full", "No seats available anymore");
        return;
      }

      await bookingStatus(bookingId, "approved");

      await fetchTrip();
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to accept booking");
    }
  };
  const handleReject = async (bookingId: number) => {
    try {
      await bookingStatus(bookingId, "rejected");

      await fetchTrip();
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to reject booking");
    }
  };

  const removeAccepted = async (bookingId: number) => {
    try {
      await bookingStatus(bookingId, "rejected");

      await fetchTrip();
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to update booking");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.side}>
          <Back />
        </View>

        <View style={styles.center}>
          <Text style={styles.pageTitle}>Trip Details</Text>
        </View>

        <View style={styles.side} />
      </View>
      <View style={styles.tripCard}>
        <View style={styles.tripTop}>
          <View style={{ flex: 1 }}>
            <Text style={styles.route}>
              {trip.FromCity} → {trip.ToCity}
            </Text>

            <Text style={styles.date}>{trip.DateTrip}</Text>
          </View>

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
              <Marker coordinate={{ latitude: 31.95, longitude: 35.23 }} />
            </MapView>

            <View style={styles.mapPlaceholder}>
              <Text>📍 Map</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRowNew}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>💰 Price</Text>
            <Text style={styles.infoValue}>{trip.Price} ₪</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>💺 Seats</Text>
            <Text style={styles.infoValue}>
              {trip.BookedSeats} / {trip.TotalSeats}
            </Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.editBtnSmall} onPress={editTrip}>
            <Text style={styles.btnText}>Edit Trip</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteBtnSmall} onPress={deleteTrip}>
            <Text style={styles.btnText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={editVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setEditVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Edit Trip</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.fieldLabel}>From City</Text>
              <TextInput
                style={styles.input}
                value={editData.FromCity}
                onChangeText={(t) => setEditData({ ...editData, FromCity: t })}
              />

              <Text style={styles.fieldLabel}>To City</Text>
              <TextInput
                style={styles.input}
                value={editData.ToCity}
                onChangeText={(t) => setEditData({ ...editData, ToCity: t })}
              />

              <Text style={styles.fieldLabel}>Date</Text>
              <TextInput
                style={styles.input}
                value={editData.DateTrip}
                onChangeText={(t) => setEditData({ ...editData, DateTrip: t })}
              />

              <Text style={styles.fieldLabel}>Price</Text>
              <TextInput
                style={styles.input}
                value={String(editData.Price)}
                keyboardType="numeric"
                onChangeText={(t) =>
                  setEditData({ ...editData, Price: Number(t) })
                }
              />

              <Text style={styles.fieldLabel}>Total Seats</Text>
              <TextInput
                style={styles.input}
                value={String(editData.TotalSeats)}
                keyboardType="numeric"
                onChangeText={(t) =>
                  setEditData({
                    ...editData,
                    TotalSeats: Number(t),
                  })
                }
              />
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.saveBtn} onPress={updateTrip}>
                <Text style={styles.btnText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setEditVisible(false)}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pending Requests</Text>

        {pending.length === 0 ? (
          <Text style={styles.empty}>No pending requests</Text>
        ) : (
          pending.map((item) => (
            <View key={item.id} style={styles.userCard}>
              <View style={styles.userName}>
                <Text>{item.user.full_name}</Text>

                <Text style={{ color: "#888", fontSize: 12 }}>
                  Seats: {item.numSeatBooked}
                </Text>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.acceptBtn}
                  onPress={() => handleAccept(item.id)}
                >
                  <Text style={styles.btnText}>Accept</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.rejectBtn}
                  onPress={() => handleReject(item.id)}
                >
                  <Text style={styles.btnText}>Reject</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accepted</Text>

        {accepted.length === 0 ? (
          <Text style={styles.empty}>No accepted users</Text>
        ) : (
          accepted.map((item) => (
            <View key={item.id} style={styles.userCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.userName}>{item.user.full_name}</Text>

                {/* وقت القبول */}
                {item.accepted_at && (
                  <Text style={styles.acceptTime}>
                    Accepted at: {item.accepted_at}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => removeAccepted(item.id)}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbf0e6",
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

  route: {
    color: "#222",
    fontSize: 18,
    fontWeight: "bold",
  },

  date: {
    color: "#666",
    marginTop: 5,
    fontSize: 13,
  },

  tripActions: {
    flexDirection: "row",
    marginTop: 15,
    gap: 10,
  },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  editBtnSmall: {
    backgroundColor: "#e55b16",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
  },

  deleteBtnSmall: {
    backgroundColor: "#c50707",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
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

  tripCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    marginTop: 30,
    marginBottom: 20,
    elevation: 5,
  },
  tripTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  mapBox: {
    width: 100,
    height: 100,
    borderRadius: 15,
    overflow: "hidden",
    marginLeft: 10,
  },

  map: {
    width: "100%",
    height: "100%",
  },

  mapPlaceholder: {
    flex: 1,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 10,
  },

  side: {
    width: 50,
    alignItems: "flex-start",
  },

  center: {
    flex: 1,
    alignItems: "center",
  },

  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 15,
  },

  infoRowNew: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  infoItem: {
    alignItems: "center",
    flex: 1,
  },

  infoLabel: {
    fontSize: 13,
    color: "#888",
    fontWeight: "500",
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
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
  acceptTime: {
    color: "#888",
    fontSize: 12,
    marginTop: 2,
  },
  removeBtn: {
    backgroundColor: "#ffe5e5",
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ff4d4d",
  },

  actionsContainer: {
    alignItems: "flex-end",
    marginTop: 10,
  },

  mapActions: {
    flexDirection: "row",
    gap: 8,
  },
  removeText: {
    color: "#ff4d4d",
    fontWeight: "bold",
    fontSize: 14,
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
    backgroundColor: "#c50707",
    padding: 8,
    borderRadius: 10,
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },

  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",

    justifyContent: "center",
    alignItems: "center",

    zIndex: 999,
    elevation: 10,
  },

  modalCard: {
    width: "90%",
    maxHeight: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,

    alignSelf: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#222",
  },

  fieldLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
    marginBottom: 5,
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  saveBtn: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },

  cancelBtn: {
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
});
