import * as z from "zod"

export const userLoginSchema = z.object({
  email: z
    .string()
    .email("Not a valid email")
    .nonempty({ message: "Email is required" }),

  password: z.string().nonempty({ message: "Password is required" }),
})

export type CreateUserLoginInput = z.TypeOf<typeof userLoginSchema>

const passwordRegex =
  /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

export const userRegisterSchema = z
  .object({
    firstName: z.string().nonempty({ message: "Fist name is required" }),
    lastName: z.string().nonempty({ message: "Last name is required" }),

    email: z
      .string()
      .email("Not a valid email")
      .nonempty({ message: "Email is required" }),

    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .regex(
        passwordRegex,
        "Password must contain one uppercase and one lowercase letter, number, special character and minimum 8 characters long"
      ),
    confirmPassword: z.string().nonempty({
      message: "Password confirmation is required",
    }),
    phoneNumber: z
      .string()
      .nonempty({ message: "Phone number is required" })
      .min(10)
      .max(10),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type CreateUserRegisterInput = z.TypeOf<typeof userRegisterSchema>
