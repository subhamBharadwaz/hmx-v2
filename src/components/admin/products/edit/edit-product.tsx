"use client"

import { FC, useEffect, useState, useTransition } from "react"
import dynamic from "next/dynamic"
import { FileDialog } from "@/components/file-dialog"
import { Icons } from "@/components/icons"
import { MultiSelect } from "@/components/multi-select"
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
import { useToast } from "@/components/ui/use-toast"
import { ProductSections, ProductSizes } from "@/constants"
import {
  CreateProductInput,
  createProductSchema,
} from "@/lib/validations/product"
import type { FileWithPreview, IProduct } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "react-hook-form"

import "react-quill/dist/quill.snow.css"

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false, // Set ssr to false to make sure this component is only rendered on the client-side
})
interface ProductFormProps {
  accessToken: string | undefined
  productId: string
}

const AdminEditProduct: FC<ProductFormProps> = ({ accessToken, productId }) => {
  const { data: product, isLoading } = useQuery<IProduct>({
    queryKey: ["admin-product", productId],
    queryFn: async () => {
      if (accessToken) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/product/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        return res.data.product
      }
    },
  })

  const { toast } = useToast()

  const [files, setFiles] = useState<FileWithPreview[] | null>(null)
  const [isPending, startTransition] = useTransition()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (product?.photos && product?.photos.length > 0) {
      setFiles(
        product?.photos.map((image) => {
          const file = new File([], image?.id, {
            type: "image",
          })
          const fileWithPreview = Object.assign(file, {
            preview: image?.secure_url,
          })

          return fileWithPreview
        })
      )
    }
  }, [product])

  const adminUpdateProductMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/product/${productId}`,
        data,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      return res?.data
    },
    onSuccess: (data) => {
      queryClient.setQueriesData<IProduct>(["admin-products"], data)
      toast({
        description: "Product created successfully.",
        variant: "success",
      })
    },
  })

  const form = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: product?.name,
      price: String(product?.price),
      detail: product?.detail,
      description: product?.description,
      category: product?.category,
      gender: product?.gender,
      brand: product?.brand,
      stock: String(product?.stock),
      size: product?.size?.map((s) => {
        return {
          value: s,
          label: s,
        }
      }),
    },
  })

  async function onSubmit(values: CreateProductInput) {
    console.log({ values })
    try {
      const data = new FormData()

      if (values.photos.length < 2) {
        toast({
          description: "Select minimum 2 photos.",
          variant: "destructive",
        })
      }
      for (let i = 0; i < values.photos.length; i++) {
        data.append("photos", values.photos[i])
      }
      data.append("name", values.name)
      data.append("brand", values.brand)
      data.append("price", values.price)
      data.append("category", values.category)
      data.append("detail", values.detail)
      data.append("description", values.description)
      data.append("gender", values.gender)
      for (const s of values.size) {
        data.append("size", s.value)
      }
      data.append("stock", String(values.stock))
      adminUpdateProductMutation.mutate(data)
    } catch (error: any) {
      toast({
        title: "Something went wrong, please try again later.",
        description: error.message,
        variant: "destructive",
      })
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form
        className="max-w-2xl space-y-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter the product price..."
                  {...field}
                />
              </FormControl>
              <FormDescription>In Indian rupees (₹)</FormDescription>
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
              <FormLabel>Size</FormLabel>
              <MultiSelect
                createAble={true}
                isMulti={true}
                value={field.value}
                options={ProductSizes}
                onChange={field.onChange}
                placeholder="Select Sizes"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a section" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="Men">Men</SelectItem>
                    <SelectItem value="Women">Women</SelectItem>
                    <SelectItem value="Unisex">Unisex</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="detail"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormItem>
              <FormLabel>Product Detail</FormLabel>
              <FormControl>
                <ReactQuill
                  value={value}
                  onBlur={onBlur}
                  onChange={(newValue) => {
                    onChange(newValue)
                  }}
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ size: [] }],
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link", "image", "video"],
                      ["clean"],
                    ],
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormItem>
              <FormLabel>Product Description</FormLabel>
              <FormControl>
                <ReactQuill
                  value={value}
                  onBlur={onBlur}
                  onChange={(newValue) => {
                    onChange(newValue)
                  }}
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ size: [] }],
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link", "image", "video"],
                      ["clean"],
                    ],
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem className="flex w-full flex-col gap-1.5">
          <FormLabel>Product Photos</FormLabel>
          <FormControl>
            <FileDialog
              setValue={form.setValue}
              name="photos"
              maxFiles={4}
              maxSize={1024 * 1024 * 4}
              files={files}
              setFiles={setFiles}
              disabled={isPending}
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <Button type="submit" size="lg">
          {adminUpdateProductMutation.isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Update Product
        </Button>
      </form>
    </Form>
  )
}

export default AdminEditProduct