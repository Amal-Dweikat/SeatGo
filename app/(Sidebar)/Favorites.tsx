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

                        <View style={styles.ratingBadge}>
                            <Ionicons name="star" size={14} color="#fff" />
                            <Text style={styles.ratingText}>
                                {item.average_rating ?? "0.0"}
                            </Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeDriver(item.id)}
                    activeOpacity={0.7}
                >
                    <Ionicons name="trash-outline" size={20} color="#fff" />
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
        backgroundColor: "#fbf0e6",
        paddingTop: 80,
        paddingHorizontal: 20,
    },

    title: {
        fontSize: 30,
        fontWeight: "800",
        color: "#222",
        marginBottom: 20,
    },

    emptyText: {
        textAlign: "center",
        marginTop: 50,
        fontSize: 16,
        color: "#888",
    },

    card: {
        backgroundColor: "#FFF8F0",
        borderRadius: 22,
        padding: 16,
        marginBottom: 14,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },

        elevation: 4,
    },

    leftSection: {
        flexDirection: "row",
        alignItems: "center",
    },

    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 14,
        borderWidth: 2,
        borderColor: "#eee",
    },

    name: {
        fontSize: 17,
        fontWeight: "700",
        color: "#222",
    },

    ratingBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFA500",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
        marginTop: 6,
        alignSelf: "flex-start",
    },

    ratingText: {
        marginLeft: 4,
        color: "#fff",
        fontWeight: "600",
        fontSize: 12,
    },

    removeButton: {
        backgroundColor: "#E74C3C",
        width: 42,
        height: 42,
        borderRadius: 21,

        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#E74C3C",
        shadowOpacity: 0.3,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
    },
});
