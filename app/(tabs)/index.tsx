

import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import MyIcon from "@/components/MyIcon";

export default function SplashScreen() {

    const { user, loading } = useAuth();
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {


        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 3000);

        return () => clearTimeout(timer);

    }, []);

    useEffect(() => {

        if (showSplash) return;
        if (loading) return;


        // if (!user) {
        //     router.replace("/login");
        // } else if (user.role === "driver") {
        //     router.replace("/DriverHomePage");
        // } else {
        //     router.replace("/UserHomeScreen");
        // }

        if (!user) {
            router.replace("/login");
        } else {
            router.replace("/home");
        }

    }, [showSplash, user, loading]);

    return (
        <View style={styles.container}>

            <View style={styles.centerContent}>
                <MyIcon width={320} height={320} />

                <Text style={styles.text}>
                    Connecting people,{"\n"}sharing rides.
                </Text>
            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E55C16",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },

    centerContent: {
        alignItems: "center",
        marginTop: -250,
    },

    text: {
        color: "white",
        fontSize: 25,
        textAlign: "center",
        marginTop: 20,
    },

    bottomShape: {
        position: "absolute",
        bottom: -60,
        left: -40,
    },
});