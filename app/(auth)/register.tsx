import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView, Alert,
} from "react-native";


import AuthBackground from "@/components/AuthBackground";
import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import {registerApi} from "@/api/authApi";
import * as SecureStore from "expo-secure-store";
import FormInput from "@/components/FormInput";
import {router} from "expo-router";



export default function RegisterScreen() {
    const {control, handleSubmit} = useForm();

    const registerMutation = useMutation({
        mutationFn: registerApi,

        onSuccess: async (res) => {
            const token = res.data.token;
            await SecureStore.setItemAsync("token", token);


        },

        onError: (err: unknown) => {

        },
    });

    const onSubmit = (data: any) => {
        registerMutation.mutate(data);
    };

    return (
        <SafeAreaView style={styles.container}>

            <AuthBackground/>


            <View style={styles.card}>
                <Text style={styles.heading}>Create Account</Text>

                <FormInput control={control} name="full_name" placeholder="Name" icon="person-outline"/>

                <FormInput control={control} name="email" placeholder="Email" icon="mail-outline"/>

                <FormInput
                    control={control}
                    name="phone_number"
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                    icon="call-outline"
                />

                <FormInput
                    control={control}
                    name="password"
                    placeholder="Password"
                    secureTextEntry
                    icon="lock-closed-outline"
                />

                <FormInput
                    control={control}
                    name="password_confirmation"
                    placeholder="Confirm Password"
                    secureTextEntry
                    icon="lock-closed-outline"
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.buttonText}>Create Your Account</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1}}/>
            <View style={styles.a}>
                <Text style={styles.b}>
                    Already have an account?<Text
                    style={styles.link}
                    onPress={() => router.push("/searchscreen")}
                >
                    Log In
                </Text>
                </Text>
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
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },


    heading: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
    },

    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },

    button: {
        backgroundColor: "#E55C16",
        padding: 12,
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