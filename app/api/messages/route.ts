import prismadb from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { conversationId, body, authorId } = (await req.json()) as {
      conversationId: string;
      body: string;
      authorId: string;
    };

    const message = await prismadb.message.create({
      data: {
        authorId,
        conversationId,
        body,
      },
    });

    const conversation = await prismadb.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        seen: false,
        updatedAt: new Date(),
      },
      include: {
        users: true,
        messages: true,
      },
    });

    await pusherServer.trigger(conversationId, "message:new", message);
    conversation.users.forEach(async (user) => {
      await pusherServer.trigger(user.id, "conversations", conversation);
    });

    return NextResponse.json({ message }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
