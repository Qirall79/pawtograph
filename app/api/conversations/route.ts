import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);
    const conversations = await prismadb.conversation.findMany({
      where: {
        users: {
          some: {
            email: session?.user?.email,
          },
        },
      },
      include: {
        users: {
          select: {
            name: true,
            image: true,
            id: true,
          },
        },
        messages: true,
      },
    });
    return NextResponse.json({ conversations }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
