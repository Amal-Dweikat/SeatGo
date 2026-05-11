import * as Notifications from "expo-notifications";

export async function requestNotificationPermission() {

    const { status } =
        await Notifications.requestPermissionsAsync();

    return status === "granted";
}

export async function scheduleLocalNotification() {

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "SeatGo 🚗",
            body: "Your trip starts soon",
            sound: true,
        },

        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: 5,
        } as any,
    });
}

export async function scheduleTripReminder(date: string, time: string) {
    const tripDateTime = new Date(Date.parse(`${date}T${time}`));
    const reminderDate = new Date(
        tripDateTime.getTime() - 60 * 60 * 1000
    );

    if (reminderDate <= new Date()) {

        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Trip Reminder ⏰",
                body: "Your trip is soon",
            },
            trigger: null,
        });
        return;
    }

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Trip Reminder ⏰",
            body: "Your trip starts in 1 hour",
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: reminderDate,
        },

    });
}


export function generateRepeatedDates(
    startDate: string,
    endDate: string,
    selectedDays: string[]
) {

    const dates: string[] = [];

    const current = new Date(startDate);

    const end = new Date(endDate);

    while (current <= end) {

        const dayName = current
            .toLocaleDateString("en-US", {
                weekday: "short"
            });

        if (selectedDays.includes(dayName)) {

            dates.push(
                current.toISOString().split("T")[0]
            );
        }

        current.setDate(current.getDate() + 1);
    }

    return dates;
}