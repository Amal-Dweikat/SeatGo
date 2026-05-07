import baseApi from "./baseApi";


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