
import * as SecureStore from "expo-secure-store";
import {useEffect, useState} from "react";
import UserHomeScreen from "@/app/(tabs)/UserHomeScreen";
import DriverHomePage from "@/app/(tabs)/DriverHomePage";

export default function Home() {
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const getRole = async () => {
            const savedRole = await SecureStore.getItemAsync("role");
            setRole(savedRole);
        };

        getRole();
    }, []);
    if (role === "driver") return <DriverHomePage />
    return <UserHomeScreen />
}