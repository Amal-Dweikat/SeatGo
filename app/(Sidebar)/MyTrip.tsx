import {View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView, SafeAreaView} from "react-native";
import React, { useMemo, useState} from "react";
import CalendarStrip from 'react-native-calendar-strip';
import moment from "moment";
import ItemCard from "@/components/ItemCard";
import {GetTrip} from "@/api/TripDetaild";
import {useAuth} from "@/context/AuthContext";
import {router} from "expo-router";
import {useQuery} from "@tanstack/react-query";

export default function Home() {

    const [tab, setTab] = useState<"Upcoming" | "History">("Upcoming");
    const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);
    //fetch date today  in hour 00:00
    const today = moment().startOf("day");

    const{user}=useAuth();
    const { data, isLoading} = useQuery({
        queryKey: ["trips"],
        queryFn: GetTrip,
    });
    const trips = data?.data?.Trip ?? [];

    //This function when have repeat trip it's split to individual card
    const expandTrips = (trips: any[]) => {
        let result: any[] = [];
        if (user?.role=== "driver"){
            trips.forEach((trip) => {

                //if trip dont repeat
                if (!trip.TripRepeat) {
                    result.push({
                        ...trip,
                        tripDate: moment(trip.DateTrip),
                    });
                }


                if (trip.repeat_trip) {
                    let current = moment(trip.DateTrip).startOf("day");
                    const end = moment(trip.repeat_trip.EndRepeat).startOf("day");

                    const selectedDays = trip.repeat_trip.DriverSelectedDays;


                    while (current.isSameOrBefore(end)) {
                        const day = current.format("ddd");

                        if (selectedDays.includes(day)) {
                            result.push({
                                ...trip,
                                tripDate: current.clone(),
                            });
                        }

                        current.add(1, "day");
                    }}
            });
        }
        else
        {
            trips.forEach((trip) => {
                if (!trip?.trip) return;

                //if trip dont repeat
                if (!trip.UserWantRepeat) {
                    result.push({
                        ...trip.trip,
                        tripDate: moment(trip.trip.DateTrip),
                    });
                }


                else {
                    let current = moment(trip.trip.DateTrip).startOf("day");
                    const end = moment(trip.EndRepeat).startOf("day");

                    const selectedDays = trip.UserSelectedDays;


                    while (current.isSameOrBefore(end)) {
                        const day = current.format("ddd");

                        if (selectedDays.includes(day)) {
                            result.push({
                                ...trip.trip,
                                tripDate: current.clone(),
                            });
                        }

                        current.add(1, "day");
                    }}
            });}

        return result;
    };

    const expanded = useMemo(() => {
        return expandTrips(trips);
    }, [trips, user?.role]);




    const displayedTrips = useMemo(() => {
        if (!expanded.length) return [];

        let baseList =
            tab === "Upcoming"
                ? expanded.filter(t =>
                    t.tripDate.isSameOrAfter(today) &&
                    t.status !== "completed" &&
                    t.status !== "cancelled"
                )
                : expanded.filter(t =>
                    t.tripDate.isBefore(today) ||
                    t.status === "completed"
                );

        if (selectedDate) {
            baseList = baseList.filter(t =>
                t.tripDate.isSame(selectedDate, "day")
            );
        }

        return baseList;
    }, [expanded, tab, selectedDate]);
    //This function to handle press day in calendar
    const handleDateSelected = (date:any) => {
        if (selectedDate && date.isSame(selectedDate, "day")) {
            setSelectedDate(null);
            return;
        }
        setSelectedDate(date);

        if (date.isBefore(today)) {
            setTab("History");
        } else {
            setTab("Upcoming");
        }

    };



    // to add dots on any date have trip on calendar
    const markedDates = expanded.map(t => ({
        date: t.tripDate,
        dots: [{ color: "#E55C16" }]
    }));




    if (isLoading) {
        return (
            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{backgroundColor:"#fff",flex:1,gap:5}}>
            <ImageBackground
                source={require("../../assets/background.png")}
                style={{ flex: .35 }}
                resizeMode="cover"
                borderRadius={30}
            >
                <View style={styles.topContainer}>
                    <View style={styles.headerButton}>
                        <TouchableOpacity onPress={() => setTab("Upcoming")} style={[styles.button,{borderBottomLeftRadius:10,borderTopLeftRadius:10,backgroundColor: tab === "Upcoming" ? "#E55C16" :"#FFF8F0"}]}>
                            <Text style={{ color: tab === "Upcoming" ? "white" : "#E55C16"}}>
                                Upcoming
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setTab("History" )} style={[styles.button,{borderBottomRightRadius:10,borderTopRightRadius:10,backgroundColor: tab === "History" ? "#E55C16" :"#FFF8F0"}]}>
                            <Text style={{ color: tab === "History" ? "white" : "#E55C16"}}>
                                History
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <CalendarStrip
                        scrollable
                        style={styles.calendar}
                        calendarColor={'#FFF8F0'}
                        calendarHeaderStyle={{ color: '#E55C16' }}
                        dateNumberStyle={{ color: '#605d5d' }}
                        dateNameStyle={{ color: '#605d5d' }}

                        highlightDateContainerStyle={{ backgroundColor: 'rgba(229,92,22,0.5)' , borderRadius:20 ,}}
                        highlightDateNameStyle={{color:"white"}}
                        highlightDateNumberStyle={{color:"white"}}
                        iconLeftStyle={{ tintColor: "#E55C16" }}
                        iconRightStyle={{ tintColor: "#E55C16" }}
                        onDateSelected={handleDateSelected}
                        selectedDate={selectedDate ?? undefined}
                        markedDates={markedDates}
                    />
                </View>
            </ImageBackground>
            <View style={styles.bottomContainer}>
            {tab === "Upcoming" && (
                <ScrollView style={styles.cardTrip}>
                    {displayedTrips.map((item) => (
                        <ItemCard key={item.id + item.tripDate} item={{
                            id: item.id,
                            FromCity: item.FromCity,
                            ToCity: item.ToCity,
                            DepartureTime: item.DepartureTime,
                            DateTrip:item.tripDate.format("YYYY-MM-DD"),
                            transport: item.transport,
                            Price: Number(item.Price),
                            BookedSeats: item.BookedSeats,
                            driver_name: "",
                            driver_image: ""
                        }}
                                  color={"#FFF8F0"}
                                  onPress={() =>
                                      router.push({
                                          pathname: "/TripDetails/[id]",
                                          params: { id: item.id },
                                      })
                                  }/>

                    ))}
                </ScrollView>
            )}

            {tab === "History" && (
                <ScrollView style={styles.cardTrip}>
                    {displayedTrips.map((item) => (
                        <ItemCard key={item.id + item.tripDate} item={{
                            id: item.id,
                            FromCity: item.FromCity,
                            ToCity: item.ToCity,
                            DepartureTime: item.DepartureTime,
                            transport: item.transport,
                            DateTrip:item.DateTrip,
                            Price: Number(item.Price),
                            BookedSeats: item.BookedSeats,
                            driver_name: "",
                            driver_image: "",

                        }}
                        color={"#FFF8F0"}/>
                    ))}
                </ScrollView>)}
            </View>
        </SafeAreaView>

    );
}
const styles = StyleSheet.create({
    topContainer:{
        flexDirection:"column",
        gap:15 ,
        padding:10,
        marginTop:10
    },

    bottomContainer:{
        flex:.65,
        backgroundColor:"#fbf0e6",
        borderRadius:30
    },

    button: {
        backgroundColor: "#E55C16",
        padding: 9,
        marginTop: 40,
        alignItems:"center",
        flex:1
    },

    buttonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },

    cardTrip:{
        padding:10,
},

    headerButton:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 5
},

    calendar:{
        height: 120,
        paddingTop: 30 ,
        borderRadius:20,
        shadowColor: "#000",
        width:370,
        marginTop:25,
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 5
    }

});