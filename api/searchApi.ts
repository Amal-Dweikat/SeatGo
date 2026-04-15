import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.45:8000/api",
});

export const searchTrips = async (params: {
  FromCity?: string;
  ToCity?: string;
  DepartureTime?: string;
  BookedSeats?: number | null;
  sort?: string | null;
  Price?: string | null;
}) => {
  const res = await api.get("/search", { params });
  return res.data;
};
