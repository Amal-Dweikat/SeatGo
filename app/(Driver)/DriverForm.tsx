import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView, SafeAreaView, ImageBackground, TouchableOpacity
} from "react-native";
import FormInput from "@/components/FormInput";
import {useForm} from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createDriverApi } from "@/api/driverApi";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import {router} from "expo-router";

export default function DriverForm() {
    const { control, handleSubmit } = useForm();

    const driverMutation = useMutation({
        mutationFn: createDriverApi,

        onSuccess: async (res) => {
            Alert.alert("Success", "Driver request submitted!");
            router.push("/DriverHomePage")
        },

        onError: (err: any) => {

            console.log(err?.response?.data);
        },
    });
    const onSubmit = (data: any) => {
        driverMutation.mutate(data);

    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <SafeAreaView style={styles.basecontainer}>
                    <ImageBackground source={require("@/assets/driver.png")} style={styles.container} >


                        <View style={styles.overlay} />
                        <View style={styles.content}>
                            <Text style={styles.title}>Join the SeatGo Family </Text>
                            <Text style={styles.subtitle}>{"Turn your car into an opportunity.\n Earn money, meet new people,\n and enjoy driving "}</Text>
                        </View>

                    </ImageBackground>

                    <View style={styles.card}>
                        <Text style={styles.heading}>Driver License</Text>

                        <FormInput
                            control={control}
                            name="license_number"
                            placeholder="A B C 1234"
                            icon="id-card-outline"
                        />
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.heading}>Vehicle Information</Text>

                        <FormInput
                            control={control}
                            name="type"
                            placeholder="Mercedes"
                            icon="car-sport-outline"
                        />
                        <FormInput
                            control={control}
                            name="plate_number"
                            placeholder="F-1468"
                            icon="card-outline"
                        />
                        <FormInput
                            control={control}
                            name="color"
                            placeholder="Black"
                            icon="color-fill-outline"
                        />
                        <FormInput
                            control={control}
                            name="seats"
                            placeholder="4 seat"
                            icon="people-outline"
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit(onSubmit) }
                    >
                        <Text style={styles.buttonText}>Submit Request</Text>
                    </TouchableOpacity>


                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>


    );


}

const styles = StyleSheet.create({
    basecontainer: {
        flex: 1,
        backgroundColor: "#F2F2F2",
        overflow: "hidden",

    },
    container: {
        height: 250,
        justifyContent: "center",
    },


    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.3)",

    },

    content: {
        paddingHorizontal: 20,
    },

    title: {
        marginTop:-15,
        color: "#E55C16",
        fontSize: 27,
       fontWeight: "bold",
    },

    subtitle: {
        color: "white",
        fontSize: 16,
        marginTop: 10,
        opacity: 0.9,
    },
    card: {
        backgroundColor: "#F5F5F5",
        marginHorizontal: 20,
        marginTop:18,
        borderRadius: 20,
        padding: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    heading: {
        fontSize: 14,
        fontWeight: "bold",
        color:"#e65407",
        marginTop:5,
        marginBottom: 5,

    },
    button: {
        backgroundColor: "#E55C16",
        marginHorizontal: 20,
        marginTop: 38,
        padding: 15,
        borderRadius: 50,
    },

    buttonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },


});


