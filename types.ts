import { Comment, Post, Reply, User } from "@prisma/client";

export interface IUser extends User {
  followedBy?: IUser[];
  follows?: IUser[];
}
export interface IUserWithCount extends User {
  followedBy?: { _count: number };
  follows?: { _count: number };
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
