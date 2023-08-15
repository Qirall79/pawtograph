import { Post } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Post[] = [];

// todo: Async reducers, Fetch user

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default postsSlice.reducer;
