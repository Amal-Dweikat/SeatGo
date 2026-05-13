import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity, ScrollView, Alert,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useEffect, useState} from "react";
import { router} from "expo-router";
import {historyNotification} from "@/api/notification";
import {useQuery} from "@tanstack/react-query";


type Props = {
    image: any;
    title: string;
    subtitle: string;
    buttonText: string;
    onPress: () => void;
    showNotification?: boolean;
    showButton?: boolean;
    height?: number;
};

export default function Hero({
                                 image,
                                 title,
                                 subtitle,
                                 buttonText,
                                 onPress,
                                 showNotification = false,
                                 showButton = true,
                                 height = 250,
                             }: Props) {
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const  { data,isLoading}  = useQuery({
        queryKey: ["notifications"],
        queryFn: historyNotification,
    });

    const notifications = data?.data?.notification ?? [];
    return (
        <ImageBackground source={image} style={styles.container} imageStyle={styles.image}>

            {showNotification && (
                <TouchableOpacity style={styles.notificationIcon}
                    onPress={() =>
                    setIsNotificationsOpen(!isNotificationsOpen)
                }>
                    <Ionicons
                        name="notifications-outline"
                        size={24}
                        color="#FFD6A5"
                    />
                </TouchableOpacity>
            )}
            {isNotificationsOpen && (
                <View style={styles.notificationBox}>
                <Text style={[styles.title,{color:"#e55c16",top:-10}]}>  Notification </Text>
                <ScrollView >
                    {isLoading ? (
                        <Text style={styles.text}>
                            Loading...
                        </Text>
                    ) : notifications.length === 0 ? (
                        <Text style={styles.text}>
                            No notifications
                        </Text>
                    ) : (
                        notifications.map((item: any, index: any) => (
                            <View key={index} style={styles.notificationItem}>

                                <Text style={{ color: "rgb(57,56,56)", fontWeight: "bold" }}>
                                    🔴 {item.body}
                                </Text>

                                <TouchableOpacity
                                    onPress={() => {
                                        router.push({
                                            pathname: "/(Trip)/[id]",
                                            params: { id: item.booking_id },
                                        });
                                    }}
                                >
                                    <Text style={styles.link}>More</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    )}
                </ScrollView>
                </View>
            )}

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

    notificationBox: {
        position: "absolute",
        top: 80,
        right: 10,
        width: 330,
        maxHeight: 300,
        backgroundColor: "#fbf0e6",
        borderRadius: 12,
        padding: 10,
        elevation: 12,
        zIndex: 999,

    },

    notificationItem: {
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
        flexDirection:"row",
        justifyContent:"space-between"
    },

    link:{
        color:"#e55c16"
    },

    text:{
        textAlign: "center",
        color: "#777"
    }
});