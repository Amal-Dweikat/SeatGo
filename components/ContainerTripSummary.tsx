import {View, Text, StyleSheet, ScrollView, Pressable, Switch, TextInput, Alert} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState} from "react";
import CardInfoTrip from "./CardInfoTrip";
import {BookingApi, BookingData} from "@/api/TripDetaild";
import {generateRepeatedDates, scheduleTripReminder} from "@/services/notification2";
import ChooseDate from "@/components/ChooseDateRepeat";
import { formatDateInput } from "@/services/FormatDate";
export default function TripCard({ fromCity, toCity, fromArea, toArea, price, bookedSeats,totalSeats, departureTime, arrivalTime, date, note,id ,onChangeSeat,TripRepeat,endRepeatFromDriver,DriverSelectedDays}:any)  {


    const [showBooking,setShowBooking]=useState(false);
    const [seats, setSeats] = useState(1);
    const [repeat, setRepeat] = useState(false);
    const [endDate, setEndDate] = useState<any>("");
    const isFull = bookedSeats >= totalSeats;
    const isRepeatFromDriver=TripRepeat;
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    const tripDateTime = new Date(
        `${date}T${departureTime}`
    );

    const isTripEnded =
        tripDateTime < new Date();
    const handleConfirm =async ()=>{
        const data: BookingData = {
            NumSeat: seats,
            WantRepeat: repeat,
            SelectedDays: repeat ? selectedDays : [],
            dateOfEndRepeat: repeat ? endDate : null,
            Trip_id:id,
        };

        try {
            await BookingApi(data);
            if (!repeat) {
                await scheduleTripReminder(date, departureTime);
            }
            else {
                const repeatedDates = generateRepeatedDates(date, endDate, selectedDays);//function to fetch all date included in the repeated trip
                for (const tripDate of repeatedDates) {
                    await scheduleTripReminder(tripDate, departureTime);
                }
            }
            onChangeSeat(bookedSeats + seats);
            setShowBooking(false);

        } catch (err) {
            console.log(err);
        }
    }
    return (

        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Trip Summary</Text>
                  <CardInfoTrip totalSeats={totalSeats} bookedSeats={bookedSeats} fromCity={fromCity} toCity={toCity} fromArea={fromArea} toArea={toArea} price={price} departureTime={departureTime} arrivalTime={arrivalTime} date={date} note={note}  ></CardInfoTrip>
                {/* Button Go Book */}
                {!isFull && !showBooking &&!isTripEnded&&(
                    <Pressable style={styles.bookButton} onPress={()=>setShowBooking(!showBooking) }>
                        <Text style={styles.bookButtonText}>GO TO BOOK</Text>
                    </Pressable>
                )}
                {/* Booking */}
                {showBooking&&(
                    <View style={styles.bookingBox}>

                        <Text style={styles.sectionTitle}>Make Booking</Text>
                        <View style={styles.rowBetween}>
                            <Text>Choose Seats</Text>
                            <View style={styles.counter}>
                                <Pressable onPress={() => setSeats(Math.max(1, seats - 1))}>
                                    <Text style={{fontSize:16,}}>-</Text>
                                </Pressable>

                                <Text>{seats}</Text>

                                <Pressable  onPress={() => {
                                    if (seats >= (totalSeats - bookedSeats)) {

                                        Alert.alert("Not allowed", "You have reached the maximum number of available seats");
                                        return;
                                    }

                                    setSeats(seats + 1);
                                }}>
                                    <Text style={{fontSize:16,}}>+</Text>
                                </Pressable>
                            </View>
                        </View>

                        {/* Section Repeat */}
                        {/*To show or not to show the repeat option*/}
                        { isRepeatFromDriver &&  (
                        <>
                        <View style={styles.horizontalDivider} />
                        <View style={styles.rowBetween}>
                            <Text>Repeat Trip</Text>
                            <Switch
                                value={repeat}
                                onValueChange={setRepeat}
                                thumbColor={repeat ? "#f67b34" : "#fff"}
                                trackColor={{ false: "#ccc", true: "#E55C16" }}
                            />
                        </View>
                        </>
                        )}
                        {/*To choose the days of repetition*/}
                        { repeat &&  (
                            <>
                            <View style={styles.horizontalDivider} />
                           <ChooseDate selectedDays={selectedDays}
                                       setSelectedDays={setSelectedDays}
                           DriverSelectedDays={DriverSelectedDays}></ChooseDate>
                            <View style={styles.horizontalDivider} />
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                                    <Ionicons name="calendar-outline" size={16} color="#E55C16" />

                                    <TextInput
                                        placeholder="End date for repeat: YYYY-MM-DD"
                                        value={endDate}
                                        onChangeText={(text) => {

                                            const formatted :any =
                                                formatDateInput(text,date);

                                            if (formatted === null) {
                                                return;
                                            }


                                            if (
                                                formatted > endRepeatFromDriver
                                            ) {

                                                Alert.alert(
                                                    "Invalid Date",
                                                    `Maximum allowed date is ${endRepeatFromDriver}`
                                                );

                                                return;
                                            }

                                            setEndDate(formatted);
                                        }}
                                        style={{ flex: 1 }}
                                    />
                                </View>
                            </>
                        )}

                        {/* Button Book && cancel */}
                        {!isFull && showBooking &&(
                            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                <Pressable style={[styles.bookButton,{backgroundColor:'#ae3324',}]} onPress={()=>setShowBooking(!showBooking) }>
                                    <Text style={styles.bookButtonText}>CANCEL</Text>
                                </Pressable>
                            <Pressable style={styles.bookButton} onPress={handleConfirm }>
                                <Text style={styles.bookButtonText}>CONFIRM</Text>
                            </Pressable>
                            </View>
                        )}
                    </View>
                )}

            </View>
        </ScrollView>
    );
}
const styles= StyleSheet.create({

    container: { flex: 1,
        backgroundColor: '#fbf0e6'
        , padding: 5 },
    card: {
        backgroundColor: '#fff8f0',
        borderRadius: 15,
        padding: 10,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    horizontalDivider: { height: 1,
        backgroundColor: '#EEE',
        marginVertical: 15 },

    sectionTitle: { fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#E55C16' },

    noteContent: {
        fontSize: 13,
        color: '#666',
        lineHeight: 18 },

    bookButton: {
        backgroundColor: '#E55C16',
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center'
        ,width:"40%",
        alignSelf:"flex-end"},
    bookButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14 },

    bookingBox: {
        marginTop: 12,
        backgroundColor: "#fff8f0",
        padding: 12,
        borderRadius: 12,
    },

    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },

    counter: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

});
