import prismadb from "@/lib/prismadb";
import { hashSync } from "bcryptjs";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      throw new Error("Unauthenticated user");
    }
    const user = await prismadb.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        follows: true,
        followedBy: true,
        posts: true,
        Notifications: true,
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, name, email, image, password, lost, forAdoption } =
      (await req.json()) as {
        id: string;
        image: string;
        name: string;
        email: string;
        password: string;
        lost: boolean;
        forAdoption: boolean;
      };

    if (!name || !email || !image) {
      throw new Error("Missing body data");
    }

    const existingUser = await prismadb.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser && existingUser.id !== id) {
      throw new Error("Email already exists");
    }

    // check if password exists and needs to be changed
    if (password) {
      const hashedPassword = hashSync(password, 12);

      const user = await prismadb.user.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          image,
          password: hashedPassword,
          lost,
          forAdoption,
        },
        include: {
          follows: true,
          followedBy: true,
          posts: true,
          Notifications: true,
        },
      });
      return NextResponse.json({ user }, { status: 200 });
    }

    const user = await prismadb.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        image,
        lost,
        forAdoption,
      },
      include: {
        follows: true,
        followedBy: true,
        posts: true,
        Notifications: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return NextResponse.json({ user }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
