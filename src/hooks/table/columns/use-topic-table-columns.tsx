import { createColumnHelper } from "@tanstack/react-table"
import { useMemo } from "react"

const columnHelper = createColumnHelper<any>()

export const useTopicTableColumns = () => {
  return useMemo(
    () => [
      columnHelper.display({
        id: "name",
        header: () => "Name",
        cell: ({ row }) => row.original.name,
      }),
      columnHelper.accessor("collection", {
        header: () => "Image",
        cell: ({ row }) => row.original.image,
      }),
    ],
    []
  )
}
