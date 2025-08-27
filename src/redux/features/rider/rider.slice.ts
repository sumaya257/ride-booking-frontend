import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as rideAPI from "./ride.api";
import type { Ride, RideRequestPayload } from "./rider.types";

interface RiderState {
  rides: Ride[];
  loading: boolean;
  error: string | null;
}

const initialState: RiderState = {
  rides: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchRideHistory = createAsyncThunk("rider/fetchRideHistory", async () => {
  return await rideAPI.getRideHistory();
});

export const createRide = createAsyncThunk(
  "rider/createRide",
  async (payload: RideRequestPayload) => {
    return await rideAPI.requestRide(payload);
  }
);

export const cancelExistingRide = createAsyncThunk(
  "rider/cancelRide",
  async (id: string) => {
    return await rideAPI.cancelRide(id);
  }
);

export const riderSlice = createSlice({
  name: "rider",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRideHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRideHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.rides = action.payload;
      })
      .addCase(fetchRideHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch rides";
      })
      .addCase(createRide.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRide.fulfilled, (state, action) => {
        state.loading = false;
        state.rides.unshift(action.payload); // Add new ride at top
      })
      .addCase(createRide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to request ride";
      })
      .addCase(cancelExistingRide.fulfilled, (state, action) => {
        const index = state.rides.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) state.rides[index] = action.payload;
      });
  },
});

export default riderSlice.reducer;
