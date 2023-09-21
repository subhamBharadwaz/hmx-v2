import * as z from "zod"

export const createAddressSchema = z.object({
    firstName: z.string({required_error: 'First name is required'}),

    lastName: z.string({required_error: 'Last name is required'}),
  
    houseNo: z.string({required_error: 'House number is required'}),
  
    streetName: z.string({required_error: 'Street name is required'}),
    landMark: z.string({required_error: 'Last mark is required'}),
    postalCode: z.string({required_error: 'Postal number is required'}),
    city: z.string({required_error: 'City Name is required'}),
    country: z.string().default("India"),
    state: z.string({required_error: 'State name is required'}),
    phoneNumber: z.string({required_error: 'Phone number is required'}),
})

export type CreateAddressInput = z.TypeOf<typeof createAddressSchema>
