import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  console.log({serverSession: session})

  return session
}
