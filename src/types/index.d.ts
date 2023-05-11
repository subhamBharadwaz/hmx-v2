import type { Icon } from "lucide-react"

export type NavItem = {
  title: string
  href: string
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
      items: NavLink[]
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
  forgotPasswordToken?: string
  forgotPasswordExpiry?: number
  createdAt?: Date
  updatedAt?: Date
  token?: string
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

// Wishlist
export interface IWishlist {
  user: string
  products: {
    productId: string
    name: string
    price: number
    photos: {
      id: string
      secure_url: string
    }[]
    size: string[]
    category: string
  }[]

  createdAt: Date
  updatedAt: Date
}
