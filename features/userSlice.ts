import { IUser } from "@/types";
import { Notification, User } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IState {
  user: IUser | null;
  status: "idle" | "loading" | "fulfilled" | "failed";
  error: string | undefined;
}

const initialState: IState = { user: null, status: "idle", error: undefined };

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const res = await fetch("/api/users/current");
  const responseData = await res.json();
  if (!res.ok) {
    console.log(responseData);
    throw new Error("Something went wrong, " + responseData);
  }
  return responseData.user;
});

// initialize slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    addNotification(state, action: PayloadAction<Notification>) {
      state.user!.Notifications = state.user!.Notifications!.filter(
        (n) => n.type !== "like" || n.link !== action.payload.link
      );
      state.user?.Notifications?.unshift(action.payload);
    },
    updateNotification(state, action) {
      state.user?.Notifications?.forEach((n) => (n.seen = true));
    },
    deleteNotification(state, action) {
      state.user!.Notifications! = state.user!.Notifications!.filter(
        (n) => !n.link.includes(action.payload)
      );
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

export const {
  updateUser,
  addNotification,
  updateNotification,
  deleteNotification,
} = userSlice.actions;

export default userSlice.reducer;
