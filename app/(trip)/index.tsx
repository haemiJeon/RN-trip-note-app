import Modal from '@/components/Modal'
import PlusButton from '@/components/PlusButton'
import TripCard from '@/components/TripCard'
import { theme } from '@/constants/theme'
import { useDeleteTrip, useGetTripList } from '@/hooks/useTrip'
import { useTripStore } from '@/store/tripStore'
import { useRouter } from 'expo-router'
import { useEffect, useMemo, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function MyTripList() {
  const router = useRouter()
  const {
    cachedTrips,
    actions: { setCachedTrips },
  } = useTripStore((state) => state)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const {
    data: trips,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetTripList()

  const handleOpenModal = (id: string) => {
    setIsOpen(true)
    setSelectedId(id)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
    setSelectedId(null)
  }

  const updateTrip = (tripId: string) => {
    router.navigate({
      pathname: '/updateTrip',
      params: {
        tripId,
      },
    })
    handleCloseModal()
  }

  const { mutateAsync } = useDeleteTrip()
  const removeTrip = (tripId: string) => {
    mutateAsync(tripId, {
      onSuccess: () => {
        handleCloseModal()
      },
    })
  }

  useEffect(() => {
    if (trips?.pages[0]) {
      setCachedTrips(trips.pages[0])
    }
  }, [trips, setCachedTrips])

  const combinedTrips = useMemo(() => {
    if (trips?.pages.length) {
      const data = trips?.pages.flatMap((page) => page.data) ?? []
      const meta = trips?.pages[0].meta
      return { data, meta }
    }
    if (cachedTrips) {
      return { data: cachedTrips.data, meta: cachedTrips.meta }
    }
    return { data: [], meta: undefined }
  }, [trips, cachedTrips])

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>내 여행</Text>
      <BannerAd
        unitId={TestIds.ADAPTIVE_BANNER}
        size={BannerAdSize.LARGE_BANNER}
      />
      <FlatList
        style={{ flex: 1 }}
        data={combinedTrips.data}
        contentContainerStyle={{ paddingBottom: 100 }}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TripCard
            key={item.id}
            id={item.id}
            title={item.title}
            startDate={item.startDate}
            endDate={item.endDate}
            handleOpenModal={handleOpenModal}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: 'center' }}>여행을 추가해 주세요.</Text>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
      <View style={styles.buttonContainer}>
        <PlusButton onPress={() => router.navigate('/createTrip')} />
      </View>
      <Modal
        selectedId={selectedId}
        isOpen={isOpen}
        closeModal={handleCloseModal}
        updateTrip={updateTrip}
        removeTrip={removeTrip}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: theme.fonts.bold,
    marginBottom: 30,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
})
