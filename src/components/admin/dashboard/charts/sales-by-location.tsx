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
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip
} from "recharts"
import { useQuery } from "@tanstack/react-query"

const data = [
  {
    name: "Assam",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Bihar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "USA",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "London",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
]

interface TotalSalesChartProps {}

const TotalSalesChart: FC<TotalSalesChartProps> = ({}) => {
  const [date, setDate] = useState<Date>()

  
  // const { data: sales } = useQuery<ISales[]>({
  //   queryKey: ["admin-total-sales"],
  //   queryFn: async () => {
  //     const res = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/sales/${selectedYear}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     )
  //     return await res?.data.salesData
  //   },
  // })
  
  return (
    <div className="w-full space-y-5 rounded-lg border border-slate-100 p-5 shadow-lg shadow-slate-100 dark:border-slate-800 dark:shadow-none md:w-5/12">
      <div className="space-y-3">
        <div className="space-y-1">
          <div className="flex items-center gap-x-5">
            <p className="text-lg font-semibold md:text-xl">Sales By Location</p>
            <p className="text-xs text-slate-500 md:text-sm">This year</p>
          </div>
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
      <ResponsiveContainer className="w-full" height={250}>
      <PieChart>
            <Pie dataKey="total" data={data} fill="#67e8f9" label  />
            <Tooltip />
          </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TotalSalesChart
