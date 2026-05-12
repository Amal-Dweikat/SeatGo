
import Hero from "@/components/Hero";
import ItemCard from "@/components/ItemCard";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList, Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {useQuery} from "@tanstack/react-query";
import {Ionicons} from "@expo/vector-icons";
import {getFinishedTrip} from "@/api/authApi";
import baseApi from "@/api/baseApi";
import useNotifications from "@/hooks/GetNotification";

import { searchTrips } from "@/api/searchApi";
import { getLocalTrips, saveTrips } from "@/services/tripsService";
import NetInfo from "@react-native-community/netinfo";

type Trip = {
  id: number;
  FromCity: string;
  ToCity: string;
  DepartureTime: string;
  DateTrip:string;
  transport: string;
  Price: number;
  BookedSeats: number;
  driver_name: string;
  driver_image: string;
};

export default function UserHomeScreen() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [from_city, setFrom] = useState("");
  const [to_city, setTo] = useState("");
  const [time, setTime] = useState("");

  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(false);

  useNotifications();
  useEffect(() => {
    const loadTrips = async () => {
      try {
        setLoading(true);

        const net = await NetInfo.fetch();

        if (net.isConnected) {
          const result: Trip[] = await searchTrips({
            FromCity: "",
            ToCity: "",
            DepartureTime: "",
          });

          setTrips(result);

          await saveTrips(result);
        } else {
          //  OFFLINE
          const localTrips = await getLocalTrips();
          setTrips(localTrips as Trip[]);
        }
      } catch (e) {
        console.log("LOAD ERROR:", e);
      } finally {
        setLoading(false);
      }
    };

    loadTrips();
  }, []);

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

  const [id, setid] = useState("");
  const handlepress = (id: any) => {
    router.push(id);
  };


  const [showDriverRating, setShowDriverRating] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [isFav, setIsFav] = useState(false);
  const { data: finishedTrip } = useQuery({
    queryKey: ["finished-trip"],
    queryFn: getFinishedTrip,
  });
  const rateDriver = async (value: number) => {
    await baseApi.post("/rating", {
      trip_id: finishedTrip?.trip?.id,
      rated_user_id: selectedDriver?.id,
      rating: value,
    });
  };

  const addFavorite = async (driverId: number) => {
    await baseApi.post("/favorite", {
      driver_id: driverId,
    });
  };

  useEffect(() => {
    if (finishedTrip?.trip?.id && finishedTrip?.driver?.id) {
      setSelectedDriver(finishedTrip.driver);
      setShowDriverRating(true);
    }
  }, [finishedTrip]);

  return (
    <View style={styles.container}>
      {/* HERO */}
      <Hero
        image={require("@/assets/img.png")}
        title={"Share Your Ride,\n and earn money !"}
        subtitle={"Offer available seats in your car\n and make extra income"}
        buttonText="Become a Driver"
        showNotification={true}
        onPress={() => router.push("/DriverForm")}
      />

      {/* SEARCH BOX */}
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
            style={styles.input}
            value={from_city}
            onChangeText={setFrom}
          />

          <TextInput
            placeholder="To"
            style={styles.input}
            value={to_city}
            onChangeText={setTo}
          />

          <TextInput
            placeholder="Time"
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



      {/* AVAILABLE TRIPS */}
      <Text style={styles.sectionTitle}>Available Trips</Text>

      {loading ? (
        <Text style={{ textAlign: "center" }}>Loading...</Text>
      ) : (
        <FlatList
          data={trips}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <ItemCard item={item} />}
          ListEmptyComponent={() => (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              No trips available
            </Text>
          )}
        />
      )}
      <Modal visible={showDriverRating} transparent animationType="fade">
        <View style={styles.modalContainer}>

          <View style={styles.modalContent}>


            <TouchableOpacity
                style={styles.favoriteBtn}
                onPress={async () => {
                  await addFavorite(selectedDriver?.id);
                  setIsFav(true);
                }}
            >
              <Ionicons
                  name={isFav ? "heart" : "heart-outline"}
                  size={26}
                  color={isFav ? "red" : "red"}
              />
            </TouchableOpacity>

            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 20 }}>
              Rate Your Driver
            </Text>

            <Text>{selectedDriver?.full_name}</Text>

            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity key={star} onPress={() => setRating(star)}>
                    <Ionicons
                        name={star <= rating ? "star" : "star-outline"}
                        size={28}
                        color="gold"
                    />
                  </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
                onPress={async () => {
                  await rateDriver(rating);
                  setShowDriverRating(false);
                }}
            >
              <Text style={{ color: "#E55C16", fontWeight: "bold" }}>
                Submit Rating
              </Text>
            </TouchableOpacity>


            <TouchableOpacity
                style={styles.skipBtn}
                onPress={() => setShowDriverRating(false)}
            >
              <Text style={{ color: "#888" }}>Skip</Text>
            </TouchableOpacity>

          </View>

        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  collapsedCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 15,
    margin: 10,
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
    margin: 10,
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

  active: {
    backgroundColor: "#4A90E2",
  },

  btn: {
    backgroundColor: "#E55C16",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  closeText: {
    marginTop: 10,
    textAlign: "center",
    color: "#888",
  },

  sectionTitle: {
    marginTop: 10,
    marginBottom: 6,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    width: "80%",
    alignItems: "center",
  },
  favoriteBtn: {
    position: "absolute",
    top: 10,
    left: 10,
  },

  skipBtn: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },

});