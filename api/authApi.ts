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


export const getMeApi = () => {
    return baseApi.get("/me");
};


export const logoutApi = () => {
    return baseApi.post("/logout");
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
