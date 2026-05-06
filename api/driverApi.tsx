import baseApi from "./baseApi";

export const createDriverApi = (data: {
    license_number: string;
    type: string;
    plate_number: string;
    color: string;
    seats: string;
}) => {
    return baseApi.post("/driver", data);
};

export const getDriverStats = async () => {
    const res = await baseApi.get("/driver/stats");
    return res.data;
};

export const getCurrentTrip = async () => {
    const res = await baseApi.get("/driver/current-trip");
    return res.data;
};

export const startTripApi = async (tripId: number) => {
    return baseApi.post(`/driver/trip/${tripId}/start`);
};

export const endTripApi = async (tripId: number) => {
    return baseApi.post(`/driver/trip/${tripId}/end`);
};