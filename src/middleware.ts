import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    const isAuth = !!token
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")

    const isAdminPage =
      req.nextUrl.pathname.startsWith("/admin") &&
      // @ts-ignore
      req.nextauth.token?.user?.role === "admin"

    if (isAuth) {
      if (isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }

      return null
    }

    if (isAuth) {
      if (!isAdminPage) {
        return NextResponse.redirect(new URL("/login", req.url))
      }
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname
      if (req.nextUrl.search) {
        from += req.nextUrl.search
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      )
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/admin/:path*", "/checkout/:path*", "/account/:path*"],
}
