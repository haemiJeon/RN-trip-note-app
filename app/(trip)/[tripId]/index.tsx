import Modal from '@/components/Modal'
import PlusButton from '@/components/PlusButton'
import TripDetailCard from '@/components/TripDetailCard'
import { theme } from '@/constants/theme'
import { useDeleteTripDetail, useGetDetailList } from '@/hooks/useTripDetail'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useMemo, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads'
import { SafeAreaView } from 'react-native-safe-area-context'

const TripDetailListScreen = () => {
  const { tripId } = useLocalSearchParams()
  const router = useRouter()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const {
    data: tripDetailList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetDetailList(String(tripId))

  const { mutateAsync: deleteTripDetail } = useDeleteTripDetail()

  const combinedTripDetailList = useMemo(() => {
    const data = tripDetailList?.pages.flatMap((page) => page.data)
    const meta = tripDetailList?.pages[0].meta
    return {
      data: data ?? [],
      meta: meta ?? undefined,
    }
  }, [tripDetailList])

  const handleCloseModal = () => {
    setIsOpen(false)
    setSelectedId(null)
  }

  const onUpdateTripDetail = (id: string) => {
    router.navigate({
      pathname: '/(trip)/[tripId]/updateTripDetail',
      params: {
        tripId: tripId as string,
        tripDetailId: id,
      },
    })
    handleCloseModal()
  }

  const onDeleteTripDetail = (id: string) => {
    deleteTripDetail(id, {
      onSuccess: () => {
        handleCloseModal()
      },
    })
  }

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <FlatList
        data={combinedTripDetailList.data ?? []}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const pageSize = combinedTripDetailList.meta?.limit ?? 10
          const totalItems = combinedTripDetailList.data.length
          const isLastItemOfPage = (index + 1) % pageSize === 0
          const isLastItem = index === totalItems - 1
          const isLessThanOnePage = totalItems < pageSize
          const isShowAd = isLastItemOfPage || (isLessThanOnePage && isLastItem)

          return (
            <>
              <TripDetailCard
                item={item}
                handleModal={() => {
                  setSelectedId(item.id)
                  setIsOpen(true)
                }}
                goDetail={() => {
                  router.navigate({
                    pathname: '/(trip)/[tripId]/[tripDetailId]',
                    params: {
                      tripId: tripId as string,
                      tripDetailId: item.id,
                    },
                  })
                }}
              />
              {isShowAd && (
                <View>
                  <BannerAd
                    unitId={TestIds.ADAPTIVE_BANNER}
                    size={BannerAdSize.LARGE_BANNER}
                  />
                </View>
              )}
            </>
          )
        }}
        ListEmptyComponent={() => (
          <Text
            style={{
              marginTop: 50,
              textAlign: 'center',
              color: theme.colors.gray,
            }}
          >
            여행 기록을 추가해주세요.
          </Text>
        )}
        contentContainerStyle={{ gap: 10 }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
      <View style={styles.plusButtonContainer}>
        <PlusButton
          onPress={() => router.navigate(`/${tripId}/createTripDetail`)}
        />
      </View>
      <Modal
        isOpen={isOpen}
        selectedId={selectedId}
        closeModal={handleCloseModal}
        updateTrip={onUpdateTripDetail}
        removeTrip={onDeleteTripDetail}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  plusButtonContainer: {
    alignItems: 'flex-end',
  },
})

export default TripDetailListScreen
