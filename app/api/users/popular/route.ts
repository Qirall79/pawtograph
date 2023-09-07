import prismadb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const users = await prismadb.user.findMany({
      orderBy: {
        followedBy: {
          _count: "desc",
        },
      },
      include: {
        followedBy: {
          select: {
            id: true,
          },
        },
      },
      take: 3,
    });
    revalidatePath(req.url);
    return NextResponse.json({ status: "success", users }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { status: "failure", message: error.message },
      { status: 500 }
    );
  }
};
