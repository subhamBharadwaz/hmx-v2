import { NextResponse } from "next/server"
import { withAuth } from "next-auth/middleware"
import { getToken } from "next-auth/jwt"

export default withAuth(
    async function middleware(req) {
      const token = await getToken({ req })
      const isAuth = !!token
      const isAuthPage =
        req.nextUrl.pathname.startsWith("/login") ||
        req.nextUrl.pathname.startsWith("/register")

        // @ts-ignore
        const isAdminPage = req.nextUrl.pathname.startsWith('/admin') && req.nextauth.token?.user?.role ==='admin'
  
      if (isAuthPage) {
        if (isAuth) {
          return NextResponse.redirect(new URL("/", req.url))
        }
  
        return null
      }

      if(!isAdminPage){
      if(isAuth){
            return NextResponse.redirect(new URL('/login', req.url))
        }
      }
  
      if (!isAuth) {
        let from = req.nextUrl.pathname;
        if (req.nextUrl.search) {
          from += req.nextUrl.search;
        }
  
        return NextResponse.redirect(
          new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
        );
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
  matcher: ["/login", "/register", "/admin/:path*"],
}