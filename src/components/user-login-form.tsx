"use client"

import { FC, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { CreateUserLoginInput, userLoginSchema } from "@/lib/validations/auth"
import { AppDispatch, store } from "@/store"
import { setCredentials } from "@/store/features/auth/auth-slice"
import { useLoginMutation } from "@/store/services/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

interface UserLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export const UserLoginForm: FC<UserLoginFormProps> = ({}) => {
  const [errMsg, setErrMsg] = useState("")
  const [login, { isLoading }] = useLoginMutation()

  const router = useRouter()

  const dispatch = useDispatch<AppDispatch>()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserLoginInput>({
    resolver: zodResolver(userLoginSchema),
  })

  async function onSubmit(values: CreateUserLoginInput) {
    try {
      const userData = await login({
        email: values.email,
        password: values.password,
      }).unwrap()
      dispatch(setCredentials({ ...userData }))
      router.push("/")
    } catch (error) {
      if (error) {
        setErrMsg("err")
      }
    }
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
