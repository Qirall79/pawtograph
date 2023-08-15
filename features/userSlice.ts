import { User } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

const initialState: User | {} = {};

// todo: Async reducers, Fetch user

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default userSlice.reducer;
