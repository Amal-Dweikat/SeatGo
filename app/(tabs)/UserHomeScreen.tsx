// import { searchTrips } from "@/api/searchApi";
// import Hero from "@/components/Hero";
// import ItemCard from "@/components/ItemCard";
// import { useRouter } from "expo-router";
// import { useEffect, useState } from "react";
// import {
//   FlatList,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
//
// type Trip = {
//   id: number;
//   from_city: string;
//   to_city: string;
//   time: string;
//   transport: string;
//   price: number;
//   passengers: number;
//   driver_name: string;
//   driver_image: string;
// };
//
// export default function UserHomeScreen() {
//   const router = useRouter();
//
//   const [open, setOpen] = useState(false);
//
//   const [from_city, setFrom] = useState("");
//   const [to_city, setTo] = useState("");
//   const [time, setTime] = useState("");
//
//   const [trips, setTrips] = useState<Trip[]>([]);
//   const [loading, setLoading] = useState(false);
//
//   useEffect(() => {
//     const loadTrips = async () => {
//       try {
//         setLoading(true);
//
//         const result = await searchTrips({
//           from_city: "",
//           to_city: "",
//           time: "",
//         });
//
//         setTrips(result);
//       } catch (e) {
//         console.log("LOAD ERROR:", e);
//       } finally {
//         setLoading(false);
//       }
//     };
//
//     loadTrips();
//   }, []);
//
//   const handleSearch = () => {
//     router.push({
//       pathname: "/resultsSearchScreen",
//       params: {
//         from: from_city,
//         to: to_city,
//         time: time,
//       },
//     });
//   };
//
//   return (
//     <View style={styles.container}>
//       {/* HERO */}
//       <Hero
//         image={require("@/assets/img.png")}
//         title={"Share Your Ride,\n and earn money !"}
//         subtitle={"Offer available seats in your car\n and make extra income"}
//         buttonText="Become a Driver"
//         onPress={() => router.push("/DriverForm")}
//       />
//
//       {/* SEARCH BOX */}
//       {!open && (
//         <TouchableOpacity
//           style={styles.collapsedCard}
//           onPress={() => setOpen(true)}
//         >
//           <Text style={styles.searchText}>🔍 Tap to search trips</Text>
//         </TouchableOpacity>
//       )}
//
//       {open && (
//         <View style={styles.card}>
//           <Text style={styles.title}>Search Trips</Text>
//
//           <TextInput
//             placeholder="From"
//             style={styles.input}
//             value={from_city}
//             onChangeText={setFrom}
//           />
//
//           <TextInput
//             placeholder="To"
//             style={styles.input}
//             value={to_city}
//             onChangeText={setTo}
//           />
//
//           <TextInput
//             placeholder="Time"
//             style={styles.input}
//             value={time}
//             onChangeText={setTime}
//           />
//
//           <TouchableOpacity style={styles.btn} onPress={handleSearch}>
//             <Text style={{ color: "#fff" }}>Search Ride</Text>
//           </TouchableOpacity>
//
//           <TouchableOpacity onPress={() => setOpen(false)}>
//             <Text style={styles.closeText}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//
//       {/* AVAILABLE TRIPS */}
//       <Text style={styles.sectionTitle}>Available Trips</Text>
//
//       {loading ? (
//         <Text style={{ textAlign: "center" }}>Loading...</Text>
//       ) : (
//         <FlatList
//           data={trips}
//           keyExtractor={(item) => String(item.id)}
//           renderItem={({ item }) => <ItemCard item={item} />}
//           ListEmptyComponent={() => (
//             <Text style={{ textAlign: "center", marginTop: 20 }}>
//               No trips available
//             </Text>
//           )}
//         />
//       )}
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//
//   collapsedCard: {
//     backgroundColor: "#fff",
//     padding: 18,
//     borderRadius: 15,
//     margin: 10,
//     elevation: 5,
//     alignItems: "center",
//   },
//
//   searchText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#444",
//   },
//
//   card: {
//     backgroundColor: "#fff",
//     padding: 18,
//     borderRadius: 15,
//     margin: 10,
//     elevation: 5,
//   },
//
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 8,
//   },
//
//   filtersRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: 10,
//   },
//
//   filterBtn: {
//     backgroundColor: "#eee",
//     padding: 10,
//     borderRadius: 10,
//     flex: 1,
//     marginHorizontal: 4,
//     alignItems: "center",
//   },
//
//   active: {
//     backgroundColor: "#4A90E2",
//   },
//
//   btn: {
//     backgroundColor: "#d86828",
//     padding: 12,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 10,
//   },
//
//   closeText: {
//     marginTop: 10,
//     textAlign: "center",
//     color: "#888",
//   },
//
//   sectionTitle: {
//     marginTop: 10,
//     marginBottom: 6,
//     marginLeft: 10,
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

import { searchTrips } from "@/api/searchApi";
import Hero from "@/components/Hero";
import ItemCard from "@/components/ItemCard";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Trip = {
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

export default function UserHomeScreen() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [from_city, setFrom] = useState("");
  const [to_city, setTo] = useState("");
  const [time, setTime] = useState("");

  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTrips = async () => {
      try {
        setLoading(true);

        const result = await searchTrips({
          FromCity: "",
          ToCity: "",
          DepartureTime: "",
        });

        setTrips(result);
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

  return (
      <View style={styles.container}>
        {/* HERO */}
        <Hero
            image={require("@/assets/img.png")}
            title={"Share Your Ride,\n and earn money !"}
            subtitle={"Offer available seats in your car\n and make extra income"}
            buttonText="Become a Driver"
            onPress={() => router.push("/")}
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
  },

  sectionTitle: {
    marginTop: 10,
    marginBottom: 6,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});