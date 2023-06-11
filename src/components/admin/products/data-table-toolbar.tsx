"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table } from "@tanstack/react-table"
import {X} from "lucide-react"

import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { categories,productSections } from "@/constants" 

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}



export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getPreFilteredRowModel().rows.length >
    table.getFilteredRowModel().rows.length


  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter Products by Name..."
          value={
            (table.getColumn("name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("category") && (
          <DataTableFacetedFilter
            column={table.getColumn("category")}
            title="Categories"
            options={categories}
          />
        )}
          {table.getColumn("gender") && (
          <DataTableFacetedFilter
            column={table.getColumn("gender")}
            title="Sections"
            options={productSections}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
