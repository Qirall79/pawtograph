import prismadb from "@/lib/prismadb";
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
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
