"use client"

import { FC } from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
  CreateProductInput,
  createProductSchema,
} from "@/lib/validations/product"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import RSelect from "react-select"

const sections = [
  { value: "Men", label: "Men" },
  { value: "Women", label: "Women" },
  { value: "Unisex", label: "Unisex" },
]

interface ProductFormProps {}

const ProductForm: FC<ProductFormProps> = ({}) => {
  const form = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
  })
  const { toast } = useToast()

  async function onSubmit(values: CreateProductInput) {
    toast({
      description: "Address updated successfully.",
    })
  }

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the product name..." {...field} />
              </FormControl>
              <FormDescription>
                Do not exceed 30 characters when entering the product name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <ScrollArea className="h-48">
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      <SelectItem value="Twill Jogger">Twill Jogger</SelectItem>
                      <SelectItem value="Shirred Jogger">
                        Shirred Jogger
                      </SelectItem>
                      <SelectItem value="Motoknit Jogger">
                        Motoknit Jogger
                      </SelectItem>
                      <SelectItem value="Dropcrotch Jogger">
                        Dropcrotch Jogger
                      </SelectItem>
                      <SelectItem value="Hiphop Jogger">
                        Hiphop Jogger
                      </SelectItem>
                      <SelectItem value="Shadingblock Jogger">
                        Shadingblock Jogger
                      </SelectItem>
                      <SelectItem value="Chino Jogger">Chino Jogger</SelectItem>
                      <SelectItem value="Handcuffed Jogger">
                        Handcuffed Jogger
                      </SelectItem>
                      <SelectItem value="Splash Jogger">
                        Splash Jogger
                      </SelectItem>
                      <SelectItem value="Loose Jogger">Loose Jogger</SelectItem>
                      <SelectItem value="Wool Jogger">Wool Jogger</SelectItem>
                      <SelectItem value="Tore Jogger">Tore Jogger</SelectItem>
                      <SelectItem value="NonCuffed Jogger">
                        NonCuffed Jogger
                      </SelectItem>
                    </SelectGroup>
                  </ScrollArea>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand</FormLabel>
              <FormControl>
                <Input placeholder="Enter the brand name." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input type="number" min={0} defaultValue={0} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand</FormLabel>
              <FormControl>
                <Input placeholder="Enter the brand name." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="detail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the street name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Land Mark</FormLabel>
              <FormControl>
                <Input placeholder="Enter land mark" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg">
          Create Product
        </Button>
      </form>
    </Form>
  )
}

export default ProductForm
