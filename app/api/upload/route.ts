import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";
import { NextResponse } from "next/server";

const getClient = () =>
  new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
    },
  });

const getFileName = (originalName: string) => {
  const parts = originalName.split(".");
  const extension = parts.length > 1 ? parts[parts.length - 1] : "";
  const baseName = parts.slice(0, -1).join(".") || "file";

  return extension ? `${baseName}-${uuid()}.${extension}` : `${baseName}-${uuid()}`;
};

const getObjectKey = (fileNameOrUrl: string) => {
  if (!fileNameOrUrl) return "";

  if (!fileNameOrUrl.startsWith("http://") && !fileNameOrUrl.startsWith("https://")) {
    return fileNameOrUrl;
  }

  try {
    const url = new URL(fileNameOrUrl);
    return url.pathname.replace(/^\/+/, "");
  } catch {
    return "";
  }
};

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    if (
      !process.env.R2_ACCOUNT_ID ||
      !process.env.R2_ACCESS_KEY_ID ||
      !process.env.R2_SECRET_ACCESS_KEY ||
      !process.env.R2_BUCKET_NAME ||
      !process.env.NEXT_PUBLIC_R2_PUBLIC_URL
    ) {
      return NextResponse.json(
        { message: "R2 environment variables are missing" },
        { status: 500 }
      );
    }

    const objectKey = getFileName(file.name);
    const buffer = Buffer.from(await file.arrayBuffer());
    const client = getClient();

    await client.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: objectKey,
        Body: buffer,
        ContentType: file.type || "application/octet-stream",
      })
    );

    const publicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL.replace(/\/$/, "");
    return NextResponse.json(
      {
        key: objectKey,
        url: `${publicUrl}/${objectKey}`,
      },
      { status: 200 }
    );
  } catch (error: any) {
    const message =
      error?.name === "AccessDenied"
        ? "AccessDenied: check R2 credentials, bucket name, and token bucket permissions (Object Read/Write)."
        : error?.message || "Upload failed";
    return NextResponse.json({ message, errorName: error?.name }, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const { fileNameOrUrl } = (await req.json()) as { fileNameOrUrl: string };
    const key = getObjectKey(fileNameOrUrl);

    if (!key) {
      return NextResponse.json({ message: "Invalid file key" }, { status: 400 });
    }

    if (
      !process.env.R2_ACCOUNT_ID ||
      !process.env.R2_ACCESS_KEY_ID ||
      !process.env.R2_SECRET_ACCESS_KEY ||
      !process.env.R2_BUCKET_NAME
    ) {
      return NextResponse.json(
        { message: "R2 environment variables are missing" },
        { status: 500 }
      );
    }

    const client = getClient();
    await client.send(
      new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
      })
    );

    return NextResponse.json({ deleted: true }, { status: 200 });
  } catch (error: any) {
    const message =
      error?.name === "AccessDenied"
        ? "AccessDenied: check R2 credentials, bucket name, and token bucket permissions (Object Read/Write)."
        : error?.message || "Delete failed";
    return NextResponse.json({ message, errorName: error?.name }, { status: 500 });
  }
};
