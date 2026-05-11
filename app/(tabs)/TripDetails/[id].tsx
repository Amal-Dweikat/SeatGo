import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import baseApi from "@/api/baseApi";
import {bookingStatus} from "@/api/notification";
import MapView, { Marker } from "react-native-maps";
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

  const [editVisible, setEditVisible] = useState(false);

  const [editData, setEditData] = useState({
    FromCity: "",
    ToCity: "",
    DateTrip: "",
    Price: 0,
    available_seats: 0,
  });

  const fetchTrip = async () => {
    try {
      if (!tripId) {
        console.log("No tripId found");
        return;
      }

      console.log("Fetching trip:", tripId);

      const res = await baseApi.get(`/trips/${tripId}`);

      setTrip(res.data.trip);
      setPending(res.data.pending ?? []);
      setAccepted(res.data.accepted ?? []);
    } catch (err: any) {
      console.log("FETCH ERROR:", err?.response?.data || err.message);
    }
  };

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
      available_seats: trip.available_seats,
    });

    setEditVisible(true);
  };

  const updateTrip = async () => {
    try {
      await baseApi.put(`/trips/${tripId}`, editData);

      setTrip(editData);
      setEditVisible(false);

      Alert.alert("Success", "Trip updated successfully");
    } catch (err: any) {
      console.log(err?.response?.data || err.message);
      Alert.alert("Error", "Update failed");
    }
  };
  const acceptBooking = async (bookingId: number) => {
    try {
      await baseApi.post(`/booking/${bookingId}/accept`);

      console.log("Accepted booking");

      await fetchTrip();
    } catch (err: any) {
      console.log("ACCEPT ERROR:", err?.response?.data || err.message);
    }
  };

  const rejectBooking = async (bookingId: number) => {
    try {
      await baseApi.post(`/booking/${bookingId}/reject`);

      console.log("Rejected booking");

      fetchTrip();
    } catch (err: any) {
      console.log("REJECT ERROR:", err?.response?.data || err.message);
    }
  };

  const removeAccepted = async (bookingId: number) => {
    try {
      await baseApi.post(`/booking/${bookingId}/reject`);
      await fetchTrip();

      console.log("Removed from accepted");
    } catch (err: any) {
      console.log("REMOVE ERROR:", err?.response?.data || err.message);
    }
  };

  return (
      <ScrollView style={styles.container}>
        <View style={styles.tripCard}>
          <View style={styles.tripTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.route}>
                {trip.FromCity || "From ?"} → {trip.ToCity || "To ?"}
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
                <Marker
                    coordinate={{
                      latitude: 31.95,
                      longitude: 35.23,
                    }}
                />
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
              <Text style={styles.infoValue}>{trip.available_seats}</Text>
            </View>
          </View>

          <View style={styles.actionsContainer}>
            <View style={styles.mapActions}>
              <TouchableOpacity style={styles.editBtn} onPress={editTrip}>
                <Text style={styles.btnText}>Edit Trip</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => {
                    console.log("DELETE CLICKED");
                    deleteTrip();
                  }}
              >
                <Text style={styles.btnText}>Delete</Text>
              </TouchableOpacity>
            </View>
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
                      onPress={() => bookingStatus(b.id,"approved")}
                  >
                    <Text style={styles.btnText}>✔</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                      style={styles.rejectBtn}
                      onPress={() => bookingStatus(b.id,"rejected")}
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

                <View style={{ flex: 1 }}>
                  <Text style={styles.userName}>{b.user?.full_name}</Text>

                  <Text style={styles.acceptTime}>
                    Accepted at:{" "}
                    {b.accepted_at
                        ? new Date(b.accepted_at).toLocaleString()
                        : "just now"}
                  </Text>
                </View>

                <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => removeAccepted(b.id)}
                >
                  <Text style={styles.removeText}>✖</Text>
                </TouchableOpacity>
              </View>
          ))}
        </View>

        {editVisible && (
            <View style={styles.modalOverlay}>
              <View style={styles.modalCard}>
                <Text style={styles.modalTitle}>Edit Trip</Text>

                <ScrollView showsVerticalScrollIndicator={false}>

                  <Text style={styles.fieldLabel}>From City</Text>
                  <TextInput
                      style={styles.input}
                      value={editData.FromCity}
                      onChangeText={(t) =>
                          setEditData({ ...editData, FromCity: t })
                      }
                  />

                  <Text style={styles.fieldLabel}>To City</Text>
                  <TextInput
                      style={styles.input}
                      value={editData.ToCity}
                      onChangeText={(t) =>
                          setEditData({ ...editData, ToCity: t })
                      }
                  />

                  <Text style={styles.fieldLabel}>Date</Text>
                  <TextInput
                      style={styles.input}
                      value={editData.DateTrip}
                      onChangeText={(t) =>
                          setEditData({ ...editData, DateTrip: t })
                      }
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

                  <Text style={styles.fieldLabel}>Seats</Text>
                  <TextInput
                      style={styles.input}
                      value={String(editData.available_seats)}
                      keyboardType="numeric"
                      onChangeText={(t) =>
                          setEditData({
                            ...editData,
                            available_seats: Number(t),
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
        )}
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

  editBtn: {
    backgroundColor: "#e55b16",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },

  deleteBtn: {
    backgroundColor: "#c50707",
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

  tripCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
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
    backgroundColor: "#F44336",
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
  },

  modalCard: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
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
