import { Post } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Post[] = [];

// todo: Async reducers, Fetch posts

// initialize the slice
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<Post>) {
      state.push(action.payload);
    },
    updatePost(state, action: PayloadAction<Post>) {
      // todo: filter posts and update the one
    },
    deletePost(state, action: PayloadAction<string>) {
      // todo: filter posts and delete the one
    },
  },
  extraReducers: {},
});

export const { addPost, updatePost, deletePost } = postsSlice.actions;

export default postsSlice.reducer;
