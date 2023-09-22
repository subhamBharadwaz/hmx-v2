"use client"

import { FC, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { CreateEmailInput, createEmailSchema } from "@/lib/validations/email"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { getSession } from "next-auth/react"
import Confetti from "react-dom-confetti"
import { useForm } from "react-hook-form"

import { env } from "@/env.mjs"

import { Icons } from "./icons"
import { Input } from "./ui/input"

interface NewsLetterFormProps {}

const NewsLetterForm: FC<NewsLetterFormProps> = ({}) => {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean | null>(null)

  const form = useForm<CreateEmailInput>({
    resolver: zodResolver(createEmailSchema),
  })

  async function onSubmit(value: CreateEmailInput) {
    const session = await getSession()
    setIsLoading(true)

    try {
      await axios.post(
        `${env.NEXT_PUBLIC_APP_URL}/api/email/newsletter`,
        {
          email: value.email,
          name: session?.user.user.firstName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      setIsLoading(false)
    } catch (error: any) {
      if (error?.response?.data?.error) {
        setError(error?.response?.data?.error)
      }
    }
  }
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-3 md:flex-row md:items-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Confetti
          active={!isLoading}
          config={{ elementCount: 200, spread: 90 }}
        />
        <Button
          className={cn({
            "cursor-not-allowed opacity-60": isLoading,
          })}
          size="lg"
          type="submit"
        >
          Let me in!{" "}
          {isLoading ? (
            <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />
          ) : null}
        </Button>
      </form>
    </Form>
  )
}

export default NewsLetterForm
