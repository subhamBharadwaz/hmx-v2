"use client"

import { FC } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "react-hook-form"
import * as z from "zod"

const FormSchema = z.object({
  orderStatus: z.string({
    required_error: "Please select an order status.",
  }),
})

interface UpdateOrderStatusProps {
  accessToken: string | undefined
  orderId: string
  orderStatus: string | undefined
}

export const UpdateOrderStatus: FC<UpdateOrderStatusProps> = ({
  accessToken,
  orderId,
  orderStatus,
}) => {
  const queryClient = useQueryClient()

  const adminUpdateOrderStatusMutation = useMutation({
    mutationFn: async (orderStatus: string) => {
      if (accessToken) {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/orders/${orderId}`,
          { orderStatus },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        return await res?.data.user
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["order", orderId])
    },
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      orderStatus: orderStatus,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (orderStatus === "Delivered") {
      toast({
        title: "Order is already marked for delivered",
        description: "Can't change the order status after being delivered.",
        variant: "destructive",
      })
    } else {
      adminUpdateOrderStatusMutation.mutate(data.orderStatus)
      toast({
        title: "Order Status Updated Successfully",
        variant: "success",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="orderStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="Out for delivery">
                    Out for delivery
                  </SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Update the order status</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update</Button>
      </form>
    </Form>
  )
}
