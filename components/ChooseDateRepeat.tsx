import { Pressable, StyleSheet, Text, View} from "react-native";

type Props = {
    selectedDays: string[];
    setSelectedDays: (days: string[]) => void;
    DriverSelectedDays?:string[];
};


export default function ChooseDate({selectedDays, setSelectedDays,DriverSelectedDays}: Props){


    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const daysToShow =
        DriverSelectedDays?.length
            ? DriverSelectedDays
            : days;
    const toggleDay = (day: string) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(d => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };


    return(
        <View style={styles.daysContainer}>
            <Text style={styles.title}>{"Choose the days on which you want to repeat the trip"}</Text>
            {daysToShow.map((day) => {
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
    );

}

const styles= StyleSheet.create({

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
    title: {
        fontSize: 13,
        color: '#666',
        lineHeight: 18 ,
        marginBottom:20},
});
