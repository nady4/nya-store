export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/orders/:path*",
    "/catalog/:path*",
    "/cart/:path*",
    "/wishlist/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/address/:path*",
  ],
};
