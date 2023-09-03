import { IConversation } from "@/types";
import { Message } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

interface IState {
  conversations: IConversation[];
  status: "idle" | "loading" | "fulfilled" | "failed";
  error: string | undefined;
}

const initialState: IState = {
  conversations: [],
  status: "idle",
  error: undefined,
};

// get all user conversations
export const fetchConversations = createAsyncThunk(
  "conversations/fetch",
  async () => {
    const res = await axios.get("/api/conversations");
    return res.data.conversations;
  }
);

export const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    updateConversation(state, action: PayloadAction<string>) {
      const conversation = state.conversations.find(
        (c) => c.id === action.payload
      );
      conversation!.seen = true;
    },
    addMessage(state, action: PayloadAction<Message>) {
      const conversation = state.conversations.find(
        (c) => c.id === action.payload.conversationId
      );
      conversation?.messages?.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchConversations.fulfilled,
        (state, action: PayloadAction<IConversation[]>) => {
          const sortedConversations = action.payload.sort((a, b) => {
            return (
              (new Date(b.updatedAt) as any) - (new Date(a.updatedAt) as any)
            );
          });
          state.conversations = sortedConversations;
          state.status = "fulfilled";
        }
      )
      .addCase(fetchConversations.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(JSON.stringify(action.error.message));
      });
  },
});

export const getConversations = (state: any) =>
  state.conversations.conversations;
export const getConversationsStatus = (state: any) =>
  state.conversations.status;
export const getConversationsError = (state: any) => state.conversations.error;

export const { updateConversation, addMessage } = conversationsSlice.actions;

export default conversationsSlice.reducer;
