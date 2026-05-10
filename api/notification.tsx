import baseApi from "@/api/baseApi";

export const bookingStatus = (id :number,status:string) => {
    return baseApi.put(`/booking/${id}/status`, {
        status: status
    });
};
export const notificationFavorite = () => {
    return baseApi.post("/notificationFavorite");
};
export const getNotification = () => {
    return baseApi.get("/notification");
};
export const notificationRead = (id :number) => {
    return baseApi.put(`/notification/${id}`);
};