import {View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView, SafeAreaView} from "react-native";
import React, {useEffect, useState} from "react";
import CalendarStrip from 'react-native-calendar-strip';
import moment from "moment";
import ItemCard from "@/components/ItemCard";
import {GetTrip} from "@/api/TripDetaild";
import {useAuth} from "@/context/AuthContext";

export default function Home() {

    const [tab, setTab] = useState<"Upcoming" | "History">("Upcoming");
    const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);
    const [displayedTrips, setDisplayedTrips] = useState<any[]>([]);
    const [trips, setTrips] = useState([]);
    //fetch date today  in hour 00:00
    const today = moment().startOf("day");

    const{user}=useAuth();
    useEffect(() => {
        GetTrip()
            .then((res) => {
                setTrips(res.data.Trip);
            })
            .catch(console.log);
    }, []);
    useEffect(() => {
        if (!trips.length) return;

        const expanded = expandTrips(trips);

        let baseList =
            tab === "Upcoming"
                ? expanded.filter(t => t.tripDate.isSameOrAfter(today))
                : expanded.filter(t => t.tripDate.isBefore(today));

        if (selectedDate) {
            baseList = baseList.filter(t =>
                t.tripDate.isSame(selectedDate, "day")
            );
        }

        setDisplayedTrips(baseList);

    }, [trips, tab, selectedDate]);
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
    //This function if i have repeat trip it's split to individual card
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


    const expanded = expandTrips(trips);
    // to add dots on any date have trip on calendar
    const markedDates = expanded.map(t => ({
        date: t.tripDate,
        dots: [{ color: "#E55C16" }]
    }));






    return (
        <SafeAreaView style={{backgroundColor:"#fff",flex:1,gap:5}}>
            <ImageBackground
                source={require("../../assets/background.png")}
                style={{ flex: .35 }}
                resizeMode="cover"
                borderRadius={30}
            >
        <View style={{flexDirection:"column", gap:15 ,padding:10,marginTop:10}}>
            <View style={{ flexDirection:"row" ,justifyContent:"center",alignItems:"center"  ,shadowOpacity: 0.05,
                shadowRadius: 20,elevation: 5}}>

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
                style={{ height: 120, paddingTop: 20 ,borderRadius:20,shadowColor: "#000",
                    shadowOpacity: 0.05,
                    shadowRadius: 20,
                    elevation: 5}}
                calendarColor={'#FFF8F0'}

                calendarHeaderStyle={{ color: '#E55C16' }}
                dateNumberStyle={{ color: '#605d5d' }}
                dateNameStyle={{ color: '#605d5d' }}

                highlightDateContainerStyle={{ backgroundColor: 'rgba(229,92,22,0.5)' , borderRadius:20 ,}} // اللون الأخضر للمختار كما بالصورة
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

            <ImageBackground
                source={require("../../assets/background.png")}
                style={{ flex: .65 }}
                resizeMode="cover"
                borderRadius={20}
            >
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
                                  color={"#FFF8F0"} />

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
                </ScrollView>
            )}
            </ImageBackground>
        </SafeAreaView>

    );
}
const styles = StyleSheet.create({
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


});