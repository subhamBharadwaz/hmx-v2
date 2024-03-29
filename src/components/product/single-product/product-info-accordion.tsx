import { FC } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import parse from "html-react-parser"

interface ProductInfoAccordionProps {
  details: string
  description: string
  className?: string
}

const ProductInfoAccordion: FC<ProductInfoAccordionProps> = ({
  details,
  description,
  className,
}) => {
  return (
    <Accordion type="single" collapsible className={cn("w-full", className)}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Product Details</AccordionTrigger>
        <AccordionContent>
          {details
            ? parse(details)
            : `There's no detail about this product at the moment.`}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Product Description</AccordionTrigger>
        <AccordionContent>
          {description
            ? parse(description)
            : `There's no description about this product at the moment.`}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default ProductInfoAccordion
