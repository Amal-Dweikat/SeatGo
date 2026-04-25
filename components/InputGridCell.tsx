import {StyleSheet, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import FormInput from "@/components/FormInput";

export default function InputGridCell(props:any) {
    return (   <View style={[styles.cell, props.leftCell&& styles.rightBorder,props.leftCell && {flex:.95} ,props.rightCell&&{paddingHorizontal:5}]}>

            {/* الخلية 1: التاريخ */}
            <Text style={styles.cellLabel}>{props.text}</Text>
            <View style={[props.leftCell&& {width:"95%"},props.rightCell&& {width:"100%"}]}>
                <FormInput
                    control={props.control}
                    name={props.name}
                    placeholder={props.placeholder}
                    icon={props.nameIcon}
                /></View>
        </View>
    );
}
const styles = StyleSheet.create({


    cell: {
        flex: 1,

    },
    rightBorder: {
        borderRightWidth: 1,
        borderRightColor: '#EEE', // خط عمودي خفيف جداً
    },
    cellLabel: {
        fontSize: 10,
        //fontWeight: 'bold',
        color: '#333',
    }
});
