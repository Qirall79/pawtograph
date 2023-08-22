import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { postId: string } }
) => {
  const { postId } = params;
  return NextResponse.json({ status: "success", postId }, { status: 201 });
};
