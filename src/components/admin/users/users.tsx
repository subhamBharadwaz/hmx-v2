"use client"

import { FC } from "react"
import { columns } from "@/components/admin/users/columns"
import { DataTable } from "@/components/admin/users/data-table"
import { IUser } from "@/types"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface UsersProps {
  accessKey: string | undefined
}

const Users: FC<UsersProps> = ({ accessKey }) => {
  const { data, isLoading } = useQuery<IUser[]>({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${accessKey}`,
          },
        }
      )
      return await res?.data.users
    },
  })

  return (
    <div className="w-full">
      {data && <DataTable columns={columns} data={data} />}
    </div>
  )
}

export default Users
