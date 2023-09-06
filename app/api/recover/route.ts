import { sendMail } from "@/lib/mailService";
import prismadb from "@/lib/prismadb";
import { hashSync } from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { email } = (await req.json()) as { email: string };
    const user = await prismadb.user.findFirst({
      where: {
        email: email.trim().toLowerCase(),
      },
    });

    if (user?.email) {
      await sendMail(
        "Password Recovery",
        user.email,
        `Password Recovery link:\nhttps://pawtograph.vercel.app/recover/${
          user.id
        }/${user.password?.replaceAll(/[^a-zA-Z0-9 ]/g, "")}`
      );
    }
    return NextResponse.json({ message: "Sent" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  try {
    const { id, newPassword, hash } = (await req.json()) as {
      id: string;
      newPassword: string;
      hash: string;
    };

    // If they're trying to change the Visitor user's password, don't do it
    if (id === "e4664268-a176-400b-b31a-7b9944059465") {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const user = await prismadb.user.findFirst({
      where: {
        id,
      },
    });

    if (user?.password?.replaceAll(/[^a-zA-Z0-9 ]/g, "") !== hash) {
      return NextResponse.json({ status: 404 });
    }

    const hashedPassword = hashSync(newPassword, 12);
    const newUser = await prismadb.user.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json({ newUser }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
