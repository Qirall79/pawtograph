import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { text, authorId, commentId } = (await req.json()) as {
      text: string;
      authorId: string;
      commentId: string;
    };
    const reply = await prismadb.reply.create({
      data: {
        text,
        authorId,
        commentId,
      },
      include: {
        author: true,
      },
    });
    return NextResponse.json({ status: "success", reply }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", error: error.message },
      { status: 500 }
    );
  }
};

export const PUT = async (req: Request) => {
  try {
    const { id, likes } = (await req.json()) as { id: string; likes: string[] };
    await prismadb.reply.update({
      where: {
        id,
      },
      data: {
        likes,
      },
    });
    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", error: error.message },
      { status: 500 }
    );
  }
};
