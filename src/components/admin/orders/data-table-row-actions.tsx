"use client"

import * as React from "react"
import Link from "next/link"
import { Icons } from "@/components/icons"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IOrder } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useSession } from "next-auth/react"

interface DataTableRowActionsProps<TData> {
  order: IOrder
}

export function DataTableRowActions<TData>({
    order,
}: DataTableRowActionsProps<TData>) {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)

  const queryClient = useQueryClient()
  const { data: session } = useSession()
  const accessToken = session?.user?.accessToken

//   const adminDeleteUserHandler = async () => {
//     if (accessToken) {
//       await axios.delete(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/user/${user?._id}`,

//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       )
//     }
//   }
//   const adminDeleteUserMutation = useMutation({
//     mutationFn: adminDeleteUserHandler,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["admin-users"])
//     },
//   })

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
          <Icons.ellipsis className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href={`/admin/orders/${order?._id}`} className="flex w-full">
              View/Edit Order
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteDialog(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this order?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault()
                setIsDeleteLoading(true)

                // adminDeleteUserMutation.mutate()

                setIsDeleteLoading(false)
                setShowDeleteDialog(false)
              }}
              className="bg-red-600 focus:ring-red-600"
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
