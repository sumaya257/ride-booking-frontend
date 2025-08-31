// ride.api.ts
import type { Ride, RideRequestPayload } from "./rider.types";
import axiosInstance from "@/lib/axiosInstance";

const basePath = "/rides";

// Request a ride
export const requestRide = async (data: RideRequestPayload): Promise<{ message: string; ride: Ride }> => {
  const res = await axiosInstance.post<{ message: string; ride: Ride }>(`${basePath}/request`, data);
  return res.data; // TS now knows response has 'ride'
};

// Get ride history
export const getRideHistory = async (): Promise<{ rides: Ride[] }> => {
  const res = await axiosInstance.get<{ rides: Ride[] }>(`${basePath}/me`);
  return res.data; // TS now knows response has 'rides'
};

// Cancel ride
export const cancelRide = async (id: string): Promise<Ride> => {
  const res = await axiosInstance.patch<Ride>(`${basePath}/${id}/cancel`);
  return res.data;
};
