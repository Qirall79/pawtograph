import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request) => {
  try {
    const { id } = (await req.json()) as { id: string };
    await prismadb.reply.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", error: error.message },
      { status: 500 }
    );
  }
};
