"use client"

import { FC, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { signIn } from "next-auth/react"
import { cn } from "@/lib/utils"
import { CreateUserLoginInput, userLoginSchema } from "@/lib/validations/auth"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


interface UserLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export const UserLoginForm: FC<UserLoginFormProps> = ({}) => {

  const [isLoading, setIsLoading] =useState<boolean>(false)

  const searchParams = useSearchParams()


  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserLoginInput>({
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

    return toast({
      title: "Check your email",
      description: "We sent you a login link. Be sure to check your spam too.",
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <Label className="sr-only" htmlFor="password">
            Password
          </Label>
          <Input id="password" type="password" {...register("password")} />
          {errors?.password && (
            <p className="px-1 text-xs text-red-600">
              {errors.password.message}
            </p>
          )}

          <button type="submit" className={cn(buttonVariants())}>
            Login
          </button>
        </div>
      </form>
    </div>
  )
}
