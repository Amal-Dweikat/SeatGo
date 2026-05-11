import {Alert,Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Svg, {Path} from "react-native-svg";
import {Ionicons} from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";
import {useAuth} from "@/context/AuthContext";
import CardInfoDriver from "@/components/CradInfoDriver";
import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import FormInput from "@/components/FormInput";
import {updatePasswordApi, updateProfileApi} from "@/api/authApi";
import { useRef, useState } from "react";
import { CameraView, useCameraPermissions} from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import baseApi from "@/api/baseApi";






export default function Profile(){
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<any>(null);

    const [showCamera, setShowCamera] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const openCamera = async () => {
        const { granted } = await requestPermission();

        if (!granted) {
            Alert.alert("Permission required");
            return;
        }

        setShowCamera(true);
    };

    const takePhoto = async () => {
        if (!cameraRef.current) return;

        const result = await cameraRef.current.takePictureAsync();
        setImage(result.uri);
        setShowCamera(false);

        uploadImage(result.uri);
    };
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setImage(uri);

            uploadImage(uri);
        }
    };

    const openOptions = () => {
        Alert.alert("Change Photo", "Choose option", [
            { text: "Cancel", style: "cancel" },
            { text: "Gallery", onPress: pickImage },
            { text: "Camera", onPress: openCamera }

        ]);
    };


    const uploadImage = async (uri: string) => {
        try {
            const data = new FormData();

            data.append("file", {
                uri,
                type: "image/jpeg",
                name: "photo.jpg",
            } as any);

            data.append("upload_preset", "h3tqom9k");

            const res = await fetch(
                "https://api.cloudinary.com/v1_1/dlqb3dxil/image/upload",
                {
                    method: "POST",
                    body: data,
                }
            );

            const result = await res.json();

            console.log("CLOUDINARY:", result);


            const imageUrl = result.secure_url;


            await baseApi.post("/user/update-image", {
                profile_picture: imageUrl,
            });

        } catch (error) {
            console.log("UPLOAD ERROR:", error);
        }
    };

    const handlePress=()=>{
        router.back()
    }
    const { user ,setUser} = useAuth();
    const {
        control: controlProfile,
        handleSubmit: handleSubmitProfileForm
    } = useForm();
    const {
        control: controlPassword,
        handleSubmit: handleSubmitPasswordForm
    } = useForm();
    const onSubmitProfile = (data: any) => {

        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([_, value]) => value !== "")
        );

        if (Object.keys(filteredData).length === 0) return;

        updateProfileMutation.mutate(filteredData);
    };

    const updateProfileMutation = useMutation({
        mutationFn: updateProfileApi,
        onSuccess: (res) => {
            setUser(res.data);
        },
    });


    const updatePasswordMutation = useMutation({
        mutationFn: updatePasswordApi,

        onSuccess: (res) => {
            alert("Password updated successfully ");
        },

        onError: (err: any) => {
            alert(err?.response?.data?.message || "Something went wrong ");
        }
    });


    const onSubmitPassword = (data: any) => {

        if (!data.new_password) return;
        if (!data.current_password) {
            alert("Enter current password");
            return;
        }

        if (data.new_password !== data.confirm_password) {
            alert("Passwords do not match");
            return;
        }

        updatePasswordMutation.mutate({
            current_password: data.current_password,
            new_password: data.new_password,
            new_password_confirmation: data.confirm_password,
        });
    };





    return (
        <SafeAreaView style={{ flex  : 1 }}>
            <View style={styles.container}>

                {showCamera && (
                    <View style={[StyleSheet.absoluteFillObject, styles.cameraOverlay]}>
                        <CameraView ref={cameraRef} style={{ flex: 1 }}>

                            <TouchableOpacity
                                onPress={takePhoto}
                                style={styles.captureButton}
                            >
                                <View style={styles.captureInner} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setShowCamera(false)}
                                style={styles.closeButton}
                            >
                                <Ionicons name="close" size={28} color="#fff" />
                            </TouchableOpacity>

                        </CameraView>
                    </View>
                )}


                <View style={styles.header}>
                    <View style={styles.waveContainer}>

                        <Svg width="100%" height="100%" viewBox="0 0 100 25" preserveAspectRatio="none">
                            <Path
                                d="M0,19 C40,30 40,0 100,10 L100,0 L0,0 Z"
                                fill="#E55C16"
                            />
                            <Path
                                d="M0,17 C45,30 40,0 100,10"
                                stroke="#F2F2F2"
                                strokeWidth="1"
                                fill="none"
                            />


                        </Svg>
                        <View style={styles.Back}>
                            <Pressable onPress={()=> handlePress()}>
                                <Ionicons name="chevron-back" size={30} color="#E55C16"/>
                            </Pressable>
                        </View>
                        <Text style={styles.title}>user profile  </Text>
                    </View>

                </View>

                <View style={styles.content}>
                    <CardInfoDriver
                        name={user?.full_name}
                        phone={user?.phone_number}
                        rating={user?.average_rating}
                        profile_picture={image || user?.profile_picture}
                        showCarInfo={false}
                        showEditIcon={true}
                        onEditPress={openOptions}
                    />
                </View>

                <View style={styles.formCard}>
                    <Text style={styles.heading}>Edit Info</Text>
                    <View style={styles.row}>
                        <View style={{ flex: 1 }}>
                            <FormInput control={controlProfile} name="full_name" placeholder="Full Name" icon="person" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <FormInput control={controlProfile} name="email" placeholder="Email" icon="mail" />
                        </View>
                    </View>
                    <FormInput control={controlProfile} name="phone_number" placeholder="Phone" icon="call" />
                    <TouchableOpacity style={styles.button} onPress={handleSubmitProfileForm(onSubmitProfile)}>
                        <Text style={styles.buttonText}>Update Info</Text>
                    </TouchableOpacity>

                    <View style={styles.line}/>
                    <Text style={styles.heading}>Change Password</Text>

                    <FormInput
                        control={controlPassword}
                        name="current_password"
                        placeholder="Current Password"
                        secureTextEntry
                        icon="lock-closed"
                    />
                    <View style={styles.row}>
                        <View style={{ flex: 1 }}>
                            <FormInput control={controlPassword}
                                       name="new_password"
                                       placeholder="New Password"
                                       secureTextEntry
                                       icon="lock-closed" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <FormInput  control={controlPassword}
                                        name="confirm_password"
                                        placeholder="Confirm"
                                        secureTextEntry
                                        icon="lock-closed" />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleSubmitPasswordForm(onSubmitPassword)}>
                        <Text style={styles.buttonText}>Update Password</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>

    )

}
const { width, height } = Dimensions.get('window');
const styles= StyleSheet.create({

    container: {

        flex: 1,
        gap:12,
        backgroundColor: "#F2F2F2",
    },
    header: {
        flex: .85,

    },
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
    },
    title : {
        position: "absolute",
        top: "55%",
        alignSelf: "flex-end",
        fontSize: 35,
        fontWeight: "bold",
        color: "#E55C16",
    },
    waveContainer: {

        position: "absolute",
        top: 0,
        width: width,
        height: height * 0.25,

    },
    content: {
        alignItems: "center",
        gap:15,
        width: "90%",
        height:"16%",
        alignSelf: "center",
        color: "#E55C16",
        borderRadius: 20,
    },
    formCard: {

        width: "90%",
        alignSelf: "center",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },

    heading: {
        fontSize: 16,
        fontWeight: "bold",
        color:"#E55C16",
        marginBottom: 10,
    },

    button: {
        backgroundColor: "#E55C16",
        width: "45%",
        alignSelf: "flex-end",
        marginTop: 6,
        marginBottom: 8,
        padding: 12,
        borderRadius: 10,
    },

    buttonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    line: {
        width:"100%",
        height:1,
        backgroundColor:"#eee",
        marginBottom:8,
        marginTop:3,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    cameraOverlay: {
        zIndex: 999,
        elevation: 999,
        backgroundColor: "black",
    },
    captureButton: {
        position: "absolute",
        bottom: 40,
        alignSelf: "center",
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 5,
        borderColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },

    captureInner: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#E55C16",
    },
    closeButton: {
        position: "absolute",
        top: 50,
        left: 20,
        backgroundColor: "rgba(0,0,0,0.4)",
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },

});