import { api } from '@/api'
import { ResponseTripDetailList } from '@/types/tripDetailType'
import { UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query'

export const useGetDetailList = (
  tripId: string,
): UseInfiniteQueryResult<{
  pages: ResponseTripDetailList[]
  pageParams: number[]
}> => {
  return useInfiniteQuery({
    queryKey: ['trip-item-list', tripId],
    queryFn: async ({ pageParam }) => {
      const res = await api.get<ResponseTripDetailList>(`/trip-items`, {
        params: {
          page: pageParam,
          tripId,
        },
      })
      return res.data
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.hasNextPage) {
        return lastPage.meta.currentPage + 1
      }
      return undefined
    },
    enabled: !!tripId,
  })
}
