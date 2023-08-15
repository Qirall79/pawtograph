import { User } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: User | {} = {};

// todo: Async reducers, Fetch user

// initialize slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<User>) {
      // todo: update user
    },
  },
  extraReducers: {},
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
