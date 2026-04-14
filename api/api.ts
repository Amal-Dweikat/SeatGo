import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.103:8000/api",
});

export const searchTrips = async (params: {
  from_city?: string;
  to_city?: string;
  time?: string;
  passengers?: number | null;
  sort?: string | null;
  price?: string | null;
}) => {
  const res = await api.get("/search", { params });
  return res.data;
};
