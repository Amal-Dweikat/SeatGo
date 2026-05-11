import baseApi from "./baseApi";



export const searchTrips = async (params: {
  FromCity?: string;
  ToCity?: string;
  DepartureTime?: string;
  BookedSeats?: number | null;
  sort?: string | null;
  Price?: string | null;
}) => {
  const res = await baseApi.get("/search", { params });
  return res.data;
};
