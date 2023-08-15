import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/userSlice";
import postsReducer from "@/features/postsSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
  },
});
