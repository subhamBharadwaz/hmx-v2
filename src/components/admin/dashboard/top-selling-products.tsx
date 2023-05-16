import { FC } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface TopSellingProductsProps {}

const TopSellingProducts: FC<TopSellingProductsProps> = ({}) => {
  return (
    <Card className="w-full grow rounded-lg border border-slate-100 p-5 shadow-lg shadow-slate-100 dark:border-slate-800 dark:shadow-none  md:w-5/12">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Top Selling Products</CardTitle>
        <Link href="#" className={cn(buttonVariants({ variant: "link" }))}>
          See all
        </Link>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center justify-between gap-y-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/images/hero1.webp" />
              <AvatarFallback>Product</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">
                Rigo Black Jogger
              </p>
              <p className="text-sm text-muted-foreground">Twill Jogger</p>
            </div>
          </div>
          <p>$246</p>
        </div>
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/images/hero1.webp" />
              <AvatarFallback>Product</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">
                Rigo Black Jogger
              </p>
              <p className="text-sm text-muted-foreground">Twill Jogger</p>
            </div>
          </div>
          <p>$246</p>
        </div>
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/images/hero1.webp" />
              <AvatarFallback>Product</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">
                Rigo Black Jogger
              </p>
              <p className="text-sm text-muted-foreground">Twill Jogger</p>
            </div>
          </div>
          <p>$246</p>
        </div>
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/images/hero1.webp" />
              <AvatarFallback>Product</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">
                Rigo Black Jogger
              </p>
              <p className="text-sm text-muted-foreground">Twill Jogger</p>
            </div>
          </div>
          <p>$246</p>
        </div>
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/images/hero1.webp" />
              <AvatarFallback>Product</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">
                Rigo Black Jogger
              </p>
              <p className="text-sm text-muted-foreground">Twill Jogger</p>
            </div>
          </div>
          <p>$246</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default TopSellingProducts
