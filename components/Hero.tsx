import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";

type Props = {
    image: any;
    title: string;
    subtitle: string;
    buttonText: string;
    onPress: () => void;
};

export default function Hero({
                                 image,
                                 title,
                                 subtitle,
                                 buttonText,
                                 onPress,
                             }: Props) {
    return (
        <ImageBackground source={image} style={styles.container} imageStyle={styles.image}>

            <TouchableOpacity
                style={styles.notificationIcon}
            >
                <Ionicons name="notifications-outline" size={24} color="#FFD6A5" />
            </TouchableOpacity>

            <View style={styles.overlay} />

            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>

                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </TouchableOpacity>
            </View>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 250,
        justifyContent: "center",
    },

    image: {

    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.3)",

    },

    content: {
        paddingHorizontal: 20,
    },

    title: {
        marginTop:25,
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
    },

    subtitle: {
        color: "white",
        fontSize: 14,
        marginTop: 8,
        opacity: 0.9,
    },

    button: {
        marginTop: 35,
        backgroundColor: "#E55C16",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignSelf: "flex-start",
    },

    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
    notificationIcon: {
        position: "absolute",
        top: 45,
        right: 15,
        zIndex: 10,
        padding: 8,
        borderRadius: 20,
    },
});