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
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { CreateUserUpdateInput, updateUserSchema } from "@/lib/validations/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "react-hook-form"

interface UserDetailsFormProps {
  accessToken: string | undefined
}

const UserDetailsForm: FC<UserDetailsFormProps> = ({ accessToken }) => {
  const queryClient = useQueryClient()

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

  const updateUserDetailsHandler = async (data: CreateUserUpdateInput) => {
    if (accessToken) {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/userdashboard/update`,
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
  const updateUserDetailsMutation = useMutation({
    mutationFn: updateUserDetailsHandler,
    onSuccess: (data) => {
      queryClient.setQueriesData(["userdetails"], data)
    },
  })

  const form = useForm<CreateUserUpdateInput>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      phoneNumber: user?.phoneNumber,
    },
  })
  const { toast } = useToast()

  async function onSubmit(values: CreateUserUpdateInput) {
    try {
      updateUserDetailsMutation.mutate(values)
      toast({
        description: "Details updated successfully.",
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
      <form
        className="max-w-xl space-y-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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

        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder={user?.email} />
          </FormControl>
          <FormMessage />
        </FormItem>
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

export default UserDetailsForm
