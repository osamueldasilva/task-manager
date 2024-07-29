import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  if (!token && pathname !== "/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (token && pathname === "/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/task";
    return NextResponse.redirect(url);
  }

  if (pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = token ? "/task" : "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/task/:path*", "/login"],
};
