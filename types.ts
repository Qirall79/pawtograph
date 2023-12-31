import {
  Comment,
  Conversation,
  Message,
  Notification,
  Post,
  Reply,
  User,
} from "@prisma/client";

export interface IUser extends User {
  followedBy?: IUser[];
  follows?: IUser[];
  Notifications?: Notification[];
  Conversations?: Conversation[];
}
export interface IUserWithCount extends User {
  _count: { followedBy: number };
}

export interface IPost extends Post {
  author?: IUser;
  Comments?: IComment[];
}

export interface IComment extends Comment {
  author?: IUser;
  Replies?: IReply[];
}

export interface IReply extends Reply {
  author: IUser;
  comment?: IComment;
}

export interface IConversation extends Conversation {
  messages?: Message[];
  users?: IUser[];
}
