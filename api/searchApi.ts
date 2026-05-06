import axios from "axios";
import baseApi from "@/api/baseApi";

const api = axios.create({
  baseURL: "http://192.168.1.79:8000/api",
});

export const searchTrips = async (params: {
  FromCity?: string;
  ToCity?: string;
  DepartureTime?: string;
}) => {
  const res = await baseApi.get("/search", {
    params: {
      ...params,
    },
  });

  return res.data;
};
