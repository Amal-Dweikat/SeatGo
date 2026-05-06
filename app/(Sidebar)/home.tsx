
import UserHomeScreen from "@/app/(tabs)/UserHomeScreen";
import DriverHomePage from "@/app/(tabs)/DriverHomePage";
import {useAuth} from "@/context/AuthContext";

export default function Home() {


    const{user}=useAuth();

    if (user?.role === "driver") return <DriverHomePage />
    else return <UserHomeScreen />
}