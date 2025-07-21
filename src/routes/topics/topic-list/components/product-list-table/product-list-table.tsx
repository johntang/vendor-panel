import { PencilSquare, Trash } from "@medusajs/icons"
import { Button, Container, Heading, toast, usePrompt } from "@medusajs/ui"
import { keepPreviousData } from "@tanstack/react-query"
import { createColumnHelper } from "@tanstack/react-table"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Link, Outlet } from "react-router-dom"

import { HttpTypes } from "@medusajs/types"
import { ActionMenu } from "../../../../../components/common/action-menu"
import { _DataTable } from "../../../../../components/table/data-table"
import { useDeleteProduct } from "../../../../../hooks/api/products"
import { useDeleteTopic, useTopics } from "../../../../../hooks/api/topics"
import { useTopicTableColumns } from "../../../../../hooks/table/columns/use-topic-table-columns"
import { useProductTableFilters } from "../../../../../hooks/table/filters/use-product-table-filters"
import { useProductTableQuery } from "../../../../../hooks/table/query/use-product-table-query"
import { useDataTable } from "../../../../../hooks/use-data-table"

export const PAGE_SIZE = 20

export const TopicListTable = () => {
  const { t } = useTranslation()

  const { searchParams, raw } = useProductTableQuery({
    pageSize: PAGE_SIZE,
  })

  const { topics, count, isLoading, isError, error } = useTopics(
    {
      limit: searchParams.limit,
      offset: searchParams.offset,
      fields: "id,name,created_at,image",
    },
    {
      placeholderData: keepPreviousData,
    }
  )

  const filters = useProductTableFilters()
  const columns = useColumns()

  const { table } = useDataTable({
    data: (topics ?? []) as any[],
    columns,
    count,
    enablePagination: true,
    pageSize: PAGE_SIZE,
    getRowId: (row) => row?.id || "",
  })

  if (isError) {
    throw error
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Topics</Heading>
        <div className="flex items-center justify-center gap-x-2">
          <Button size="small" variant="secondary" asChild>
            <Link to="create">{t("actions.create")}</Link>
          </Button>
        </div>
      </div>
      <_DataTable
        table={table}
        columns={columns}
        count={count}
        pageSize={PAGE_SIZE}
        filters={filters}
        search
        pagination
        isLoading={isLoading}
        queryObject={raw}
        navigateTo={(row) => `${row.original.id}`}
        orderBy={[
          { key: "title", label: t("fields.title") },
          {
            key: "created_at",
            label: t("fields.createdAt"),
          },
          {
            key: "updated_at",
            label: t("fields.updatedAt"),
          },
        ]}
        noRecords={{
          message: t("products.list.noRecordsMessage"),
        }}
      />
      <Outlet />
    </Container>
  )
}

const TopicActions = ({ topic }: { topic: any }) => {
  const { t } = useTranslation()
  const prompt = usePrompt()
  const { mutateAsync } = useDeleteTopic(topic.id)

  const handleDelete = async () => {
    const res = await prompt({
      title: t("general.areYouSure"),
      description: `You are about to delete the topic ${topic.name}. This action cannot be undone.`,
      confirmText: t("actions.delete"),
      cancelText: t("actions.cancel"),
    })

    if (!res) {
      return
    }

    await mutateAsync(undefined, {
      onSuccess: () => {
        toast.success(t("products.toasts.delete.success.header"), {
          description: t("products.toasts.delete.success.description", {
            title: topic.title,
          }),
        })
      },
      onError: (e) => {
        toast.error(t("products.toasts.delete.error.header"), {
          description: e.message,
        })
      },
    })
  }

  return (
    <ActionMenu
      groups={[
        {
          actions: [
            {
              icon: <PencilSquare />,
              label: t("actions.edit"),
              to: `/products/${topic.id}/edit`,
            },
          ],
        },
        {
          actions: [
            {
              icon: <Trash />,
              label: t("actions.delete"),
              onClick: handleDelete,
            },
          ],
        },
      ]}
    />
  )
}

const columnHelper = createColumnHelper<any>()

const useColumns = () => {
  const base = useTopicTableColumns()

  const columns = useMemo(
    () => [
      ...base,
      columnHelper.display({
        id: "actions",
        cell: ({ row }) => {
          return <TopicActions topic={row.original} />
        },
      }),
    ],
    [base]
  )

  return columns
}
