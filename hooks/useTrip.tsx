import { api } from '@/api'
import { QUERY_KEYS } from '@/constants/query-keys'
import {
  RequestCreateType,
  ResponseTripListType,
  TripListItemType,
} from '@/types/tripType'
import {
  UseQueryResult,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

export const useCreateTrip = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: RequestCreateType) => {
      const res = await api.post('/trips', body)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TRIP_LIST] })
    },
  })
}

export const useGetTripList = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.TRIP_LIST],
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

export const useGetTrip = (
  tripId: string,
): UseQueryResult<TripListItemType> => {
  return useQuery({
    queryKey: [QUERY_KEYS.TRIP, tripId],
    queryFn: async () => {
      const res = await api.get(`/trips/${tripId}`)
      return res.data
    },
  })
}

export const useUpdateTrip = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: RequestCreateType & { tripId: string }) => {
      const res = await api.patch(`/trips/${body.tripId}`, {
        title: body.title,
        startDate: body.startDate,
        endDate: body.endDate,
      })
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TRIP_LIST] })
    },
  })
}

export const useDeleteTrip = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (tripId: string) => {
      const res = await api.delete(`/trips/${tripId}`)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TRIP_LIST] })
    },
  })
}
