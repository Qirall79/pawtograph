import prismadb from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { message, link, userId, type } = (await req.json()) as {
      message: string;
      link: string;
      userId: string;
      type: string;
    };

    // delete previous notification with the same infos
    await prismadb.notification.deleteMany({
      where: {
        link,
        userId,
        type,
      },
    });

    const notification = await prismadb.notification.create({
      data: {
        link,
        message,
        userId,
        type,
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

export const PUT = async (req: Request) => {
  try {
    const { id } = (await req.json()) as {
      id: string;
    };

    await prismadb.notification.updateMany({
      where: {
        userId: id,
      },
      data: {
        seen: true,
      },
    });

    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { status: "fail", message: error.message },
      { status: 500 }
    );
  }
};
