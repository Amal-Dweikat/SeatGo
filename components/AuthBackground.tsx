import {View, StyleSheet, SafeAreaView} from "react-native";
import Svg, { Ellipse, Path } from "react-native-svg";
import MyIcon from "@/components/MyIcon";

export default function AuthBackground() {
    return (
        <View style={StyleSheet.absoluteFillObject} pointerEvents="none">

            <View style={styles.topSection}>
                <View style={styles.svgContainer}>
                    <Svg width="100%" height={320} viewBox="0 0 402 277">
                        <Ellipse
                            cx="201"
                            cy="-31"
                            rx="326"
                            ry="308"
                            fill="#E55C16"
                        />
                    </Svg>
                </View>
                <View style={styles.headerContent}>
                    <MyIcon width={200} height={200} />
            </View>
            </View>




            <View style={styles.bottomFixed}>
                <Svg width="100%" height={120} viewBox="0 0 402 110">
                    <Path
                        d="M466 185C466 287.173 347.355 370 201 370C54.6445 370 -64 287.173 -64 185C-64 82.8273 54.6445 0 201 0C347.355 0 466 82.8273 466 185Z"
                        fill="#F8F8F8"
                    />
                </Svg>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    topSection: {
        height: 200,
        position: "absolute",
        top: 0,
        width: "100%",
    },
    headerContent: {
        alignItems: "center",
        marginTop: -15,
    },
    svgContainer: {
        position: "absolute",
        top: -50,
        width: "100%",
        alignItems: "center",
    },
    bottomSvg: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        alignItems: "center",
    },
    bottomFixed: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: "center",
    },
});