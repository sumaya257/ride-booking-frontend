// rider.slice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
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

// Fetch ride history
export const fetchRideHistory = createAsyncThunk(
  "rider/fetchRideHistory",
  async () => {
    const response = await rideAPI.getRideHistory();
    return response.rides; // extract rides array
  }
);

// Create a new ride
export const createRide = createAsyncThunk<
  Ride,                  // return type on success
  RideRequestPayload,     // argument type
  { rejectValue: string } // type of custom rejection
>(
  "rider/createRide",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await rideAPI.requestRide(payload);
      return response.ride;
    } catch (err: any) {
      // return API error message as rejected value
      return rejectWithValue(err.response?.data?.message || "Request failed");
    }
  }
);

// Cancel existing ride
export const cancelExistingRide = createAsyncThunk<
  Ride,                  // return type on success
  string,                // argument type (ride id)
  { rejectValue: string } // type of custom rejection
>(
  "rider/cancelRide",
  async (id, { rejectWithValue }) => {
    try {
      const response = await rideAPI.cancelRide(id);
      return response; // return Ride object
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Cancel request failed");
    }
  }
);


export const riderSlice = createSlice({
  name: "rider",
  initialState,
  reducers: {
    clearRides: (state) => {
      state.rides = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Ride History
      .addCase(fetchRideHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRideHistory.fulfilled, (state, action: PayloadAction<Ride[]>) => {
        state.loading = false;
        state.rides = action.payload;
      })
      .addCase(fetchRideHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch rides";
      })

      // Create Ride
      .addCase(createRide.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRide.fulfilled, (state, action: PayloadAction<Ride>) => {
        state.loading = false;
        state.rides.unshift(action.payload); // add new ride to top
      })
      .addCase(createRide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to create ride";
      })

      // Cancel Ride
      .addCase(cancelExistingRide.fulfilled, (state, action: PayloadAction<Ride>) => {
        const index = state.rides.findIndex((r) => r._id === action.payload._id); // match by _id
        if (index !== -1) state.rides[index] = action.payload;
      });
  },
});

export const { clearRides } = riderSlice.actions;
export default riderSlice.reducer;

// Selectors
export const selectRides = (state: { rider: RiderState }) => state.rider.rides;
export const selectRidesLoading = (state: { rider: RiderState }) => state.rider.loading;
export const selectRidesError = (state: { rider: RiderState }) => state.rider.error;
