import { Image } from "react-native";

export default function MyIcon({
                                   width = 200,
                                   height = 200,
                               }: {
    width?: number;
    height?: number;
}) {
    return (
        <Image
            source={require("@/assets/logo2.png")}
            style={{
                width,
                height,
                resizeMode: "contain",
            }}
        />

    );
}