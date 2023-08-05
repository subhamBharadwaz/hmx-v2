"use client"

import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button, buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  ProductCategories,
  ProductSections,
  ProductSizes,
  categories,
} from "@/constants"
import { cn } from "@/lib/utils"
import { IProducts } from "@/types"
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { Icons } from "../icons"

export function FilterProducts() {
  const queryClient = useQueryClient()

  const [selectedSections, setSelectedSections] = React.useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  )

  const fetchFilteredProducts = async (

    category: string | string[]
  ) => {
    const res = await axios.get(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/v1/products?category=${category || "All"}`
    )
    return await res?.data
  }

  const handleApplyFilters = () => {
    const newData = fetchFilteredProducts(selectedCategories)
      queryClient.setQueryData(["products"],newData)
    
 
  }

  const handleCategory = (isChecked: string |boolean, value:string) => {

    setSelectedCategories(
      isChecked
        ? [...selectedCategories, value]
        : selectedCategories.filter((item) => item !== value)
    )
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          FILTERS <Icons.add className="ml-1 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent
        position="left"
        size="content"
        className="scrollbar-hide w-4/5 max-w-[450px] overflow-scroll"
      >
        <SheetHeader>
          <SheetTitle>REFINE BY</SheetTitle>
        </SheetHeader>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Category</AccordionTrigger>
            <AccordionContent className="w-content">
              <div className="space-y-3">
                {ProductCategories.map((category) => (
                  <div
                    key={category}
                    className="flex items-center justify-between"
                  >
                    <label
                      htmlFor={category}
                      className="cursor-pointer text-sm font-medium leading-none text-slate-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-slate-300"
                    >
                      {category}
                    </label>
                    <Checkbox
                      id={category}
                      value={category}
                      onCheckedChange={(checked)=> handleCategory(checked, category)}
                    />
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Section</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {ProductSections.map((section) => (
                  <div
                    key={section}
                    className="flex items-center justify-between"
                  >
                    <label
                      htmlFor={section}
                      className="cursor-pointer text-sm font-medium leading-none text-slate-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-slate-300"
                    >
                      {section}
                    </label>
                    <Checkbox id={section} />
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Size</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {ProductSizes.map((size) => (
                  <div key={size} className="flex items-center justify-between">
                    <label
                      htmlFor={size}
                      className="cursor-pointer text-sm font-medium leading-none text-slate-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-slate-300"
                    >
                      {size}
                    </label>
                    <Checkbox id={size} />
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <SheetFooter className="my-10">
          <div className="w-full space-y-5">
            <Button
              type="submit"
              className="w-full"
              onClick={handleApplyFilters}
            >
              Apply
            </Button>
            <Button type="submit" className="w-full" variant="outline">
              Remove all
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
