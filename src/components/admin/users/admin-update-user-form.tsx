"use client"

import { FC } from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import {
  CreateAdminUserUpdateInput,
  adminUpdateUserSchema,
} from "@/lib/validations/user"
import { IUser } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "react-hook-form"

interface AdminUpdateUserDetailsFormProps {
  accessToken: string | undefined
  user: IUser
}

const AdminUpdateUserDetailsForm: FC<AdminUpdateUserDetailsFormProps> = ({
  accessToken,
  user,
}) => {
  const queryClient = useQueryClient()

  const adminUpdateUserDetailsHandler = async (
    data: CreateAdminUserUpdateInput
  ) => {
    if (accessToken) {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/user/${user?._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      return await res?.data.user
    }
  }
  const adminUpdateUserDetailsMutation = useMutation({
    mutationFn: adminUpdateUserDetailsHandler,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-user"])
    },
  })

  const form = useForm<CreateAdminUserUpdateInput>({
    resolver: zodResolver(adminUpdateUserSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      role: user?.role,
    },
  })
  const { toast } = useToast()

  async function onSubmit(values: CreateAdminUserUpdateInput) {
    try {
      adminUpdateUserDetailsMutation.mutate(values)
      toast({
        description: "Details updated successfully.",
        variant: "success",
      })
    } catch (error: any) {
      toast({
        title: "Something went wrong, please try again later.",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form className="w-full space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.gom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className={cn("w-full")} size="lg" type="submit">
          Update Details
        </Button>
      </form>
    </Form>
  )
}

export default AdminUpdateUserDetailsForm
