import { Icons } from "@/components/icons"
import {
  BaggageClaim,
  Lock,
  MailCheck,
  PackageOpen,
  Truck,
  User,
} from "lucide-react"

export const ProductCarousalData = [
  {
    id: 1,
    image: "/images/230130_Seneca_Laydowns_0059_670x.webp",
    category: "Twill Jogger",
    title: "Wear, where? Everywhere.",
    description:
      "Pure versatility, made from our signature soft-structured technical fabric from Italy.",
  },
  {
    id: 2,
    image: "/images/230130_Seneca_Laydowns_0082_670x.webp",
    category: "Shredded Jogger",
    title: "General Purpose Trouser.",
    description:
      "Pure versatility, made from our signature soft-structured technical fabric from Italy.",
  },
  {
    id: 3,
    image: "/images/hero1.webp",
    category: "Shredded Jogger",
    title: "Suited. Booted. Pro.",
    description:
      "Pure versatility, made from our signature soft-structured technical fabric from Italy.",
  },
]

export const ProductCategories = [
  "Twill Jogger",
  "Shirred Jogger",
  "Motoknit Jogger",
  "Dropcrotch Jogger",
  "Hiphop Jogger",
  "Shadingblock Jogger",
  "Chino Jogger",
  "Handcuffed Jogger",
  "Loosepocket Jogger",
  "Splashcolor Jogger",
  "Wool Jogger",
  "Distressed Jogger",
  "Noncuffed Jogger",
]

export const ProductSections = ["Men", "Women", "Unisex"]

export const ProductSizes = [
  {
    value: "S",
    label: "S",
  },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
  { value: "XXL", label: "XXL" },
]

export const roles = [
  {
    value: "user",
    label: "User",
    icon: User,
  },
  {
    value: "admin",
    label: "Admin",
    icon: Lock,
  },
]

export const orderStatus = [
  {
    value: "Processing",
    label: "Processing",
    icon: PackageOpen,
  },
  {
    value: "Shipped",
    label: "Shipped",
    icon: BaggageClaim,
  },
  {
    value: "Out for delivery",
    label: "Out for delivery",
    icon: Truck,
  },
  {
    value: "Delivered",
    label: "Delivered",
    icon: MailCheck,
  },
]

export const categories = [
  {
    value: "Twill Jogger",
    label: "Twill Jogger",
  },
  {
    value: "Shirred Jogger",
    label: "Shirred Jogger",
  },
  {
    value: "Motoknit Jogger",
    label: "Motoknit Jogger",
  },
  {
    value: "Dropcrotch Jogger",
    label: "Dropcrotch Jogger",
  },
  {
    value: "Hiphop Jogger",
    label: "Hiphop Jogger",
  },
  {
    value: "Shadingblock Jogger",
    label: "Shadingblock Jogger",
  },
  {
    value: "Chino Jogger",
    label: "Chino Jogger",
  },
  {
    value: "Handcuffed Jogger",
    label: "Handcuffed Jogger",
  },
  {
    value: "Loosepocket Jogger",
    label: "Loosepocket Jogger",
  },
  {
    value: "Splashcolor Jogger",
    label: "Splashcolor Jogger",
  },
  {
    value: "Wool Jogger",
    label: "Wool Jogger",
  },
  {
    value: "Distressed Jogger",
    label: "Distressed Jogger",
  },
  {
    value: "Noncuffed Jogger",
    label: "Noncuffed Jogger",
  },
]

export const productSections = [
  {
    value: "Men",
    label: "Men",
  },
  {
    value: "Women",
    label: "Women",
  },
  {
    value: "Unisex",
    label: "Unisex",
  },
]
