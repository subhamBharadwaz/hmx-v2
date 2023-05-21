/* eslint-disable tailwindcss/migration-from-tailwind-2 */
"use client"

import { FC, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import RSelect from "react-select"

const sections = [
  { value: "Men", label: "Men" },
  { value: "Women", label: "Women" },
  { value: "Unisex", label: "Unisex" },
]

interface ProductFormProps {}

const ProductForm: FC<ProductFormProps> = ({}) => {
  return (
    <form className="flex">
      <div className="w-full space-y-5">
        <div className="grid w-full max-w-md items-center gap-1.5">
          <Label htmlFor="name" className="text-md font-semibold">
            Product Name
          </Label>
          <Input
            type="text"
            id="name"
            placeholder="Enter the product name..."
          />
          <p className="text-sm text-muted-foreground">
            Do not exceed 30 characters when entering the product name.
          </p>
        </div>
        <div className="grid w-full max-w-md items-center gap-1.5">
          <Label htmlFor="name" className="text-md font-semibold">
            Product Category
          </Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <ScrollArea className="h-48">
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="Twill Jogger">Twill Jogger</SelectItem>
                  <SelectItem value="Shirred Jogger">Shirred Jogger</SelectItem>
                  <SelectItem value="Motoknit Jogger">
                    Motoknit Jogger
                  </SelectItem>
                  <SelectItem value="Dropcrotch Jogger">
                    Dropcrotch Jogger
                  </SelectItem>
                  <SelectItem value="Hiphop Jogger">Hiphop Jogger</SelectItem>
                  <SelectItem value="Shadingblock Jogger">
                    Shadingblock Jogger
                  </SelectItem>
                  <SelectItem value="Chino Jogger">Chino Jogger</SelectItem>
                  <SelectItem value="Handcuffed Jogger">
                    Handcuffed Jogger
                  </SelectItem>
                  <SelectItem value="Splash Jogger">Splash Jogger</SelectItem>
                  <SelectItem value="Loose Jogger">Loose Jogger</SelectItem>
                  <SelectItem value="Wool Jogger">Wool Jogger</SelectItem>
                  <SelectItem value="Tore Jogger">Tore Jogger</SelectItem>
                  <SelectItem value="NonCuffed Jogger">
                    NonCuffed Jogger
                  </SelectItem>
                </ScrollArea>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid w-full max-w-md items-center gap-1.5">
          <Label htmlFor="name" className="text-md font-semibold">
            Section
          </Label>
          <RSelect
            defaultValue={[sections[0]]}
            isMulti
            name="colors"
            options={sections}
            className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm ring-offset-background placeholder:text-muted-foreground"
            unstyled
            classNames={{
              control: (state) =>
                state.isFocused ? "bg-red" : "border-grey-300",
            }}
            placeholder="Select section(s)"
            classNamePrefix="react-select"
          />
        </div>

        <div className="grid w-full max-w-md items-center gap-1.5">
          <Label htmlFor="brand" className="text-md font-semibold">
            Brand
          </Label>
          <Input type="text" id="brand" placeholder="Enter the brand name..." />
        </div>

        <div className="grid w-full max-w-md items-center gap-1.5">
          <Label htmlFor="detail" className="text-md font-semibold">
            Product Detail
          </Label>
          <Textarea placeholder="Type product detail here." id="detail" />
          <p className="text-sm text-muted-foreground">
            {" "}
            Enter the product detail using markdown syntax. Do not exceed 500
            characters.
          </p>
        </div>

        <div className="grid w-full max-w-md items-center gap-1.5">
          <Label htmlFor="description" className="text-md font-semibold">
            Product Description
          </Label>
          <Textarea placeholder="Type product detail here." id="description" />
          <p className="text-sm text-muted-foreground">
            {" "}
            Enter the product description using markdown syntax. Do not exceed
            500 characters.
          </p>
        </div>
      </div>
      <div></div>
    </form>
  )
}

export default ProductForm
