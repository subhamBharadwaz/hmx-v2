"use client"

import { FC } from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import {
  CreateAddressInput,
  createAddressSchema,
} from "@/lib/validations/address"
import { useStore } from "@/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

interface AddressFormProps {}

const AddressForm: FC<AddressFormProps> = ({}) => {
  const { address, setAddress } = useStore()

  const form = useForm<CreateAddressInput>({
    resolver: zodResolver(createAddressSchema),
    defaultValues: {
      firstName: address?.firstName,
      lastName: address?.lastName,
      country: address?.country,
      houseNo: address?.houseNo,
      streetName: address?.streetName,
      landMark: address?.landMark,
      state: address?.state,
      city: address?.city,
      postalCode: address?.postalCode,
      phoneNumber: address?.phoneNumber,
    },
  })
  const { toast } = useToast()

  async function onSubmit(values: CreateAddressInput) {
    setAddress(values)
    toast({
      description: "Address updated successfully.",
    })
  }

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="India" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="houseNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>House Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter the house no." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="streetName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the street name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="landMark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Land Mark</FormLabel>
              <FormControl>
                <Input placeholder="Enter land mark" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full items-center justify-between gap-x-3 space-y-4 lg:flex">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter city name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter state name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PIN Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter PIN code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" size="lg" type="submit">
          {address ? "Update" : "Add"} Address
        </Button>
      </form>
    </Form>
  )
}

export default AddressForm
