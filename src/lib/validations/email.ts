import * as z from "zod"

export const createEmailSchema = z.object({
  email: z.string().email().nonempty({ message: "Email is required" }),
})

export type CreateEmailInput = z.TypeOf<typeof createEmailSchema>
