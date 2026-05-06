import axios from "axios";
import * as SecureStore from "expo-secure-store";


let logoutHandler: (() => void) | null = null;

export const setLogoutHandler = (fn: () => void) => {
    logoutHandler = fn;
};

const baseApi = axios.create({


    baseURL: "http://192.168.1.27:8000/api",
    // baseURL: "http://192.168.1.79:8000/api",

    headers: {
        "Content-Type": "application/json",


    },
});


baseApi.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);


baseApi.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const status = error.response?.status;


        if (status === 401) {
            console.log("Unauthorized - Token expired");

            await SecureStore.deleteItemAsync("token");

            if (logoutHandler) {
                logoutHandler();
            }
        }


        if (status === 422) {
            console.log("Validation Error:", error.response.data);
        }


        if (status === 500) {
            console.log("Server Error");
        }

        return Promise.reject(error);
    }
);

export default baseApi;