"use client"

import { FC, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Icons } from "@/components/icons"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { CreateUserLoginInput, userLoginSchema } from "@/lib/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"

interface UserLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export const UserLoginForm: FC<UserLoginFormProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const searchParams = useSearchParams()

  const form = useForm<CreateUserLoginInput>({
    resolver: zodResolver(userLoginSchema),
  })

  async function onSubmit(values: CreateUserLoginInput) {
    setIsLoading(true)

    const signInResult = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: true,
      callbackUrl: searchParams?.get("from") || "/",
    })

    setIsLoading(false)

    if (!signInResult?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email address"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="***********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" size="lg" type="submit">
          Login
        </Button>
      </form>
    </Form>
  )
}
