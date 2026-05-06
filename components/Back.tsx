import {Pressable, StyleSheet, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";

const handlePress=()=>{
    router.back()
}
export default function Back() {

    return (
        <View style={styles.Back}>
            <Pressable onPress={()=> handlePress()}>
                <Ionicons name="chevron-back" size={30} color="#E55C16"/>
            </Pressable>
        </View>

);

}
const styles= StyleSheet.create({

    Back :{
        alignItems:"center",
        justifyContent:"center",
        position:"absolute",
        backgroundColor:"#F2F2F2",
        width:40,
        height:40,
        borderRadius:20,
        top:"15%",
        left:"5%",
    }
});