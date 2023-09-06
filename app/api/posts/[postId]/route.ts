import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { postId: string } }
) => {
  try {
    const post = await prismadb.post.findFirst({
      where: {
        id: params.postId,
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

    return NextResponse.json({ status: "success", post }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { status: "failure", message: error.message },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { postId: string } }
) => {
  try {
    const { postId } = params;
    await prismadb.post.delete({
      where: {
        id: postId,
      },
    });

    await prismadb.notification.deleteMany({
      where: {
        link: {
          endsWith: postId,
        },
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
