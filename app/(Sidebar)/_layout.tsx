import { Drawer } from "expo-router/drawer";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import * as SecureStore from "expo-secure-store";
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import {Pressable, View,StyleSheet,Text,Image} from "react-native";
import MyIcon from "@/components/MyIcon";
import { useAuth } from "@/context/AuthContext";



    function CustomDrawerContent(props: any) {
        const getGreeting = () => {
            const hour = new Date().getHours();

            if (hour < 12) return "Good Morning ☀️";
            if (hour < 18) return "Good Afternoon 🌤️";
            return "Good Evening 🌙";
        };
        const { logout } = useAuth();

        const handleLogout = async () => {
            await logout();
            router.replace("/login");
        }; return (
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ flex: 1 }}
            >
                <View style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <View style={styles.avatar}>
                        <MyIcon
                            height={80}
                            width={80}
                        />
                        </View>
                        <Text style={styles.text}>{getGreeting()}</Text>
                        <Text style={styles.subText}>Where are you heading today?</Text>
                    </View>
                    <DrawerItemList {...props}  />
                </View>

                <Pressable
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <Ionicons
                        name="log-out-outline"
                        size={22}
                        color="#e55c16"

                    />

                    <Text style={styles.logoutText}>
                        Logout
                    </Text>
                </Pressable>
            </DrawerContentScrollView>
        );}
    export default function DrawerLayout() {
    return (
        <Drawer
            drawerContent={(props) => (
                <CustomDrawerContent {...props} />
            )}
            screenOptions={{
                headerShown: false,
                drawerItemStyle: {
                    borderBottomWidth: 1,
                    borderBottomColor: "#E0E0E0",
                    marginVertical: 2,
                    marginHorizontal:0,
                    marginLeft:-5,
                },
                drawerStyle: {
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    backgroundColor: "#FFF8F0",
                    width: 240,
                },
                drawerContentContainerStyle: {
                    marginTop:20
                },

                drawerActiveBackgroundColor: "rgba(229,92,22,0.53)",
                drawerActiveTintColor: "#fff",
                drawerInactiveTintColor: "#e55c16",
                drawerLabelStyle: {
                    fontSize: 14,
                    fontWeight: "600",
                    padding:10,
                    marginLeft:-10,
                },

            }}
        >
            <Drawer.Screen
                name="home"
                options={{
                    drawerLabel: "Home",
                    title: "Home",
                    drawerIcon: ({ color, size }) => (
                        <Ionicons
                            name="home-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Drawer.Screen
                name="profile"
                options={{
                    drawerLabel: "Profile",
                    title: "Profile",
                    drawerIcon: ({ color, size }) => (
                        <Ionicons
                            name="person-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Drawer.Screen
                name="MyTrip"
                options={{
                    drawerLabel: "MyTrip",
                    title: "MyTrip",
                    drawerIcon: ({ color, size }) => (
                        <Ionicons
                            name="car-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Favorites"
                options={{
                    drawerLabel: "Favorites",
                    title: "Favorites",
                    drawerIcon: ({ color, size }) => (
                        <Ionicons
                            name="heart-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Drawer>
    );
}
const styles = StyleSheet.create({
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: "#ddd",
    },

    logoutText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: "600",
        color:"#e55c16"
    },header: {
flex:.6,

        borderRadius: 20,
        alignItems: "center",
        justifyContent:"center",
        borderBottomWidth:1,
        borderBottomColor:"#ddd"
    },

    avatar: {
        width: 80,
        height:80,
        marginBottom: 10,
        justifyContent:"center",
        backgroundColor: "rgba(229,92,22,0.53)",
        borderRadius: 40,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,

    },
    text: {
        fontSize: 20,
        fontWeight: "700",
        color: "#e55c16",
    },

    subText: {
        fontSize: 13,
        color: "#7A7A7A",
        marginTop: 4,
    },
});