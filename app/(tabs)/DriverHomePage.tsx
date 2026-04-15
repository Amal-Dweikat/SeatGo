import Hero from "@/components/Hero";
import { router } from "expo-router";

export default function driverHomePage() {

    return (


    <Hero
        image={require("@/assets/img.png")}
        title={"Welcome back  \nReady to earn with your rides?"}
        subtitle={"Offer available seats in your car\n and make extra income"}
        buttonText="Schedule a Trip"
        onPress={() => router.push("/")}
    />
    );


}