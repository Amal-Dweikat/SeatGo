import {StyleSheet, Text, View} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Rating({ rating = 0 }) {
    return (
        <View style={styles.container}>
            <Text  ><Ionicons name="stats-chart-outline" size={16} color="#E55C16" />{" : " + rating} </Text>
            <View style={styles.stars} >
            {[1, 2, 3, 4, 5].map((star) => {
                if (rating >= star) {

                    return (
                        <Ionicons
                            key={star}
                            name="star"
                            size={14}
                            color="#E55C16"
                        />
                    );
                } else if (rating >= star - 0.5) {
                    return (
                        <Ionicons
                            key={star}
                            name="star-half"
                            size={14}
                            color="#E55C16"
                        />
                    );
                } else {
                    return (
                        <Ionicons
                            key={star}
                            name="star-outline"
                            size={14}
                            color="#E55C16"
                        />
                    );
                }
            })}
        </View>
        </View>
    );
}
const styles= StyleSheet.create({

  stars:{
      flexDirection: "row",
      gap: 4,
  },
container :{
    flexDirection: "row",
    alignItems:"center",
},

    rating : {
        fontSize: 20,
    },


});