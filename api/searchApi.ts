import axios from "axios";

const api = axios.create({
  baseURL: "http://10.111.222.32:8000/api",
});

export const searchTrips = async (params: {
  FromCity?: string;
  ToCity?: string;
  DepartureTime?: string;
}) => {
  const res = await api.get("/search", {
    params: {
      ...params,
    },
  });

  return res.data;
};
