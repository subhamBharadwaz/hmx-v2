"use client"

import { FC } from "react"
import Image from "next/image"
import { IUser } from "@/types"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import AdminUpdateUserDetailsForm from "./admin-update-user-form"

interface UserDetailsProps {
  id: string
  accessToken: string | undefined
}

const UserDetail: FC<UserDetailsProps> = ({ id, accessToken }) => {
  const { data: user } = useQuery<IUser>({
    queryKey: ["admin-user", id],
    queryFn: async () => {
      if (accessToken) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        return res?.data.user
      }
    },
  })
  return (
    <>
      {user && (
        <div className="space-y-10">
          <div className="flex w-full flex-col items-center justify-center gap-5">
            <div className="relative h-32 w-32 overflow-hidden rounded-full">
              <Image
                src={user.photo.secure_url}
                alt={user.firstName}
                fill
                className="bg-slate-50/20 object-cover object-center blur-sm transition-all duration-200 ease-in-out"
                onLoadingComplete={(image) =>
                  image.classList.remove("bg-slate-50/20", "blur-sm")
                }
              />
            </div>
            <h4 className="text-lg font-semibold">{`${user?.firstName} ${user?.lastName}`}</h4>
          </div>
          <div className="space-y-5">
            <h3 className="text-xl font-semibold">Edit Details</h3>
            <AdminUpdateUserDetailsForm accessToken={accessToken} user={user} />
          </div>
        </div>
      )}
    </>
  )
}

export default UserDetail
