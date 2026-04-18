import Hero from "@/components/Hero";
import { router } from "expo-router";
import {SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Modal, Pressable, TextInput} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useMutation, useQuery} from "@tanstack/react-query";
import {endTripApi, getCurrentTrip, getDriverStats, startTripApi} from "@/api/driverApi";
import {useState} from "react";

export default function DriverHomePage() {
    const { data, isLoading } = useQuery({
        queryKey: ["driver-stats"],
        queryFn: getDriverStats,
    });

    const [isStarted, setIsStarted] = useState(false);
    const [showRating, setShowRating] = useState(false);

    // const { data: trip } = useQuery({
    //     queryKey: ["current-trip"],
    //     queryFn: getCurrentTrip,
    // });
    const trip = {
        id: 1,
        from: "Nablus",
        to: "Ramallah",
        time: "10:30 AM",
        passengers_count: 3,
    };


    const startMutation = useMutation({
        mutationFn: startTripApi,
        onSuccess: () => {
            setIsStarted(true);
        },
    });

    const endMutation = useMutation({
        mutationFn: endTripApi,
        onSuccess: () => {
            setShowRating(true);
        },
    });

    const [id , setid]=useState("")
    const handlepress = () => {
        router.push(`/${id}`);
    };

    return (

        <SafeAreaView style={styles.basecontainer}>
    <Hero
        image={require("@/assets/img.png")}
        title={"Welcome back  \nReady to earn with your rides?"}
        subtitle={"Offer available seats in your car\n and make extra income"}
        buttonText="Schedule a Trip"
        onPress={() => router.push("/")}

    />

            <View style={styles.statsCard}>
                <View style={styles.statItem}>
                    <Ionicons name="calendar-outline" size={22} color="#E55C16" />
                    <Text style={styles.statLabel}>Upcoming Trips</Text>
                    <Text style={styles.statValue}>
                        {data?.upcoming_trips ?? 0}
                    </Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.statItem}>
                    <Ionicons name="people-outline" size={22} color="#E55C16" />
                    <Text style={styles.statLabel}>Passengers</Text>
                    <Text style={styles.statValue}>
                        {data?.upcoming_passengers ?? 0}
                    </Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.statItem}>
                    <Ionicons name="checkmark-circle-outline" size={22} color="#E55C16" />
                    <Text style={styles.statLabel}>Completed</Text>
                    <Text style={styles.statValue}>
                        {data?.completed_trips ?? 0}
                    </Text>
                </View>
            </View>


            {trip && (
                <View style={styles.tripCard}>
                    <View style={styles.routeRow}>
                    <Ionicons name="car-outline" size={25} color="#E55C16" />
                    <Text style={styles.cardTitle}>  Current Trip</Text>
                    </View>
                    <View style={styles.row}></View>
                    <View style={styles.routeRow}>
                        <Ionicons name="location-outline" size={20} color="#E55C16" />
                        <Text style={styles.routeText}>
                            {trip.from} <Ionicons name="arrow-forward-outline" size={17} color="#11663C" /> {trip.to}
                        </Text>
                        <Text style={styles.timeText}>
                            Today • {trip.time ?? "10:30 AM"}
                        </Text>
                    </View>




                    <Text style={styles.passengersText}>
                          {trip.passengers_count ??  3} passengers
                    </Text>

                    <TouchableOpacity
                        style={[
                            styles.tripButton,
                            isStarted ? styles.endButton : styles.startButton,
                        ]}
                        // onPress={() => {
                        //     if (!isStarted) {
                        //         startMutation.mutate(trip.id);
                        //     } else {
                        //         endMutation.mutate(trip.id);
                        //     }
                        // }}
                        onPress={() => {
                            if (!isStarted) {
                                setIsStarted(true);
                            } else {
                                setShowRating(true);
                            }
                        }}
                    >
                        <Text style={styles.buttonText}>
                            {isStarted ? "End Trip" : "Start Trip"}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
            <Modal visible={showRating} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                            Rate Your Passengers
                        </Text>

                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={() => setShowRating(false)}
                        >
                            <Text style={{ color: "#fff" }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View>
                <TextInput
                    value={id}
                    onChangeText={(text) => setid(text)}
                    style={{
                        backgroundColor: "#fff",
                        padding: 10,
                        borderRadius: 10,
                    }}
                />

                <Pressable
                    onPress={handlepress}
                    style={{
                        marginTop: 10,
                        backgroundColor: "#E55C16",
                        padding: 12,
                        borderRadius: 10,
                        alignItems: "center",
                    }}
                >
                    <Text style={{ color: "#fff" }}>Go</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );


}


const styles = StyleSheet.create({
    basecontainer: {
        flex: 1,
        backgroundColor: "#F2F2F2",
        overflow: "hidden",

    },
    statsCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 12,
        paddingVertical: 20,

        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    routeRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },

    statItem: {
        flex: 1,
        alignItems: "center",
    },

    statLabel: {
        fontSize: 12,
        color: "#777",
        marginTop: 5,
        textAlign: "center",
    },

    statValue: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 3,
    },

    divider: {
        width: 1,
        height: 70,
        backgroundColor:"#EEE",
    },
    row:{
        width: 340,
        height: 1,
        backgroundColor:"#EEE",
        marginBottom:7
    },
    tripCard: {
        backgroundColor: "#fff",
        marginHorizontal: 10,
        marginTop: 7,
        borderRadius: 12,
        padding: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },

    routeText: {
        marginLeft: 6,
        fontSize: 14,
        fontWeight: "500",
    },
    timeText: {
        fontSize: 13,
        color: "#777",
        marginLeft:75,
    },

    passengersText: {
        fontSize: 13,
        color: "#777",
        marginBottom: 15,
    },

    passengersRow: {
        flexDirection: "row",
        marginBottom: 15,
    },

    avatar: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginRight: 5,
    },

    tripButton: {
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
    },

    startButton: {
        backgroundColor: "#E55C16",
    },

    endButton: {
        backgroundColor: "#EF4444",
    },

    buttonText: {
        color: "#fff",
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

    submitButton: {
        marginTop: 15,
        backgroundColor: "#E55C16",
        padding: 10,
        borderRadius: 10,
    },
});