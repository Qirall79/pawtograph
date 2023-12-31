import { Post } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

interface IState {
  posts: Post[];
  status: "idle" | "loading" | "fulfilled" | "failed";
  error: string | undefined;
}

const initialState: IState = {
  posts: [],
  status: "idle",
  error: undefined,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (userId?: string) => {
    const res = await fetch("/api/posts" + (userId ? `/user/${userId}` : ""));
    const responseData = await res.json();
    if (!res.ok) {
      throw new Error("Something went wrong, " + responseData);
    }
    return responseData.posts;
  }
);

export const fetchPost = createAsyncThunk(
  "posts/fetchPost",
  async (postId?: string) => {
    const res = await fetch("/api/posts/" + postId);
    if (!res.ok) {
      throw new Error("Something went wrong, " + res.json());
    }
    const responseData = await res.json();
    return responseData.post;
  }
);

// initialize the slice
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<Post>) {
      state.posts.unshift(action.payload);
    },
    updatePost(state, action: PayloadAction<Post>) {
      const index = state.posts.findIndex((p) => p.id === action.payload.id);
      state.posts[index] = action.payload;
    },
    deletePost(state, action: PayloadAction<string>) {
      const index = state.posts.findIndex((p) => p.id === action.payload);
      state.posts.splice(index, 1);
    },
    resetStatus(state) {
      state.status = "idle";
      state.error = "";
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        const sortedPosts = action.payload.sort((a, b) => {
          return (
            (new Date(b.createdAt) as any) - (new Date(a.createdAt) as any)
          );
        });
        state.posts = sortedPosts;
        state.status = "fulfilled";
      })
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(JSON.stringify(action.error.message));
      });

    // single post fetching
    builder
      .addCase(fetchPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.posts = [{ ...action.payload }];
        state.status = "fulfilled";
      })
      .addCase(fetchPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(JSON.stringify(action.error.message));
      });
  },
});

export const getPosts = (state: any) => state.posts.posts;
export const getPostsStatus = (state: any) => state.posts.status;
export const getPostsError = (state: any) => state.posts.error;

export const { addPost, updatePost, deletePost, resetStatus } =
  postsSlice.actions;

export default postsSlice.reducer;
