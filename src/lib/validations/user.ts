import * as z from 'zod'

export const updateUserSchema = z.object({
    firstName: z.string().nonempty({ message: "First Name is required" }),
    lastName: z.string().nonempty({ message: "Last name is required" }),
    phoneNumber: z.string()
      .nonempty({ message: "Phone number is required" })
      .min(10)
      .max(10),
    photo: z.any(),
  });

export type CreateUserUpdateInput = z.TypeOf<typeof updateUserSchema>;


export const adminUpdateUserSchema = z.object({
  firstName: z.string().nonempty({ message: "First Name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
  email: z.string().email().nonempty({message: "Email is required"}),
  phoneNumber: z.string()
    .nonempty({ message: "Phone number is required" })
    .min(10)
    .max(10),
    role: z.string().nonempty({message: 'Role is required'})
});

export type CreateAdminUserUpdateInput = z.TypeOf<typeof adminUpdateUserSchema>;