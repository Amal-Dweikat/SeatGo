import { TextInput, StyleSheet, Text, View } from "react-native";
import { Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    control: any;
    name: string;
    placeholder: string;
    secureTextEntry?: boolean;
    keyboardType?: any;
    icon?: string;
};

export default function FormInput({
                                      control,
                                      name,
                                      placeholder,
                                      secureTextEntry,
                                      keyboardType,
                                      icon,
                                  }: Props) {
    return (
        <Controller
            control={control}
            name={name}
            // rules={{ required: `${placeholder} is required` }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <View style={{ marginBottom: 15 }}>


                    <View style={styles.inputContainer}>
                        {icon && (
                            <Ionicons
                                name={icon as any}
                                size={20}
                                color="#E55C16"
                                style={styles.icon}
                            />
                        )}

                        <TextInput
                            style={styles.input}
                            placeholder={placeholder}
                            value={value ?? ""}
                            onChangeText={onChange}
                            secureTextEntry={secureTextEntry}
                            keyboardType={keyboardType}
                        />
                    </View>


                    {error && <Text style={styles.error}>{error.message}</Text>}
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e8e4e1",
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: "#fffbf7",
    },

    icon: {
        marginRight: 8,
    },

    input: {
       flex: 1,
        paddingVertical: 12,

    },

    error: {
        color: "red",
        fontSize: 12,
        marginTop: 5,
    },
});


