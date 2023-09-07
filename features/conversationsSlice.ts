import { IConversation } from "@/types";
import { Conversation, Message } from "@prisma/client";
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
    const res = await fetch("/api/conversations");
    if (!res.ok) {
      throw new Error("Something went wrong, " + res.json());
    }
    const responseData = await res.json();
    return responseData.conversations;
  }
);

export const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    updateConversation(
      state,
      action: PayloadAction<{ conversationId: string; userId: string }>
    ) {
      const conversation = state.conversations.find(
        (c) => c.id === action.payload.conversationId
      );
      if (!conversation!.seenBy.includes(action.payload.userId)) {
        conversation!.seenBy.push(action.payload.userId);
      }
    },
    addConversation(state, action: PayloadAction<Conversation>) {
      const oldConversationIndex = state.conversations.findIndex(
        (c) => c.id === action.payload.id
      );
      if (oldConversationIndex !== -1) {
        state.conversations.splice(oldConversationIndex, 1);
      }
      state.conversations.unshift(action.payload);
    },
    addMessage(state, action: PayloadAction<Message>) {
      const index = state.conversations.findIndex(
        (c) => c.id === action.payload.conversationId
      );
      state.conversations[index].messages!.push(action.payload);
      state.conversations[index]!.seenBy = [action.payload.authorId];
      state.conversations[index]!.updatedAt = new Date();
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

export const { updateConversation, addMessage, addConversation } =
  conversationsSlice.actions;

export default conversationsSlice.reducer;
