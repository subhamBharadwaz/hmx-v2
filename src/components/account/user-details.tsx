"use client"

import { FC } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface UserDetailsProps {
  accessToken: string | undefined
}

const UserDetails: FC<UserDetailsProps> = ({ accessToken }) => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["userdetails"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/userdetails`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      return await res.data.user
    },
  })
  return (
    <>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <>
          <p className="text-foreground lg:text-lg">{`${user?.firstName} ${user?.lastName}`}</p>
          <p className="text-foreground lg:text-lg">{user?.email}</p>
          <p className="text-foreground lg:text-lg">{user?.phoneNumber}</p>
        </>
      )}
    </>
  )
}

export default UserDetails
