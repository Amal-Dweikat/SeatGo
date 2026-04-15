
import { View, Text, StyleSheet } from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";
import Svg, { Path } from "react-native-svg";
import MyIcon from "@/components/MyIcon";

export default function SplashScreen() {

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("/register");
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (

        <View style={styles.container}>

            <View style={styles.centerContent}>
                <MyIcon width={320} height={320} />

                <Text style={styles.text}>
                    Connecting people,{"\n"}sharing rides.
                </Text>
            </View>


            <View style={styles.bottomShape}>
                <Svg width={215} height={240} viewBox="0 0 215 240">
                    <Path
                        d="M215 185C215 287.173 128.367 370 21.5 370C-85.3671 370 -172 287.173 -172 185C-172 82.8273 -85.3671 0 21.5 0C128.367 0 215 82.8273 215 185Z"
                        fill="#F8F8F8"
                    />
                </Svg>
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