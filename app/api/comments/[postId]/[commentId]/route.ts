import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: { commentId: string } }
) => {
  try {
    const { commentId } = params;

    await prismadb.comment.delete({
      where: {
        id: commentId,
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
