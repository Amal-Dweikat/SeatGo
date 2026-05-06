import {StyleSheet, Text, View} from "react-native";
import { Ionicons } from "@expo/vector-icons";


export default function CardInfoTrip( props:any ){


    const isFull = (props.bookedSeats) >= (props.totalSeats);

    return (
        <>
        <View style={styles.locationRow}>
            <View style={styles.locationPoint}>
                <Ionicons name="location-outline" size={30} color="#E55C16" />
                <View style={{flexDirection :"column",}}>
                    <Text style={styles.cityText}>{props.fromCity}</Text>
                    <Text style={styles.areaText}>{props.fromArea}</Text>
                </View>

            </View>
            <Ionicons name="arrow-forward" size={30} color="#E55C16" />
            <View style={styles.locationPoint}>
                <Ionicons name="location-outline" size={30} color="#E55C16" />
                <View style={{flexDirection :"column",}}>
                    <Text style={styles.cityText}>{props.toCity}</Text>
                    <Text style={styles.areaText}>{props.toArea}</Text>
                </View>
            </View>
        </View>

    <View style={styles.horizontalDivider} />


    <View style={{flexDirection :"row",alignItems:"center",justifyContent:"space-around"}}>
        <View style={styles.gridItem}>
            <Ionicons name="calendar-outline" size={20} color="#E55C16" />
            <Text style={styles.gridLabel}>Date</Text>
            <Text style={styles.gridValue}>{props.date}</Text>
        </View>
        <View style={styles.verticalDivider} />
        <View style={styles.gridItem}>
            <Ionicons name="time-outline" size={20} color="#E55C16" />
            <Text style={styles.gridLabel}>Departure</Text>
            <Text style={styles.gridValue}>{props.departureTime}</Text>
        </View>
        <View style={styles.verticalDivider} />
        <View style={styles.gridItem}>
            <Ionicons name="flag-outline" size={20} color="#E55C16" />
            <Text style={styles.gridLabel}>Expected Arrival</Text>
            <Text style={styles.gridValue}>{props.arrivalTime}</Text>
        </View>
    </View>


    <View style={styles.horizontalDivider} />

    <View style={{flexDirection :"row",alignItems:"center",justifyContent:"space-around"}}>
        <View style={styles.gridItem}>
            <Ionicons name="cash-outline" size={20} color="#E55C16" />
            <Text style={styles.gridLabel}>Price Per Seats</Text>
            <Text style={styles.gridValue}> {props.price}  {"ILS"} </Text>
        </View>
        <View style={styles.verticalDivider} />
        <View style={styles.gridItem}>
            <Ionicons name="people-outline" size={20} color="#E55C16" />
            <Text style={styles.gridLabel}>Seats</Text>
            <Text style={styles.gridValue}> {props.bookedSeats} / {props.totalSeats}</Text>
        </View>

    </View>


    <View style={styles.horizontalDivider} />



    {/* Status book */}
    <View style={styles.statusRow}>
        <Text style={styles.statusLabel}>Booking Status:</Text>

        <View style={[
            styles.statusBadge,
            isFull ? styles.fullBadge : styles.activeBadge
        ]}>
            <View style={[
                styles.statusDot,
                { backgroundColor: isFull ? '#E74C3C' : '#4CAF50' }
            ]} />
            <Text style={[
                styles.statusText,
                { color: isFull ? '#E74C3C' : '#4CAF50' }
            ]}>
                {isFull ? "FULL" : "ACTIVE"}
            </Text>
        </View>
    </View>

    <View style={styles.horizontalDivider} />
    {/* Note Driver */}
    <View style={styles.noteBox}>
        <Text style={styles.noteTitle}>{"Driver's Note:"}</Text>
        <Text style={styles.noteContent}>
            {props.note}
        </Text>
    </View>
    </>
    );
}
const styles= StyleSheet.create({

    verticalDivider: {width: 1,
        height: "100%",
        backgroundColor: '#EEE' },
    horizontalDivider: { height: 1,
        backgroundColor: '#EEE',
        marginVertical: 15 },

    sectionTitle: { fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#E55C16' },
    locationRow: { flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
        ,gap:2, },
    locationPoint: { alignItems: 'center',
        flex: 1 ,
        flexDirection :"row",
        gap:2  },
    cityText: { fontSize: 17,
        fontWeight: 'bold',
        color: '#333' },
    areaText: { fontSize: 12,
        color: '#777' },


    gridItem: {
        flex: 1,
        alignItems: 'center' },
    gridLabel: {
        fontSize: 11,
        color: '#999',
        marginTop: 5 },
    gridValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333' },

    statusRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center' },
    statusLabel: {
        fontSize: 14,
        color: '#555',
        marginRight: 10 },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20 },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4CAF50',
        marginRight: 6 },
    statusText: {
        color: '#4CAF50'
        , fontWeight: 'bold',
        fontSize: 12 },
    activeBadge: {
        backgroundColor: '#E8F5E9',
    },
    fullBadge: {
        backgroundColor: '#FDEDEC',
    },

    noteBox: { backgroundColor: '#F9F9F9',
        padding: 12, borderRadius: 10,
        marginTop: 20,
        borderLeftWidth: 4,
        borderLeftColor: '#E55C16'
    },
    noteTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5
    },
    noteContent: {
        fontSize: 13,
        color: '#666',
        lineHeight: 18 },



});