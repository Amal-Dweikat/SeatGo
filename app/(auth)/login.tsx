import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Alert,
} from "react-native";

import AuthBackground from "@/components/AuthBackground";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/api/authApi";
import * as SecureStore from "expo-secure-store";
import FormInput from "@/components/FormInput";
import {router} from "expo-router";



export default function LoginScreen() {
    const { control, handleSubmit } = useForm();


    const loginMutation = useMutation({
        mutationFn: loginApi,

        onSuccess: async (res) => {
            const token = res.data.token;

            await SecureStore.setItemAsync("token", token);

            Alert.alert("Success", "Logged in successfully");

        },

        onError: (err: any) => {
            const message =
                err?.response?.data?.message || "Login failed";

            Alert.alert("Error", message);
        },
    });


    const onSubmit = (data: any) => {
        loginMutation.mutate(data);
    };

    return (
        <SafeAreaView style={styles.container}>
            <AuthBackground />

            <View style={styles.card}>
                <Text style={styles.heading}>Welcome Back</Text>

                <FormInput
                    control={control}
                    name="email"
                    placeholder="Email"
                    icon="mail-outline"
                />

                <FormInput
                    control={control}
                    name="password"
                    placeholder="Password"
                    secureTextEntry
                    icon="lock-closed-outline"
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }} />

            <View style={styles.a}>
                <Text style={styles.b}>
                    {"Don't have an account?"}
                </Text>
                <Text style={styles.link} onPress={() => router.push("/DriverHomePage")}>Creat Account</Text>
            </View>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2",
        overflow: "hidden",

    },
    a:{

        alignItems: "center",
        marginBottom: 120,
    },


    b:{
        alignItems: "center",

    },

    card: {
        backgroundColor: "#F5F5F5",
        marginHorizontal: 20,
        marginTop: 150,
        borderRadius: 20,
        padding: 20,
        paddingBottom:60,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },


    heading: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop:25,
        marginBottom: 28,
        textAlign: "center",
    },



    button: {
        backgroundColor: "#E55C16",
        padding: 10,
        borderRadius:50,
        marginTop: 10,
    },

    buttonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },




    link: {

        color: "#E55C16",
        fontWeight: "bold",
    },
});