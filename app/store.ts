import { AnyAction, ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import userReducer, { IState } from "@/features/userSlice";
import postsReducer from "@/features/postsSlice";
import { Post } from "@prisma/client";

export default configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
  },
});

export type AppThunkDispatch = ThunkDispatch<
  { user: IState; posts: Post[] },
  any,
  AnyAction
>;
