import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    const user = await prismadb.user.findFirst({
      where: {
        id,
      },
      include: {
        follows: true,
        followedBy: true,
      },
    });

    if (!user?.id) {
      return NextResponse.json(
        { status: "failure", message: "User id doesn't exist" },
        { status: 500 }
      );
    }

    return NextResponse.json({ status: "success", user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { status: "failure", message: error.message },
      { status: 500 }
    );
  }
};
