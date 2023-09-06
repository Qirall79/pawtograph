import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const users = await prismadb.user.findMany({
      orderBy: {
        followedBy: {
          _count: "desc",
        },
      },
      include: {
        _count: {
          select: {
            followedBy: true,
          },
        },
      },
      take: 3,
    });

    return NextResponse.json({ status: "success", users }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { status: "failure", message: error.message },
      { status: 500 }
    );
  }
};
