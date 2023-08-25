import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      throw new Error("Unauthorized");
    }

    const users = await prismadb.user.findMany({
      where: {
        followedBy: {
          none: {
            email: session.user.email,
          },
        },
      },
      take: 5,
    });

    return NextResponse.json({ status: "success", users }, { status: 500 });
  } catch (error: any) {
    return NextResponse.json(
      { status: "failure", message: error.message },
      { status: 500 }
    );
  }
};
