import {Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import FormInput from "@/components/FormInput";



export default function InputCityRow(props:any) {
    return (
        <View style={{ flexDirection: "row", }}>

            <View style={{ flexDirection: "column", alignItems: "center",gap:5}}>
                <Ionicons name={props.iconName} size={24} color="#E55C16" />
                {props.showDot && (
                    < >
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <Ionicons  key={i} name="ellipse" size={6} color="#CCC" style={{ marginBottom: 4 }} />
                        ))}
                    </>
                )}
            </View>

            <Text style={{marginLeft:4,width: 50 ,fontSize:15}}>
                {props.label}
            </Text>

            <View style={{ flex: 1 }}>
                <FormInput control={props.control} name={props.nameCity} placeholder={`${props.label} City`} />
                <FormInput
                    control={props.control}
                    name={props.nameArea}
                    placeholder="Specific Area"
                    icon="location-outline"
                />
            </View>
        </View>
    );
}