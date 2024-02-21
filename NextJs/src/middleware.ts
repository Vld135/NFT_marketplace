import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { validateToken } from "./helpers/api";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const authMather = ["/login", "/registration", "/reset"];
  const authorizedPageMatcher = ["/api", "/calendar", "/dashboard", "/profile", "/projects", "/settings"];

  if(authMather.includes(pathname)) {
    const token = cookies().get("Token")?.value;
    
    if(await validateToken(token)) {
      return NextResponse.redirect(new URL('/profile', req.url));
    }
    return NextResponse.next();
  }

  if(authorizedPageMatcher.some((path) => pathname.includes(path))) {
    const token = cookies().get("Token")?.value;
    if(await validateToken(token)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}