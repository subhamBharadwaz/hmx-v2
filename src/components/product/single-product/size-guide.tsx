import { FC } from "react"
import Image from "next/image"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SizeGuideProps {}

const inchValues = [
  {
    size: "S",
    waist: 26,
    length: 38.0,
  },
  {
    size: "M",
    waist: 28,
    length: 38.5,
  },
  {
    size: "L",
    waist: 30,
    length: 39.0,
  },
  {
    size: "XL",
    waist: 32,
    length: 39.5,
  },
  {
    size: "XXL",
    waist: 34,
    length: 40.0,
  },
]

const cmValues = [
  {
    size: "S",
    waist: 66,
    length: 96.5,
  },
  {
    size: "M",
    waist: 71.1,
    length: 97.8,
  },
  {
    size: "L",
    waist: 76.2,
    length: 99.1,
  },
  {
    size: "XL",
    waist: 81.3,
    length: 100.3,
  },
  {
    size: "XXL",
    waist: 86.3,
    length: 101.6,
  },
]

const SizeGuide: FC<SizeGuideProps> = ({}) => {
  return (
    <>
      <div className="relative h-48 w-full">
        <Image
          src="/images/size-guide.webp"
          fill
          alt="Size Guide"
          className="object-contain"
        />
      </div>
      <Tabs defaultValue="inch" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="inch">In</TabsTrigger>
          <TabsTrigger value="cm">Cms</TabsTrigger>
        </TabsList>
        <TabsContent value="inch">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Size</TableHead>
                <TableHead>Fits To (Waist)</TableHead>
                <TableHead className="text-right">
                  Fits To (Outseam Length)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inchValues.map((inch) => (
                <TableRow key={inch.size}>
                  <TableCell>{inch.size}</TableCell>
                  <TableCell className="text-center">{inch.waist}</TableCell>
                  <TableCell className="text-right">{inch.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="cm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Size</TableHead>
                <TableHead>Fits To (Waist)</TableHead>
                <TableHead className="text-right">
                  Fits To (Outseam Length)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cmValues.map((inch) => (
                <TableRow key={inch.size}>
                  <TableCell>{inch.size}</TableCell>
                  <TableCell className="text-center">{inch.waist}</TableCell>
                  <TableCell className="text-right">{inch.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </>
  )
}

export default SizeGuide
