const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message || "File upload failed");
  }

  const data = await res.json();
  return data.url as string;
};

export const deleteFile = async (fileNameOrUrl: string) => {
  const res = await fetch("/api/upload", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fileNameOrUrl }),
  });

  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message || "File deletion failed");
  }
};

export const isManagedUploadUrl = (url: string) => {
  const r2PublicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.replace(/\/$/, "");
  const legacyS3Url = "https://pawtograph.s3.eu-west-3.amazonaws.com";

  return (
    url.startsWith(legacyS3Url) ||
    (Boolean(r2PublicUrl) && url.startsWith(r2PublicUrl!))
  );
};

export default uploadFile;
