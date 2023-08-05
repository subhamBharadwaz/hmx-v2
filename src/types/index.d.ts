import { Icons } from "@/components/icons"
import type { Icon } from "lucide-react"

export type NavItem = {
  title: string
  href: string
  icon?: Icon
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavItem[]
    }
)

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage?: string
  links: {
    twitter: string
    github: string
    linkedin: string
  }
}

export type ECommerceConfig = {
  mainNav: MainNavItem[]
}

export type AdminConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type Option = {
  label: string
  value: string
}

export type FileWithPreview = FileWithPath & {
  preview: string
}

export type FileWithPreview = FileWithPath & {
  preview: string
}

// User Types
export interface IUser {
  _id?: string
  firstName: string
  lastName: string
  email: string
  password: string
  photo: {
    id: string
    secure_url: string
  }
  phoneNumber: string
  role?: ROLE
}

// Product Types
export enum Gender {
  Men = "Men",
  Women = "Women",
  Unisex = "Unisex",
}

export enum Category {
  Twill = "Twill Jogger",
  Shirred = "Shirred Jogger",
  Moto = "Motoknit Jogger",
  Drop = "Dropcrotch Jogger",
  HipHop = "Hiphop Jogger",
  Shading = "Shadingblock Jogger",
  Chino = "Chino Jogger",
  Handcuffed = "Handcuffed Jogger",
  Loose = "Loosepocket Jogger",
  Splash = "Splashcolor Jogger",
  Wool = "Wool Jogger",
  Tore = "Distressed Jogger",
  NonCuffed = "Noncuffed Jogger",
}

export enum RatingType {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
}

export interface IReview {
  _id: string
  user: string
  userInfo: {
    firstName: string
    lastName: string
    email: string
    photo: string
  }
  rating: number
  comment: string
  date: Date
}

export interface IProduct {
  _id?: string
  name: string
  price: string
  detail: string
  description: string
  photos: {
    id: string
    secure_url: string
  }[]
  gender: Gender
  category: Category
  brand: string
  stock: number
  size: string[]
  ratings: RatingType
  numberOfReviews: number
  reviews: IReview[]
  user: string
  createdAt: Date
  updatedAt: Date
}

export interface ITopSellingProduct {
  category: string
  name: string
  photos: {
    id: string
    secure_url: string
  }[]
  price: number
  productId: string
  quantitySold: number
  totalRevenue: number
}

export interface IProducts {
  productCount: number
  total: number
  limit: number
  currentPage: number
  pageCount: number
  filteredProductCount: number
  products: IProduct[]
}

// Wishlist
export interface IWishlist {
  productId: string
  name: string
  price: number
  photos: {
    id: string
    secure_url: string
  }[]
  size: string[]
  category: string
}

// Bag
export interface IBag {
  _id: string
  user: string
  products: {
    productId: string
    quantity: number
    name: string
    size: string
    price: number
    photos: {
      id: string
      secure_url: string
    }[]
  }[]

  totalPrice: number
  createdAt: Date
  updatedAt: Date
}

// Order
export enum OrderStatusType {
  Processing = "Processing",
  Shipped = "Shipped",
  OutForDelivery = "Out for delivery",
  Delivered = "Delivered",
}

export interface IOrder {
  _id?: string
  shippingInfo: {
    firstName: string
    lastName: string
    houseNo: string
    streetName: string
    landMark: string
    postalCode: string
    city: string
    country: string
    state: string
    phoneNumber: string
  }
  orderItems: {
    _id?: string
    name: string
    size: string
    quantity: number
    image: string
    price: number
    product: string
  }[]
  paymentInfo: {
    id: string
  }
  taxAmount: number
  shippingAmount: number
  totalAmount: number
  orderStatus?: OrderStatusType
  createdAt?: Date
}

// Wishlist

export interface IAddress {
  firstName: string
  lastName: string
  houseNo: string
  streetName: string
  landMark: string
  postalCode: string
  city: string
  country: string
  state: string
  phoneNumber: string
}

// Admin

// Products
export interface IAdminProducts {
  productCount: number
  total: number
  limit: number
  page: number
  products: IProduct[]
  pageCount: number
}

// Sales
export interface ISales {
  name: string
  totalRevenue: number
}
