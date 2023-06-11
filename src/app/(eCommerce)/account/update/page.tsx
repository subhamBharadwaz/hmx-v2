import Link from "next/link"
import UserDetailsForm from "@/components/account/update/user-details-form"
import { Icons } from "@/components/icons"
import Hydrate from "@/lib/HydrateClient"
import getQueryClient from "@/lib/getQueryClient"
import { getCurrentUser } from "@/lib/session"
import { dehydrate } from "@tanstack/query-core"
import axios from "axios"

const getUserDetails = async (token: string | undefined) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/userdetails`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return await res.data.user
}

export default async function UpdateUserDetailsPage() {
  const user = await getCurrentUser()

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(["userdetails"], () =>
    getUserDetails(user?.accessToken)
  )
  const dehydratedState = dehydrate(queryClient)

  return (
    <section className="container space-y-10 pt-24">
      <Link
        href="/account"
        className="flex items-center gap-x-2 text-lg font-semibold"
      >
        <Icons.chevronLeft /> Back to My Account
      </Link>
      <h2 className="text-xl font-bold text-foreground md:text-4xl">
        My Profile
      </h2>
      <Hydrate state={dehydratedState}>
        <UserDetailsForm accessToken={user?.accessToken} />
      </Hydrate>
    </section>
  )
}
