import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const pets = await prismadb.user.findMany({
      where: {
        lost: true,
      },
    });

    return NextResponse.json({ pets }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
