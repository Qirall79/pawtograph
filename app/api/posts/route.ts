import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { text, photo, authorId } = (await req.json()) as {
      text: string;
      photo?: string;
      authorId: string;
    };

    const post = await prismadb.post.create({
      data: {
        text,
        photo,
        authorId,
      },
      include: {
        author: true,
        Comments: true,
      },
    });
    return NextResponse.json({ status: "success", post }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
};

export const PUT = async (req: Request) => {
  try {
    const { text, id, likes } = (await req.json()) as {
      text: string;
      id: string;
      likes: string[];
    };

    const post = await prismadb.post.update({
      where: { id },
      data: {
        text,
        likes,
      },
    });
    return NextResponse.json({ status: "success", post }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: Request) => {
  try {
    const { postId } = (await req.json()) as {
      postId: string;
    };

    await prismadb.post.delete({
      where: { id: postId },
    });
    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      throw new Error("Unauthorized");
    }

    const currentUser = await prismadb.user.findFirst({
      where: {
        email: session.user.email,
      },
      include: {
        posts: true,
        follows: true,
      },
    });

    const followsIds = currentUser!.follows.map((follow) => follow.id);

    const posts = await prismadb.post.findMany({
      where: {
        authorId: { in: [...followsIds, currentUser!.id] },
      },
      include: {
        author: true,
        Comments: {
          include: {
            Replies: true,
            author: true,
          },
        },
      },
    });

    return NextResponse.json({ status: "success", posts }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
};
