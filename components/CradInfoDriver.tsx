import {StyleSheet, Text, View, Image, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Rating from "@/components/Rating";



export default function CardInfoDriver({name,phone,rating,typeCar,colorCar,plateNum, showCarInfo = true ,  profile_picture,showEditIcon = false,  onEditPress,image}:any){
    const driverImages:any = {
        1: require("../assets/images/Driver1.jpg"),
        2: require("../assets/images/Driver2.jpg"),
        3: require("../assets/images/Driver3.jpg"),
        4: require("../assets/images/Driver4.jpg"),
        5: require("../assets/images/Driver5.jpg"),
        6: require("../assets/images/Driver6.jpg"),
    };
    const getImageSource = () => {
        if (profile_picture) {
            return { uri: profile_picture };
        }

        if (image && driverImages[image]) {
            return driverImages[image];
        }

        return require("../assets/images/Driver3.jpg"); // default
    };
return(
  <View style={styles.cardInfoDr}>
    <View style={styles.TopInfo} >
        <Image
            source={getImageSource()}
            style={styles.driverImage}
        />
        {showEditIcon && (
            <TouchableOpacity
                onPress={onEditPress}
                style={styles.editIcon}
            >
                <Ionicons name="camera" size={14} color="#fff" />
            </TouchableOpacity>
        )}

       <View style={styles.DriverInfo} >
         <Text style={styles.driverName} >{name}</Text>
         <Text ><Ionicons name="person" size={16} color="#E55C16" />{":"}{name}</Text>
         <Text ><Ionicons name="call" size={16} color="#E55C16" />{" :"}{ phone}</Text>
         <Rating rating={rating} />
       </View>
    </View  >

      {showCarInfo && (
          <>
    <View style={{ borderColor: "rgba(0,0,0,0.2)", borderBottomWidth: 1 ,marginVertical: 10 }} >
    </View>


    <View style={styles.BottomInfo}>
         <View style={styles.layoutCarInfo}>
               <Ionicons name="car-sport" size={20} color="#E55C16" />
               <Text>{typeCar} </Text>
         </View>
         <View style={styles.lineBetweenCarInfo}/>
         <View style={styles.layoutCarInfo}>
               <Ionicons name="color-palette-outline" size={20} color="#E55C16" />
               <Text>{colorCar}</Text>
         </View>
         <View style={styles.lineBetweenCarInfo}/>
         <View style={styles.layoutCarInfo}>
               <Ionicons name="card-outline" size={20} color="#E55C16" />
               <Text>{plateNum}</Text>
         </View>
    </View>
          </>
      )}
  </View>

      );
}

const styles= StyleSheet.create({
    cardInfoDr :{
        flex :1.5,
        backgroundColor:"#fff8f0",
        borderRadius: 20,
        width: "100%",
        height:"100%",
        borderWidth: 1.5,
        borderColor: "#fff8f0",
        elevation: 6,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        padding :10,
    },
    TopInfo :{
        flexDirection: "row",
        alignItems: "center",
        gap: 25,
    },
    driverImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: "#ea7641",
    },
    DriverInfo:{
        gap:5,
    },
    driverName: {
        fontSize: 20,
        fontWeight: "bold",
        //alignSelf:"center",
    },
    editIcon: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#E55C16",
        width: 26,
        height: 26,
        borderRadius: 13,
        justifyContent: "center",
        alignItems: "center",
    },
    BottomInfo:{
        flexDirection:"row",
        alignItems:"center",

    },
    lineBetweenCarInfo:{width: 1.5, height: 40,backgroundColor: 'rgba(0,0,0,0.1)'},
    layoutCarInfo:{ flex: 1, alignItems: 'center', paddingHorizontal: 5 },
});