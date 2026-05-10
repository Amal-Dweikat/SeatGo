import {useEffect, useRef} from "react";
import {showLocalNotification} from "@/services/notification";
import {getNotification, notificationRead} from "@/api/notification";

export  default function useNotifications() {
    const loaded = useRef(false);
    useEffect(() => {
        if (loaded.current) return;

        loaded.current = true;
        async function loadNotifications() {

            try {

                const res = await getNotification();

                const notifications = res.data.notification;

                for (const item of notifications) {
                    await showLocalNotification(
                        item.title,
                        item.body
                    );
                    await notificationRead(item.id);


                }

            } catch (e) {

                console.log(e);
            }
        }

        loadNotifications();

    }, []);
}