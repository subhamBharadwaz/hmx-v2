import * as z from "zod"

export const userLoginSchema = z.object({
  email: z
    .string()
    .email("Not a valid email")
    .nonempty({ message: "Email is required" }),

  password: z.string().nonempty({ message: "Password is required" }),
})

export type CreateUserLoginInput = z.TypeOf<typeof userLoginSchema>
