import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./auth.types";

// ---- Utility functions for localStorage ----
const saveAuthToLocalStorage = (state: AuthState) => {
  try {
    localStorage.setItem("auth", JSON.stringify(state));
  } catch (err) {
    console.error("Could not save auth state", err);
  }
};

const loadAuthFromLocalStorage = (): AuthState | null => {
  try {
    const serializedState = localStorage.getItem("auth");
    if (!serializedState) return null;
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load auth state", err);
    return null;
  }
};

const removeAuthFromLocalStorage = () => {
  try {
    localStorage.removeItem("auth");
  } catch (err) {
    console.error("Could not remove auth state", err);
  }
};

// ---- Auth state ----
export interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = loadAuthFromLocalStorage() || {
  user: null,
  token: null,
};

// ---- Slice ----
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      saveAuthToLocalStorage(state); // save to localStorage
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      removeAuthFromLocalStorage(); // remove from localStorage
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        saveAuthToLocalStorage(state); // update localStorage
      }
    },
  },
});

// ---- Exports ----
export const { setCredentials, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;

// ---- Selectors for easy access ----
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
