import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

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

    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", error: error.message },
      { status: 500 }
    );
  }
};
