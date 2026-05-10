import { Alert } from "react-native";

export function formatDateInput(text: string,dateTrip :string) {

    const today = new Date().toISOString().split("T")[0];
    const cleaned = text.replace(/\D/g, "");

    let formatted = cleaned;

    if (cleaned.length > 4) {
        formatted = cleaned.slice(0, 4) + "-" + cleaned.slice(4);
    }

    if (cleaned.length > 6) {
        formatted =
            cleaned.slice(0, 4) +
            "-" +
            cleaned.slice(4, 6) +
            "-" +
            cleaned.slice(6, 8);
    }
    if (formatted.length === 10) {

        if (
            formatted < today ||
            formatted < dateTrip
        ) {

            Alert.alert(
                "Invalid Date",
                "Enter valid repeat date"
            );

            return null;
        }
    }

    return formatted;
}