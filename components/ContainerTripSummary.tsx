import {View, Text, StyleSheet, ScrollView, Pressable, Switch, TextInput, Alert} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {useState} from "react";
import CardInfoTrip from "./CardInfoTrip";
import {BookingApi,BookingData} from "@/api/TripDetaild";

export default function TripCard({ fromCity, toCity, fromArea, toArea, price, bookedSeats,totalSeats, departureTime, arrivalTime, date, note,id,onChangeSeat}:any)  {


    const [showBooking,setShowBooking]=useState(false);
    const [seats, setSeats] = useState(1);
    const [repeat, setRepeat] = useState(false);
    const [endDate, setEndDate] = useState("");
    const isFull = bookedSeats >= totalSeats;
    const isRepeatFromDriver=true;
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const toggleDay = (day: string) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(d => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };
    const formatDate = (text: string) => {
        const today = new Date().toISOString().split("T")[0];
        const cleaned = text.replace(/\D/g, "");

        let formatted = cleaned;

        if (cleaned.length > 4) {
            formatted = cleaned.slice(0, 4) + "-" + cleaned.slice(4);
        }

        if (cleaned.length > 6) {
            formatted =
                cleaned.slice(0, 4) +
                "-" +
                cleaned.slice(4, 6) +
                "-" +
                cleaned.slice(6, 8);
        }
        if (text.length === 10 && text < today) {
            Alert.alert("InValid Date", "An expiry date cannot be selected Enter Date Valid ");
            return;
        }
        setEndDate(formatted);
    };
    const handleConfirm=()=>{

        const data : BookingData = {NumSeat: seats,
            WantRepeat: repeat,
            SelectedDays: repeat ? selectedDays : [],
            dateOfEndRepeat: repeat ? endDate : null};
        data.NumSeat=seats;
        data.WantRepeat=repeat;
        data.SelectedDays=selectedDays;
        data.dateOfEndRepeat=endDate;
        onChangeSeat(bookedSeats+seats);
        setShowBooking(false);
        BookingApi(data);
    }
    // const handleConfirm =async ()=>{
    //
    //     const data: BookingData = {
    //         NumSeat: seats,
    //         WantRepeat: repeat,
    //         SelectedDays: repeat ? selectedDays : [],
    //         dateOfEndRepeat: repeat ? endDate : null,
    //         Trip_id:id,
    //     };
    //
    //     try {
    //         await BookingApi(data);
    //         onChangeSeat(bookedSeats + seats);
    //         setShowBooking(false);
    //
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
    return (

        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Trip Summary</Text>
                  <CardInfoTrip totalSeats={totalSeats} bookedSeats={bookedSeats} fromCity={fromCity} toCity={toCity} fromArea={fromArea} toArea={toArea} price={price} departureTime={departureTime} arrivalTime={arrivalTime} date={date} note={note}  ></CardInfoTrip>
                {/* Button Go Book */}
                {!isFull && !showBooking &&(
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

                        {/* Section Reapet */}
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
                            <View style={styles.daysContainer}>
                                <Text style={[styles.noteContent,{marginBottom:20}]}>{"Choose the days on which you want to repeat the trip"}</Text>
                                {days.map((day) => {
                                    const isSelected = selectedDays.includes(day);

                                    return (

                                        <Pressable
                                            key={day}
                                            onPress={() => toggleDay(day)}
                                            style={[
                                                styles.dayCircle,
                                                isSelected && styles.daySelected
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.dayText,
                                                    isSelected && styles.dayTextSelected
                                                ]}
                                            >
                                                {day}
                                            </Text>
                                        </Pressable>
                                    );
                                })}
                            </View>
                            <View style={styles.horizontalDivider} />
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                                    <Ionicons name="calendar-outline" size={16} color="#E55C16" />

                                    <TextInput
                                        placeholder="End date for repeat: YYYY-MM-DD"
                                        value={endDate}
                                        onChangeText={formatDate}
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
        backgroundColor: '#F5F5F5'
        , padding: 5 },
    card: {
        backgroundColor: '#fff',
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
        backgroundColor: "#FAFAFA",
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
    daysContainer: {
        flexDirection: "row",
        justifyContent:"center",
        flexWrap: "wrap",
        gap: 10,
        marginTop: 10,
    },

    dayCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
    },

    daySelected: {
        backgroundColor: "#FDE5D8",
    },

    dayText: {
        fontSize: 12,
        color: "#555",
    },

    dayTextSelected: {
        color: "#E55C16",
        fontWeight: "bold",
    },
});
