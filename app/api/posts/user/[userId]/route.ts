import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    const posts = await prismadb.post.findMany({
      where: {
        authorId: params.userId,
      },
      include: {
        author: true,
        Comments: {
          include: {
            Replies: true,
            author: true,
          },
        },
      },
    });

    return NextResponse.json({ status: "success", posts }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { status: "failure", message: error.message },
      { status: 500 }
    );
  }
};
