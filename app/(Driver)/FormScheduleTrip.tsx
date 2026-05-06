import {Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import AuthBackground from "@/components/AuthBackground";
import {SafeAreaView} from "react-native-safe-area-context";
import {useForm} from "react-hook-form";
import InputCityRow from "@/components/StyleInputFormCity";
import {Ionicons} from "@expo/vector-icons";
import FormInput from "@/components/FormInput";
import InputGridCell from "@/components/InputGridCell";
import { Picker } from "@react-native-picker/picker";
import {useState} from "react";
import {scheduleTrip} from "@/api/TripDetaild";
import {router} from "expo-router";

export default function FormScheduleTrip(){
    const { control, handleSubmit } = useForm();
    const [answer, setAnswer] = useState(false);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const [endDate, setEndDate] = useState("");
    const onSubmit = async (data: any) => {
        const payload = {
            ...data,

            DriverWantRepeat: answer,
            DriverSelectedDays:answer ? selectedDays : null,
            EndRepeat: answer ? endDate : null,
        };
        scheduleTrip(payload);
        router.replace("/home");
    };
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

    return(
    <SafeAreaView style={styles.container}>

        <AuthBackground/>

    <View style={styles.content}>
    <View style={styles.cardInfoDr}>
       <InputCityRow
       label={"FROM"}
       nameCity={"FromCity"}
       nameArea={"SpecificFromArea"}
       iconName={"radio-button-on-outline"}
       showDot={true}
       control={control}
       />
        <InputCityRow
            label={"TO"}
            nameCity={"ToCity"}
            nameArea={"SpecificToArea"}
            iconName={"location-outline"}
            showDot={false}
            control={control}
        />

    </View>
    <View style={styles.cardComplete}>
        <View style={styles.row }>
            <InputGridCell
                leftCell={true}
                rightCell={false}
                name={"price"}
                control={control}
                placeholder={"ILS $"}
                text={"Price Trip"}
                nameIcon={"cash-outline"}/>

            <InputGridCell
                leftCell={false}
                rightCell={true}
                name={"date"}
                control={control}
                placeholder={"YYYY-MM-DD"}
                text={"Date Trip"}
                nameIcon={"calendar-outline"}/>
        </View>

        <View style={styles.horizontalLine} />

        <View style={styles.row}>
            <InputGridCell
                leftCell={true}
                rightCell={false}
                name={"time"}
                control={control}
                placeholder={"HH:MM"}
                text={"Departure Time"}
                nameIcon={"time-outline"}/>
            <InputGridCell
                leftCell={false}
                rightCell={true}
                name={"setas"}
                control={control}
                placeholder={"Number Seats"}
                text={"Available Seats"}
                nameIcon={"people-outline"}/>        </View>
     </View>
<View style={styles.cardComplete}>
    <ScrollView style={[styles.container,{padding:5,backgroundColor: "#F5F5F5",marginBottom:5}]}>
        <Text style={styles.text}>Transport</Text>
        <FormInput control={control} name={"transport"} placeholder={"Select transport such as 'Bus,Car'"}/>
        <View style={[styles.horizontalLine,{marginBottom:5,}]} />
        <Text style={styles.text}>Note</Text>
        <FormInput control={control} name={"note"} placeholder={"Write note for passengers "}/>
        <View style={[styles.horizontalLine,{marginBottom:5,}]} />
        <Text style={styles.text}>Do you want this trip to be a recurring one?</Text>
        <View style={styles.pickerBox}>
            <Picker
                selectedValue={answer}
                onValueChange={(itemValue) => setAnswer(itemValue)}
            >
                <Picker.Item label="Select answer" value="" />
                <Picker.Item label="True" value={true} />
                <Picker.Item label="False" value={false} />
            </Picker>

        </View>
        { answer &&  (
            <>
                <View style={[styles.horizontalLine,{marginBottom:5,}]} />

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
                <View style={[styles.horizontalLine,{marginBottom:5,}]} />
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
        <TouchableOpacity  style={styles.button} onPress={handleSubmit(onSubmit)} >
        <Text style={{color:"white"}}>Schedule</Text>
        </TouchableOpacity>
    </ScrollView>
</View>
    </View>




    </SafeAreaView>
);

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2",

    },
    content: {
        flex: .8,
        alignItems: "center",
        top:"18%",
        gap:10,
        width: "90%",
        alignSelf: "center",
        color: "#E55C16",
        borderRadius: 20,


    },
    cardInfoDr :{
        flex :1.8,
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
gap:5,
    },
    containerComplete:{ backgroundColor:"#F7F7F7",
        borderRadius: 20,
        width: "100%",
        height:"100%",
        borderWidth: 1.5,
        borderColor: "rgba(255,255,255,0.6)",
        elevation: 6,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        padding :10,},
    cardComplete :{
        flex :1,
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
    },card: {
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
    row: {
        flexDirection: 'row',
        height: "50%"
    },
    horizontalLine: {
        height: 1,
        backgroundColor: '#EEE',
        width: '100%',

    },
    text: {
        fontSize: 10,
        marginBottom:5,
        color: '#333',
    }, pickerBox: {
        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: "#fff",

        overflow: "hidden",
    }, daysContainer: {
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
    noteContent: {
        fontSize: 13,
        color: '#666',
        lineHeight: 18 },
    button:{
      width:"35%",
        backgroundColor:"#E55C16",
        alignSelf:"flex-end",
        alignItems:"center",
        borderRadius:10,
        marginBottom:15,
        padding:8,
    },
});

