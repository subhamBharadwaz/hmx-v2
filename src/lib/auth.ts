import axios from "axios"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/login`,
          credentials,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        const user = await res.data
        if (user) {
          return user
        } else return null
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },

    async session({ session, token, user }) {
      session.user = token as any
      return session
    },
  },

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
}
export default authOptions
