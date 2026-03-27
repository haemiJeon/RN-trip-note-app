import { api } from '@/api'
import { RequestCreateType, ResponseTripListType } from '@/types/tripType'
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

export const useCreateTrip = () => {
  const queries = useQueryClient()

  return useMutation({
    mutationFn: async (body: RequestCreateType) => {
      const res = await api.post('/trips', body)
      return res.data
    },
    onSuccess: () => {
      queries.invalidateQueries({ queryKey: ['trip-list'] })
    },
  })
}

export const useGetTripList = () => {
  return useInfiniteQuery({
    queryKey: ['trip-list'],
    queryFn: async ({ pageParam }): Promise<ResponseTripListType> => {
      const res = await api.get('/trips', {
        params: { page: pageParam },
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
  })
}
