import prismadb from "@/lib/prismadb";
import { pusherClient, pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { message, link, userId } = (await req.json()) as {
      message: string;
      link: string;
      userId: string;
    };

    const notification = await prismadb.notification.create({
      data: {
        link,
        message,
        userId,
      },
    });
    await pusherServer.trigger(userId, "notification", notification);
    return NextResponse.json(
      { status: "success", notification },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: "fail", message: error.message },
      { status: 500 }
    );
  }
};
