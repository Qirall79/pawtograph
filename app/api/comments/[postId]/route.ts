import prismadb from "@/lib/prismadb";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { postId: string } }
) => {
  try {
    const { postId } = params;
    const comments = await prismadb.comment.findMany({
      where: {
        postId,
      },
      include: {
        author: true,
        Replies: {
          include: {
            author: true,
          },
        },
      },
    });

    return NextResponse.json({ status: "success", comments }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", error: error.message },
      { status: 500 }
    );
  }
};

export const POST = async (
  req: Request,
  { params }: { params: { postId: string } }
) => {
  try {
    const { postId } = params;
    const { text, authorId } = (await req.json()) as {
      text: string;
      authorId: string;
    };
    const comment = await prismadb.comment.create({
      data: {
        text,
        authorId,
        postId,
      },
      include: {
        author: true,
        Replies: {
          include: {
            author: true,
          },
        },
      },
    });

    return NextResponse.json({ status: "success", comment }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", error: error.message },
      { status: 500 }
    );
  }
};

export const PUT = async (req: Request) => {
  try {
    const { text, likes, id } = (await req.json()) as {
      text: string;
      likes: string[];
      replyId: string;
      id: string;
    };
    const comment = await prismadb.comment.update({
      where: {
        id,
      },
      data: {
        text,
        likes,
      },
    });

    return NextResponse.json({ status: "success", comment }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", error: error.message },
      { status: 500 }
    );
  }
};
