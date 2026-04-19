import {View, Text, StyleSheet, Dimensions, Pressable} from "react-native";
import Svg, { Path } from "react-native-svg";
import {router, useLocalSearchParams} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import CardInfoDriver from "@/components/CradInfoDriver";
import TripCard from "@/components/ContainerTripSummary";
import {useEffect, useState} from "react";
import {returnTripInfo} from "@/api/TripDetaild";
import axios, { AxiosError } from "axios";

export default function TripDetails() {
    const [loading, setLoading] = useState(true);
    const { id } = useLocalSearchParams();
    const tripId = id ? Number(id) : null;


    const handlePress=()=>{
    router.back()
    }
    const setBookedSeatsHandler = (num :number) => {
        setBookedSeats(num);
    };

    const [bookedSeats, setBookedSeats] = useState<number>(0);

    const [trip, setTrip] = useState<any>(null);
    const [driver, setDriver] = useState<any>(null);
    const [car, setCar] = useState<any>(null);

    useEffect(() => {
        const fetchTrip = async () => {
            console.log("START FETCH");

            try {
                const res = await returnTripInfo(Number(tripId));

                console.log("RESPONSE OK");

                setTrip(res.data.Trip);
                setCar(res.data.Cars);
                setDriver(res.data.Drivers);
                setBookedSeats(res.data.Trip.BookedSeats);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    console.log("STATUS:", err.response?.status);
                    console.log("DATA:", err.response?.data);
                    console.log("MESSAGE:", err.message);
                } else {
                    console.log("NON AXIOS ERROR:", err);
                }
            } finally {
                console.log("FINALLY FIRED");
                setLoading(false);
            }
        };

        fetchTrip();
    }, [tripId]);

    if (loading || !trip) {
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
                            stroke="#F2F2F2"
                            strokeWidth="1"
                            fill="none"
                        />


                    </Svg>
                    <View style={styles.Back}>
                        <Pressable onPress={()=> handlePress()}>
                            <Ionicons name="chevron-back" size={30} color="#E55C16"/>
                        </Pressable>
                    </View>
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
                         bookedSeats={bookedSeats}
                         totalSeats=   {trip?.TotalSeats}
                         id={tripId}
                         onChangeSeat={setBookedSeatsHandler}
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
        backgroundColor: "#F2F2F2",
    },
    header: {
        flex: 1,

    },
    Back :{
        alignItems:"center",
        justifyContent:"center",
        position:"absolute",
        backgroundColor:"#F2F2F2",
        width:40,
        height:40,
        borderRadius:20,
        top:"15%",
        left:"5%",
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
        backgroundColor:"#F7F7F7",
        borderRadius: 20,
        width: "100%",
        height:"100%",
        borderWidth: 1.5,
        borderColor: "rgba(255,255,255,0.6)",
        elevation: 6,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        padding :10,
    },
    card: {
        gap:15,
        width: "90%",
        height:"100%",
        alignSelf: "center",
        color: "#E55C16",
       // backgroundColor: "#E55C16",
        borderRadius: 20,
    },
});