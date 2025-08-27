import axios from "axios";
import { RideRequestPayload, Ride } from "./rider.types"

const api = axios.create({
  baseURL: "/api/rides", // adjust if needed
  withCredentials: true, // for JWT cookies if used
});

export const requestRide = async (data: RideRequestPayload) => {
  const res = await api.post<Ride>("/request", data);
  return res.data;
};

export const getRideHistory = async () => {
  const res = await api.get<Ride[]>("/me");
  return res.data;
};

export const cancelRide = async (id: string) => {
  const res = await api.patch<Ride>(`/${id}/cancel`);
  return res.data;
};
