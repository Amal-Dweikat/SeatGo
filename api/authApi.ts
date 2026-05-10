import baseApi from "./baseApi";
import api from "./TripDetails";


export const loginApi = (data: {
    email: string;
    password: string;
}) => {
    return baseApi.post("/login", data);
};


export const registerApi = (data: {
    full_name: string;
    email: string;
    password: string;
    phone_number: string;
}) => {
    return baseApi.post("/register", data);
};

export const updateProfileApi = (data: any) => {
    return baseApi.put("/user/update", data);
};

export const updatePasswordApi = (data: any) => {
    return baseApi.put("/user/update-password", data);
};

export const getFinishedTrip = async () => {
    const res = await baseApi.get("/finished-trip");
    return res.data;
};

export const getFavoriteDriversApi = () => {
  return baseApi.get("/favorite-drivers");
};

export const removeFavoriteDriverApi = (driverId: number) => {
  return baseApi.delete(`/favorite-drivers/${driverId}`);
};

export const forgotPasswordApi = (data: { email: string }) => {
  return api.post("/forgot-password", data);
};
export const verifyCodeApi = (data: { email: string; code: string }) => {
    return api.post("/verify-code", data);
};

export const resetPasswordApi = (data: {
    email: string;
    code: string;
    password: string;
}) => {
    return api.post("/reset-password", data);
};
