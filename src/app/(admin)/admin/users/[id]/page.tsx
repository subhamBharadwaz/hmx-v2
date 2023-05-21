import UserDetail from "@/components/admin/users/user-details"
import Hydrate from "@/lib/HydrateClient"
import getQueryClient from "@/lib/getQueryClient"
import { getCurrentUser } from "@/lib/session"
import { dehydrate } from "@tanstack/query-core"
import axios from "axios"

const getUser = async (id: string, accessToken: string | undefined) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/user/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
  return res.data.user
}

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await getCurrentUser()
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(["admin-user", params.id], () =>
    getUser(params.id, user?.accessToken)
  )
  const dehydratedState = dehydrate(queryClient)
  return (
    <section className="">
      <h2 className="text-2xl font-semibold text-foreground">
        User Information
      </h2>
      <Hydrate state={dehydratedState}>
        <div className="my-10">
          <UserDetail id={params.id} accessToken={user?.accessToken} />
        </div>
      </Hydrate>
    </section>
  )
}
