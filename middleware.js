export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/profile",
    "/profile/:path*",
    "/settings",
    "/conversations",
    "/conversations/:path*",
    "/notifications",
    "/adopt",
    "/lost",
    "/following",
    "/followers",
    "/post/:path*",
  ],
};
