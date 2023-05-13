"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Category } from "@/types"

import HeroImage1 from "../../public/images/hero1.webp"
import HeroImage2 from "../../public/images/hero2.webp"

interface ICategory {
  title: string
  link: string
}

const categories: ICategory[] = [
  { title: "Twill Jogger", link: "/" },
  { title: "Shirred Jogger", link: "/" },
  { title: "Motoknit Jogger", link: "/" },
  { title: "Dropcrotch Jogger", link: "/" },
  { title: "Hiphop Jogger", link: "/" },
  { title: "Shadingblock Jogger", link: "/" },
  { title: "Chino Jogger", link: "/" },
  { title: "Handcuffed Jogger", link: "/" },
  { title: "Loosepocket Jogger", link: "/" },
  { title: "Splashcolor Jogger", link: "/" },
  { title: "Wool Jogger", link: "/" },
  { title: "Distressed Jogger", link: "/" },
  { title: "Noncuffed Jogger", link: "/" },
]

export function HoverNavigationMenu() {
  return (
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList>
      <NavigationMenuItem>
          <Link href="/products" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Shop All
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>For Him</NavigationMenuTrigger>
          <NavigationMenuContent className="flex justify-between py-6 pr-6">
            <div>
              <Link
                href="/products/men"
                className="mb-6 ml-6 w-fit text-xl font-bold text-foreground transition duration-500 ease-in-out hover:border-b hover:border-foreground"
              >
                For Him
              </Link>
              <ul className="grid gap-2 p-6  md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                {categories.map((category) => (
                  <Link
                    key={category.title}
                    href={category.link}
                    className="w-fit transition duration-500 ease-in-out hover:border-b hover:border-foreground"
                  >
                    <li className=" text-sm text-slate-700 dark:text-slate-200">
                      {category.title}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
            <div className="flex gap-x-3">
              <div className="relative h-64 w-[200px]">
                <Image
                  src={HeroImage1}
                  alt="men"
                  fill
                  sizes="(max-width: 1280px) 200px"
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 w-[200px]">
                <Image
                  src={HeroImage2}
                  alt="men"
                  fill
                  sizes="(max-width: 1280px) 200px"
                  className="object-cover"
                />
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>For Her</NavigationMenuTrigger>
          <NavigationMenuContent className="flex justify-between py-6 pr-6">
            <div>
              <Link
                href="/products/women"
                className="mb-6 ml-6 w-fit text-xl font-bold text-foreground transition duration-500 ease-in-out hover:border-b hover:border-foreground"
              >
                For Her
              </Link>
              <ul className="grid gap-3 p-6  md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                {categories.map((category) => (
                  <Link
                    key={category.title}
                    href={category.link}
                    className="w-fit transition duration-500 ease-in-out hover:border-b hover:border-foreground"
                  >
                    <li className=" text-sm text-slate-700 dark:text-slate-200">
                      {category.title}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
            <div className="flex gap-x-3">
              <div className="relative h-64 w-[200px]">
                <Image
                  src={HeroImage1}
                  alt="men"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 w-[200px]">
                <Image
                  src={HeroImage2}
                  alt="men"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
