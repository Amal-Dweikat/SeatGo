import {createContext, useContext, useEffect, useState} from "react";
import baseApi from "@/api/baseApi";
import * as SecureStore from "expo-secure-store";
import { setLogoutHandler } from "@/api/baseApi";

type UserType = {
    id: number;
    full_name: string;
    email: string;
    phone_number: string;
    role: string;
    average_rating?: number;
    profile_picture?: string;
};



type AuthContextType = {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
    loading: boolean;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},
    loading: true,
    logout: async () => {},

});

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);


    const logout = async () => {
        try {
            await baseApi.post("/logout");
        } catch (e) {
            console.log("Logout API failed");
        }

        await SecureStore.deleteItemAsync("token");
        setUser(null);
    };

    useEffect(() => {
        const loadUser = async () => {
            try {
                const token = await SecureStore.getItemAsync("token");

                if (!token) {
                    setUser(null);
                    return;
                }
                const res = await baseApi.get("/me");

                setUser(res.data);

            } catch (error: any) {

                await SecureStore.deleteItemAsync("token");

                setUser(null);

            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);


    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);