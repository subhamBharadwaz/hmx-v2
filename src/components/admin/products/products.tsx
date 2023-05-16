'use client'


import { FC } from 'react'
import {  columns } from "@/components/admin/products/columns"
import { DataTable } from "@/components/admin/products/data-table"
import { useGetAdminProductsQuery } from '@/store/services/admin/products'
import { IProduct } from '@/types'
import { useGetWishlistQuery } from '@/store/services/wishlist'
import { useGetUserQuery } from '@/store/services/user'


const Products: FC= () => {

    const {data,isSuccess} = useGetAdminProductsQuery({})
    console.log({data})
    const products:IProduct[] = data

    return (
        // <DataTable columns={columns} data={products} />
        <div>hello</div>
    )
}

export default Products