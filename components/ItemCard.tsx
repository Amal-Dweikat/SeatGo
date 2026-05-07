import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View ,Image} from "react-native";
import {Ionicons} from "@expo/vector-icons";


type Item = {
  id: number;
  FromCity: string;
  ToCity: string;
  DepartureTime: string;
  DateTrip:string;
  transport: string;
  Price: number;
  BookedSeats: number;
  driver_name: string;
  driver_image: string;
};

type Props = {
  item: Item;
  color?:string;
  onPress?: () => void;
};
const placeImages = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
  "https://www.palestineremembered.com/GeoPoints/Nablus_7335/Nablus-59832.webp"
];
const getImage = (id: number) => {
  return placeImages[id % placeImages.length];
};
export default function ItemCard({ item , color = "#fff" , onPress,}: Props) {
  return (
    <View style={[styles.card,{backgroundColor:color}]}>
      <View style={styles.header}>
        <Text style={styles.city}>
          <Ionicons name="location-outline" size={15} color="#E55C16" />
          {item.FromCity} → {item.ToCity}
        </Text>
        <Text style={styles.price}>{item.Price} ₪</Text>
      </View>
      <View style={styles.row}>
        <Image style={styles.image}    source={{uri: getImage(item.id)}} ></Image>
        <View style={{flexDirection:"column",gap:5}}>

          <View style={[styles.row]}>
          <Text style={styles.city}><Ionicons name="calendar-outline" size={15} color="#E55C16" /> {item.DateTrip}</Text>
          <Text style={styles.city}><Ionicons name="time-outline" size={15} color="#E55C16" /> {item.DepartureTime}</Text>
          </View>
          <View style={[styles.row]}>
          <Text>👥 {item.BookedSeats} Passengers</Text>
          <Text><Ionicons name="car-sport-outline" size={15} color="#E55C16" /> {item.transport}</Text>
          </View>
        </View>
      </View>
      <View style={[styles.horizontalLine]} />
      <View style={[styles.bottomcard]}>
        <TouchableOpacity
  style={styles.button}
  onPress={() => {
    if (onPress) {
      onPress();
    } else {
      router.push({
        pathname: "/(Trip)/[id]",
        params: { id: item.id },
      });
    }
  }}

>
  <Text style={styles.buttonText}>View Details</Text>
</TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {

    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 16,
    elevation: 4,
  },

  header: {

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",


  },

  city: {
    fontSize: 16,
    color: "#000",

  },

  price: {
    borderColor:"#E55C16",
    borderRadius:10,
    borderWidth:1,
    padding:5,
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",


  },

  row: {
    flexDirection: "row",
    gap: 10,
    marginTop: 5,
  },

  tag: {
    backgroundColor: "#f2f6ff",
    padding: 5,
    borderRadius: 10,
  },
  image:{

    width:80,
    height:80,
    borderRadius:15,
    borderWidth: 1.5,
    borderColor: "#ea7641",
  },

  bottomcard: {
    marginTop: 15,

  },

  button: {
    backgroundColor: "#E55C16",
    padding: 10,
    borderRadius: 10,
    marginBottom:-8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign:"center"
  },
  horizontalLine: {
    height: 1.5,
    backgroundColor: '#EEE',
    width: '100%',
    marginTop:10,

  },
});
