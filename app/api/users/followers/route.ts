import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      throw new Error("Unauthorized");
    }
    const user = await prismadb.user.findFirst({
      where: {
        email: session.user.email,
      },
      include: {
        followedBy: {
          select: {
            id: true,
            image: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(
      { status: "success", followers: user?.followedBy },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: "failure", message: error.message },
      { status: 500 }
    );
  }
};

export const PUT = async (req: Request) => {
  try {
    const session = await getServerSession();
    const { id, action } = (await req.json()) as {
      id: string;
      action: "follow" | "unfollow";
    };

    if (!session?.user?.email) {
      throw new Error("Unauthorized");
    }

    if (action === "follow") {
      const user = await prismadb.user.update({
        where: {
          email: session.user.email,
        },
        data: {
          followedBy: {
            connect: {
              id,
            },
          },
        },
        include: {
          follows: true,
        },
      });

      return NextResponse.json({ status: "success", user }, { status: 200 });
    }

    const user = await prismadb.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        followedBy: {
          disconnect: {
            id,
          },
        },
      },
      include: {
        follows: true,
      },
    });

    return NextResponse.json({ status: "success", user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { status: "failure", message: error.message },
      { status: 500 }
    );
  }
};
