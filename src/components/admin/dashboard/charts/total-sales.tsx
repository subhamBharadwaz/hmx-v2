"use client"

import { FC, useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import {
  Area,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
]

interface TotalSalesChartProps {}

const TotalSalesChart: FC<TotalSalesChartProps> = ({}) => {
  const [date, setDate] = useState<Date>()

  return (
    <div className="w-full grow space-y-5 rounded-lg border border-slate-100 p-5 shadow-lg shadow-slate-100 dark:border-slate-800 dark:shadow-none">
      <div className="justify-between space-y-3 md:flex md:space-y-0">
        <div className="space-y-1">
          <div className="flex items-center gap-x-5">
            <p className="text-lg font-semibold md:text-xl">Revenue</p>
            <p className="text-xs text-slate-500 md:text-sm">This year</p>
          </div>
          <div className="flex items-center gap-x-5">
            <p className="font-semibold text-emerald-300 md:text-lg">$21356</p>
            <p className="text-xs md:text-sm">All Time</p>
          </div>
        </div>
        <div className="flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            <p className="text-sm">Total</p>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                size='sm'
                className={cn(
                  "justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a year</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <ResponsiveContainer className="w-full" height={350}>
        <ComposedChart width={600} height={300} data={data}>
          <CartesianGrid
            vertical={false}
            horizontal={true}
            className="stroke-slate-200 dark:stroke-slate-600"
          />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#67e8f9" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#7dd3fc" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            cursor={{ stroke: "#2563eb", strokeWidth: 50, strokeOpacity: 0.2 }}
          />
          <Area
            type="natural"
            dataKey="total"
            stroke="#67e8f9"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TotalSalesChart
