import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get("authorization");

  if (!jwt) return NextResponse.redirect(new URL("/login", request.url));

  // this condition avoid to show the login page if the user is logged in
  if (jwt) {
      if (request.nextUrl.pathname.includes("/login")) {
          try {
        await jwtVerify(jwt, new TextEncoder().encode("not look"));
        return NextResponse.redirect(new URL("/", request.url));
      } catch (error) {
        return NextResponse.next();
      }
    }
  }

  try {
    const { payload } = await jwtVerify(
      jwt,
      new TextEncoder().encode("not look")
    );
    
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/","/save","/mybooks","/book/:path*"],
};