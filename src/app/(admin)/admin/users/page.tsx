import Users from "@/components/admin/users/users"
import getQueryClient from "@/lib/getQueryClient"
import { getCurrentUser } from "@/lib/session"
import { Hydrate, dehydrate } from "@tanstack/react-query"
import axios from "axios"

const getUsers = async (accessToken: string | undefined) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/users`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
  return await res?.data?.users
}

export default async function AdminUsersPage() {
  const user = await getCurrentUser()

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(["admin-users"], () =>
    getUsers(user?.accessToken)
  )
  const dehydratedState = dehydrate(queryClient)

  return (
    <Hydrate state={dehydratedState}>
      <Users accessKey={user?.accessToken} />
    </Hydrate>
  )
}
