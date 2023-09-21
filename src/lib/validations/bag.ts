import * as z from "zod";

export const createBagSchema = z.object({
    productId: z.string({ required_error: "Product id is required" }),
    size: z.string({ required_error: "Product size is required" }),
    quantity: z
      .number({ required_error: "Product quantity is required" })
      .default(1),
});

export type CreateBagInput = z.TypeOf<typeof createBagSchema>;