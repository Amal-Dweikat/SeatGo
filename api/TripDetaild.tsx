
import baseApi from "./baseApi";
export type BookingData =
    { NumSeat: number;
        WantRepeat:boolean;
        SelectedDays?:string[];
        dateOfEndRepeat?: string | null;}
export const BookingApi = (data : BookingData) => {
    return baseApi.post("/booking", data);
};

export const returnTripInfo = (id: number) => {
    return baseApi.get(`/trip/${id}`);
};