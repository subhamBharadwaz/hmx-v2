"use client"

import { FC } from "react"
import { Icons } from "@/components/icons"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface CardProps {}

const OverviewCard: FC<CardProps> = ({}) => {
  return (
    <div className="w-full rounded-lg bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 md:max-w-sm">
      <Card className="border-none bg-slate-50/50">
        <CardHeader>
          <CardTitle className="text-slate-900">Total Sales</CardTitle>
          <CardDescription className="text-slate-700">
            Total sales revenue of all time.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between text-slate-900">
          <p className="text-2xl">$291,189.75</p>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-300">
            <Icons.chart className="text-sky-600" />
          </span>
        </CardContent>
      </Card>
    </div>
  )
}

export default OverviewCard
