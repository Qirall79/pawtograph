import prismadb from "@/lib/prismadb";
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

    await prismadb.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        seen: false,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ message }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
