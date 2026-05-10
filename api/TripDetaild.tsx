
import baseApi from "./baseApi";
export type BookingData =
    { NumSeat: number;
        WantRepeat:boolean;
        SelectedDays?:string[];
        dateOfEndRepeat?: string | null;
        Trip_id?:number}
export const BookingApi = (data : BookingData) => {
    return baseApi.post("/booking", data);
};
export const myBooking = () => {
    return baseApi.get("/myBooking");
};

export const returnTripInfo = (id: number) => {
    return baseApi.get(`/trip/${id}`);
};
export const scheduleTrip = (data: any) => {
    return baseApi.post("/schedule-trip", data);
};
export const GetTrip = () => {
    return baseApi.get("/getTripUser");
};

