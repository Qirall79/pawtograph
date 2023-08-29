import { User } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface IState {
  user: User | {};
  status: "idle" | "loading" | "fulfilled" | "failed";
  error: string | undefined;
}

const initialState: IState = { user: {}, status: "idle", error: undefined };

// todo: Async reducers, Fetch user
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await axios.get("/api/users/current");
  return response.data.user;
});

// initialize slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.user = action.payload;
      });
  },
});

export const getUser = (state: any) => state.user.user;
export const getUserStatus = (state: any) => state.user.status;
export const getUserError = (state: any) => state.user.error;

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
