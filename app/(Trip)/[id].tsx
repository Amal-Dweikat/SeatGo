import {View, Text, StyleSheet, Dimensions} from "react-native";
import Svg, { Path } from "react-native-svg";
import { useLocalSearchParams} from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CardInfoDriver from "@/components/CradInfoDriver";
import TripCard from "@/components/ContainerTripSummary";
import {returnTripInfo} from "@/api/TripDetaild";
import Back from "@/components/Back";
import { useQuery } from "@tanstack/react-query";

export default function TripDetails() {
    const { id } = useLocalSearchParams();
    const tripId = id ? Number(id) : null;

    const {
        data,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["trip-details", tripId],
        queryFn: () => returnTripInfo(Number(tripId)),
        enabled: !!tripId,
    });
    const trip = data?.data?.Trip?.[0];
    const driver = data?.data?.Drivers;
    const car = data?.data?.Cars;
    const bookedSeats = trip?.BookedSeats ?? 0;
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Loading...</Text>
            </View>
        );
    }
    return(
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.waveContainer}>
                        <Svg width="100%" height="100%" viewBox="0 0 100 25" preserveAspectRatio="none">
                            <Path
                            d="M0,19 C40,30 40,0 100,10 L100,0 L0,0 Z"
                            fill="#E55C16"
                            />
                            <Path
                            d="M0,17 C45,30 40,0 100,10"
                            stroke="#fbf0e6"
                            strokeWidth="1"
                            fill="none"
                            />
                        </Svg>
                        <Back></Back>
                        <Text style={styles.title}> Trip Details  </Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <CardInfoDriver name={driver?.full_name} phone={driver?.phone_number} rating={driver?.average_rating} typeCar={car?.type} colorCar={car?.color} plateNum={car?.plate_number} image={driver?.profile_picture} ></CardInfoDriver>
                    <View style={styles.cardComplete}>
                        <TripCard
                         fromCity={trip?.FromCity}
                         toCity={trip?.ToCity}
                         fromArea={trip?.FromRegion}
                         toArea={trip?.ToRegion}
                         price={trip?.Price}
                         departureTime={trip?.DepartureTime}
                         arrivalTime={trip?.ArrivalTime}
                         date={trip?.DateTrip}
                         note={trip?.note}
                         TripRepeat={trip?.TripRepeat}
                         bookedSeats={bookedSeats}
                         totalSeats=   {trip?.TotalSeats}
                         endRepeatFromDriver={trip.repeat_trip?.EndRepeat}
                         DriverSelectedDays={trip.repeat_trip?.DriverSelectedDays}

                         id={tripId}
                         onChangeSeat={refetch}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
     );
}
const { width, height } = Dimensions.get('window');
const styles= StyleSheet.create({

    container: {
        flex: 1,
        gap:60,
        backgroundColor: "#fbf0e6",
    },

    header: {
        flex: 1,

    },

    title : {
        position: "absolute",
        top: "55%",
        alignSelf: "flex-end",
        fontSize: 35,
        fontWeight: "bold",
        color: "#E55C16",
    },

    waveContainer: {

        position: "absolute",
        top: 0,
        width: width,
        height: height * 0.25,

    },

    content: {
        flex: 3.5,
        alignItems: "center",
        bottom:"5%",
        gap:15,
        width: "90%",
        height:"100%",
        alignSelf: "center",
        color: "#E55C16",
        borderRadius: 20,
    },

    cardComplete :{
        flex :2.5,
        backgroundColor:"#fbf0e6",
        borderRadius: 20,
        width: "100%",
        height:"100%",
        borderWidth: 1.5,
        borderColor: "#fbefe0",
        elevation: 6,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        padding :10,
    },

});