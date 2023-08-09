import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { hashSync } from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password, image } = (await req.json()) as {
      name: string;
      email: string;
      password: string;
      image: string;
    };

    if (!name || !email || !password || !image) {
      throw new Error("Missing body data");
    }

    const existingUser = await prismadb.user.findUnique({
      where: {
        email: email.trim().toLowerCase(),
      },
    });

    if (existingUser) {
      throw new Error("User email already exists");
    }

    const hashedPassword = hashSync(password, 12);

    // create user
    const user = await prismadb.user.create({
      data: {
        email: email.trim().toLowerCase(),
        name,
        password: hashedPassword,
        image,
      },
    });

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
        image: user.image,
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
    console.log(error);
  }
}
