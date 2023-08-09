"use client"

import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ProductCategories, ProductSections, ProductSizes } from "@/constants"

import { Icons } from "../icons"

interface FilterProductsProps {
  onCategoryChange: (checked: boolean, value: string) => void
  onSectionChange: (checked: boolean, value: string) => void
  onSizeChange: (checked: boolean, value: string) => void
  onApplyFilters: (
    selectedCategories: string[],
    selectedSections: string[],
    selectedSizes: string[]
  ) => void
  selectedCategories: string[]
  selectedSections: string[]
  selectedSizes: string[]
}

export const FilterProducts: React.FC<FilterProductsProps> = ({
  onApplyFilters,
  onCategoryChange,
  onSectionChange,
  onSizeChange,
  selectedCategories,
  selectedSections,
  selectedSizes,
}) => {
  const handleApplyFilters = () => {
    onApplyFilters(selectedCategories, selectedSections, selectedSizes)
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
                      onCheckedChange={(checked) =>
                        onCategoryChange(checked as boolean, category)
                      }
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
                    <Checkbox
                      id={section}
                      value={section}
                      onCheckedChange={(checked) =>
                        onSectionChange(checked as boolean, section)
                      }
                    />
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
                  <div
                    key={size.value}
                    className="flex items-center justify-between"
                  >
                    <label
                      htmlFor={size.label}
                      className="cursor-pointer text-sm font-medium leading-none text-slate-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-slate-300"
                    >
                      {size.label}
                    </label>
                    <Checkbox
                      id={size.value}
                      value={size.value}
                      onCheckedChange={(checked) =>
                        onSizeChange(checked as boolean, size.value)
                      }
                    />
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
