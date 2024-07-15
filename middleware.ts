import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";

    return NextResponse.redirect(url);
  }

  if (req.nextUrl.pathname === "/") {
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";

      return NextResponse.redirect(url);
    } else {
      const url = req.nextUrl.clone();
      url.pathname = "/task";

      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
