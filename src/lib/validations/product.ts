import * as z from "zod";

const MAX_FILE_SIZE = 1000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
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

  stock: z.number().default(0),
  brand: z.string().nonempty({ message: "Product brand is required" }),
  size: z.array(z.string()).min(1, { message: "Product size is required" }),
  // TODO
  photos: z.any(),
  // .refine(
  //   (files) => files?.[0]?.size <= MAX_FILE_SIZE,
  //   `Max image size is 5MB.`
  // )
  // .refine(
  //   (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //   "Only .jpg, .jpeg, .png and .webp formats are supported."
  // ),
  // .refine(
  //   (files) => files?.length < 2,
  //   "Minimum 2 images have to be selected"
  // ),
});

export type CreateProductInput = z.TypeOf<typeof createProductSchema>
