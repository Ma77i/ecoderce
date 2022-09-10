import { createSlice } from "@reduxjs/toolkit";

export const UserEmptyState = {
  message: "",
  user: {}
};

export const userSlice = createSlice({
  name: "user",
  initialState: UserEmptyState,
  reducers: {
    createUser: (state, action) => action.payload,
    modifyUser: (state, action) => ({ ...state, ...action.payload }),
    resetUsers: () => UserEmptyState,
  },
});

export const { createUser, showUsers, modifyUser, resetUsers } = userSlice.actions;

export default userSlice.reducer;
