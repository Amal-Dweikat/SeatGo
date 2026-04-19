

import Hero from "@/components/Hero";
import SortFilterDropdown from "@/components/SortFilterDropdown";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { searchTrips } from "../api/searchApi";
import ItemCard from "../components/ItemCard";

type Item = {
  id: number;
  FromCity: string;
  ToCity: string;
  DepartureTime: string;
  transport: string;
  Price: number;
  BookedSeats: number;
  driver: {
    user: {
      full_name: string;
      profile_picture: string;
    }
  };
};

type Filters = {
  minPassengers: number | null;

  sortByDate: "newest" | "oldest" | null;

  sortByPrice: "LowToHigh" | "HighToLow" | null;

  sortByTime: "earliest" | "latest" | "closest" | null;
};

export default function ResultsScreen() {
  const router = useRouter();

  const { from, to, time } = useLocalSearchParams();

  const fromValue = Array.isArray(from) ? from[0] : from;
  const toValue = Array.isArray(to) ? to[0] : to;
  const timeValue = Array.isArray(time) ? time[0] : time;

  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    minPassengers: null,
    sortByDate: null,
    sortByPrice: null,
    sortByTime: null,
  });

  const normalizeTime = (time?: string): string => {
    if (!time) return "";


    const match = time.match(/(\d{1,2}):(\d{2})/);

    if (match) {
      const hours = match[1].padStart(2, "0");
      const minutes = match[2];

      return `${hours}:${minutes}`;
    }


    const num = Number(time);
    if (!isNaN(num)) {
      return `${String(num).padStart(2, "0")}:00`;
    }

    return "";
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const result = await searchTrips({
          FromCity: (fromValue ?? "").toLowerCase().trim(),
          ToCity: (toValue ?? "").toLowerCase().trim(),
          DepartureTime: normalizeTime(timeValue ?? ""),
        });

        setData(result);
      } catch (e) {
        console.log("API ERROR:", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [fromValue, toValue, timeValue]);

  const timeToMinutes = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const filteredData = data
    .filter((item) => {
      if (filters.minPassengers) {
        return item.BookedSeats >= filters.minPassengers;
      }
      return true;
    })
    .sort((a, b) => {
      if (filters.sortByPrice === "LowToHigh") return a.Price - b.Price;
      if (filters.sortByPrice === "HighToLow") return b.Price - a.Price;

      if (filters.sortByTime === "earliest") {
        return timeToMinutes(a.DepartureTime) - timeToMinutes(b.DepartureTime);
      }

      if (filters.sortByTime === "latest") {
        return timeToMinutes(b.DepartureTime) - timeToMinutes(a.DepartureTime);
      }

      if (filters.sortByDate === "newest") return b.id - a.id;
      if (filters.sortByDate === "oldest") return a.id - b.id;

      return 0;
    });

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: "relative" }}>
        <Hero
          image={require("@/assets/img.png")}
          title={`Trips from\n${fromValue} → ${toValue}`}
          subtitle="Find the best available rides"
          buttonText="Edit search"
          onPress={() => router.back()}
        />
      </View>


      <SortFilterDropdown
        filters={filters}
        onChange={(newFilters) => setFilters(newFilters)}
      />

      {loading ? (
        <View style={styles.emptyContainer}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <ItemCard item={item} />}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyEmoji}>😔</Text>
              <Text style={styles.emptyTitle}>No Trips Found</Text>
              <Text style={styles.emptySubtitle}>
                Try changing your search or filters
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 180,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },

  title: {
    color: "white",
    fontSize: 26,
  },

  subtitle: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },

  backLink: {
    marginTop: 10,
    color: "#fff",
    backgroundColor: "#E55C16",
    padding: 8,
    borderRadius: 10,
    width: 100,
    textAlign: "center",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  emptyEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 6,
  },

  emptySubtitle: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
});
