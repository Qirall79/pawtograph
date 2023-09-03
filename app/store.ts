import { AnyAction, ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import userReducer, { IState } from "@/features/userSlice";
import postsReducer from "@/features/postsSlice";
import conversationsReducer from "@/features/conversationsSlice";
import { Conversation, Post } from "@prisma/client";

export default configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    conversations: conversationsReducer,
  },
});

export type AppThunkDispatch = ThunkDispatch<
  { user: IState; posts: Post[]; conversations: Conversation[] },
  any,
  AnyAction
>;
