import {ScrollView, StyleSheet, Text, View} from "react-native";
import AuthBackground from "@/components/AuthBackground";
import {SafeAreaView} from "react-native-safe-area-context";
import {useForm} from "react-hook-form";
import InputCityRow from "@/components/StyleInputFormCity";
import {Ionicons} from "@expo/vector-icons";
import FormInput from "@/components/FormInput";
import InputGridCell from "@/components/InputGridCell";

export default function FormScheduleTrip(){
    const { control, handleSubmit } = useForm();

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
                name={"setas"}
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

    <ScrollView style={styles.cardComplete}>
        <View style={styles.card}></View>
        <View style={styles.card}></View>


    </ScrollView>

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
        height: "50%", // طول الخلية
    },
    horizontalLine: {
        height: 1,
        backgroundColor: '#EEE', // خط أفقي خفيف جداً
        width: '100%',
    },
});

