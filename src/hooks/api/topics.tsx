import { FetchError } from "@medusajs/js-sdk"
import { HttpTypes, PaginatedResponse } from "@medusajs/types"
import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query"
import { fetchQuery } from "../../lib/client/index.ts"
import { queryClient } from "../../lib/query-client.ts"
import { queryKeysFactory } from "../../lib/query-key-factory.ts"
import productsImagesFormatter from "../../utils/products-images-formatter.ts"

const TOPICS_QUERY_KEY = "topics" as const
export const topicsQueryKeys = queryKeysFactory(TOPICS_QUERY_KEY)

export const useProduct = (
  id: string,
  query?: Record<string, any>,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminProductResponse,
      FetchError,
      HttpTypes.AdminProductResponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () =>
      fetchQuery(`/vendor/topics/${id}`, {
        method: "GET",
        query: query as { [key: string]: string | number },
      }),
    queryKey: topicsQueryKeys.detail(id),
    ...options,
  })

  return {
    ...data,
    product: productsImagesFormatter(data?.product),
    ...rest,
  }
}

export const useTopics = (
  query?: Record<string, any>,
  options?: Omit<
    UseQueryOptions<
      PaginatedResponse<{
        topics: any
      }>,
      FetchError,
      PaginatedResponse<{
        topics: any
      }>,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () =>
      fetchQuery("/vendor/topics", {
        method: "GET",
        query: query as Record<string, string | number>,
      }),
    queryKey: topicsQueryKeys.list(),
    ...options,
  })

  return {
    ...data,
    ...rest,
  }
}

export const useCreateTopic = (
  options?: UseMutationOptions<any, FetchError, any>
) => {
  return useMutation({
    mutationFn: async (payload) =>
      await fetchQuery("/vendor/topics", {
        method: "POST",
        body: payload,
      }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: topicsQueryKeys.lists(),
      })
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useUpdateTopic = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminProductResponse,
    FetchError,
    { id: string; name: string; image: string }
  >
) => {
  return useMutation({
    mutationFn: async (payload) => {
      return fetchQuery(`/vendor/topics/${id}`, {
        method: "POST",
        body: {
          name: payload.name,
          image: payload.image,
        },
      })
    },
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: topicsQueryKeys.lists(),
      })
      await queryClient.invalidateQueries({
        queryKey: topicsQueryKeys.detail(id),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useDeleteTopic = (
  id: string,
  options?: UseMutationOptions<any, FetchError, void>
) => {
  return useMutation({
    mutationFn: () =>
      fetchQuery(`/vendor/topics/${id}`, {
        method: "DELETE",
      }),
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({
        queryKey: topicsQueryKeys.lists(),
      })
      queryClient.invalidateQueries({
        queryKey: topicsQueryKeys.detail(id),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}
