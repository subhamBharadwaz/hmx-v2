import { NextRequest, NextResponse } from "next/server"
import ReminderEmail from "@/components/emails/newsletter-email"
import { resend } from "@/lib/resend"
import { getCurrentUser } from "@/lib/session"
import { createEmailSchema } from "@/lib/validations/email"
import { type ErrorResponse } from "resend"

import { env } from "@/env.mjs"

export async function POST(req: NextRequest) {
  const input = createEmailSchema.parse(await req.json())
  try {
    const subject = "Welcome to HMX - Get Ready for Ultimate Comfort!"
    const user = await getCurrentUser()

    await resend.emails.send({
      from: env.EMAIL_FROM_ADDRESS,
      to: input.email,
      subject,
      react: ReminderEmail({
        firstName: user?.user?.firstName,
        fromEmail: env.EMAIL_FROM_ADDRESS,
      }),
    })

    return NextResponse.json("Successfully sent", { status: 200 })
  } catch (error) {
    console.error(error)

    const resendError = error as ErrorResponse

    if (resendError?.error?.message) {
      return NextResponse.json(resendError.error.message, { status: 429 })
    }

    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 500 })
    }

    return NextResponse.json("Something went wrong", { status: 500 })
  }
}
