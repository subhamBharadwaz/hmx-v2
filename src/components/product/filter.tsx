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
import { ProductCategories, ProductSections, ProductSizes } from "@/constants"

import { Icons } from "../icons"
import { cn } from "@/lib/utils"

export function FilterProducts() {
  return (
      <Sheet>
        <SheetTrigger asChild>
          <span className="flex cursor-pointer font-semibold">
            FILTERS <Icons.add className="ml-1 w-4" />
          </span>
        </SheetTrigger>
        <SheetContent position="left" size="content" className="scrollbar-hide w-4/5 max-w-[450px] overflow-scroll">  
          <SheetHeader>
            <SheetTitle>REFINE BY</SheetTitle>
          </SheetHeader>
          <Accordion type="single" collapsible  className="w-full">
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
                      <Checkbox id={category} />
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
                    <div
                      key={size}
                      className="flex items-center justify-between"
                    >
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
            <Button type="submit" className="w-full">Apply</Button>
            <Button type="submit" className='w-full' variant='outline'>Remove all</Button>
            </div>
          </SheetFooter>
      
        </SheetContent>
      </Sheet>
  )
}
