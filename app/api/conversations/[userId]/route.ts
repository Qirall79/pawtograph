import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    const session = await getServerSession(authOptions);
    const { userId } = params;

    let conversation = await prismadb.conversation.findFirst({
      where: {
        AND: [
          {
            users: {
              some: {
                id: userId,
              },
            },
          },
          {
            users: {
              some: {
                email: session?.user?.email,
              },
            },
          },
        ],
      },
    });

    // if conversation doesn't exist, create one
    if (!conversation) {
      conversation = await prismadb.conversation.create({
        data: {
          users: {
            connect: [
              {
                id: userId,
              },
              {
                email: session?.user?.email!,
              },
            ],
          },
        },
      });
    }

    return NextResponse.json({ conversation }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  try {
    const { id } = (await req.json()) as { id: string };

    await prismadb.conversation.update({
      where: {
        id,
      },
      data: {
        seen: true,
      },
    });

    return NextResponse.json(
      { message: "Updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
