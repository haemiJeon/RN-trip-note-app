import { theme } from '@/constants/theme'
import { TripDetailItemType } from '@/types/tripDetailType'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Image } from 'expo-image'
import { memo } from 'react'
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'

interface TripDetailCardProps {
  item: TripDetailItemType
  handleModal: () => void
}

const TripDetailCard = ({ item, handleModal }: TripDetailCardProps) => {
  const imageUrl =
    Platform.OS === 'android' && item.image
      ? item.image.replace('localhost', '10.0.2.2')
      : item.image

  return (
    <Pressable onPress={() => {}}>
      <Image
        contentFit='cover'
        source={{ uri: imageUrl }}
        style={styles.image}
      />
      <View style={styles.container}>
        <View style={{ gap: 5 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>{String(item.createdAt)}</Text>
        </View>
        <Pressable onPress={handleModal}>
          <AntDesign name='more' size={24} color='black' />
        </Pressable>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 170,
    backgroundColor: theme.colors.gray,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  container: {
    padding: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
  },
  date: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray,
  },
})

export default memo(TripDetailCard)
