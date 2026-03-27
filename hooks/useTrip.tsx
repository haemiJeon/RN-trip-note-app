import { api } from '@/api'
import { RequestCreateType, ResponseTripListType } from '@/types/tripType'
import {
  UseQueryResult,
  useMutation,
  useQuery,
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

export const useGetTripList = (): UseQueryResult<ResponseTripListType> => {
  return useQuery({
    queryKey: ['trip-list'],
    queryFn: async () => {
      const res = await api.get('/trips')
      return res.data
    },
  })
}
