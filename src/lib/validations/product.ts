import * as z from "zod"

const MAX_FILE_SIZE = 1000000
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]
export const createProductSchema = z.object({
  name: z.string().nonempty({ message: "Product name is required" }).max(120, {
    message: "Product name should not be more than 120 characters long",
  }),
  price: z
    .string()
    .nonempty({ message: "Product price is required" })
    .max(6, "Product price should not be more than 6 digits"),
  detail: z
    .string()
    .max(1000, { message: "Do not exceed 1000 characters" })
    .nonempty({ message: "Product detail is required" }),
  description: z
    .string()
    .max(1000, { message: "Do not exceed 1000 characters" })
    .nonempty({ message: "Product description is required" }),
  gender: z.string().nonempty({ message: "Select a section from the list" }),
  category: z.string().nonempty({ message: "Select a category from the list" }),

  stock: z.string(),
  brand: z.string().nonempty({ message: "Product brand is required" }),
  size: z.any(),
  // TODO
  photos: z.any(),
})

export type CreateProductInput = z.TypeOf<typeof createProductSchema>
