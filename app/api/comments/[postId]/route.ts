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
