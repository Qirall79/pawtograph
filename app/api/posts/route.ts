import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { description, image, author } = (await req.json()) as {
      description: string;
      image?: string;
      author: string;
    };

    const post = await prismadb.post.create({
      data: {
        text: description,
        photo: image,
        authorId: author,
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
    });

    return NextResponse.json({ status: "success", posts }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
};
