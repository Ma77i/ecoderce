import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signUp } from "./authService";

export const AuthEmptyState = null;

// Register user
export const register = createAsyncThunk("auth/signUp", async (userData, thunkAPI) => {
  try {
    return await signUp(userData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState: AuthEmptyState,
  reducers: {
    modifyAuth: (state, action) => ({ ...state, ...action.payload }),
    resetAuth: () => AuthEmptyState
  },
  extraReducers: () => {}
});

export const { resetAuth, modifyAuth } = authSlice.actions;

export default authSlice.reducer;
