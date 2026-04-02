import Button from '@/components/Button'
import Input from '@/components/Input'
import { theme } from '@/constants/theme'
import { useGetTripDetail, useUpdateTripDetail } from '@/hooks/useTripDetail'
import Entypo from '@expo/vector-icons/Entypo'
import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const UpdateTripDetailScreen = () => {
  const { tripDetailId } = useLocalSearchParams()
  const router = useRouter()

  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [title, setTitle] = useState<string | null>(null)
  const [content, setContent] = useState<string | null>(null)
  const [weatherData, setWeatherData] = useState('')

  const { data: tripDetailInfo } = useGetTripDetail(tripDetailId as string)
  const { mutateAsync: updateTripDetail } = useUpdateTripDetail()

  useEffect(() => {
    if (tripDetailInfo) {
      setTitle(tripDetailInfo.title)
      setContent(tripDetailInfo.content)
      setWeatherData(tripDetailInfo.weather)
      setImageUrl(tripDetailInfo.image)
    }
  }, [tripDetailInfo])

  const updateTrip = async () => {
    await updateTripDetail(
      {
        tripDetailId: tripDetailId as string,
        title: title as string,
        content: content as string,
        image: image as ImagePicker.ImagePickerAsset,
        weather: weatherData ?? '',
      },
      {
        onSuccess: () => {
          router.back()
        },
      },
    )
  }

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!permissionResult.granted) {
      Alert.alert(
        '권한 필요',
        '사진 라이브러리에 접근하려면 권한이 필요합니다.',
        [{ text: '취소', style: 'cancel' }],
      )
      return
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.canceled) {
      setImage(result.assets[0])
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <SafeAreaView edges={['bottom']} style={styles.container}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Pressable onPress={pickImage}>
            {image || imageUrl ? (
              <Image
                source={{
                  uri: !image
                    ? Platform.OS === 'android'
                      ? imageUrl.replace('localhost', '10.0.2.2')
                      : imageUrl
                    : image.uri,
                }}
                style={styles.image}
              />
            ) : (
              <View style={styles.imageContainer}>
                <Entypo name='camera' size={24} color='black' />
                <Text style={styles.imageText}>이미지 추가</Text>
              </View>
            )}
          </Pressable>
          <Input
            label='제목'
            value={title ?? ''}
            onChangeText={(text) => setTitle(text)}
          />
          <Input label='날씨' value={weatherData ?? ''} editable={false} />
          <Input
            label='내용'
            value={content ?? ''}
            style={{
              height: 150,
              paddingVertical: 10,
              textAlignVertical: 'top',
            }}
            onChangeText={(text) => setContent(text)}
            multiline
          />
          <View style={{ marginTop: 'auto' }}>
            <Button label='여행기록 수정' onPress={updateTrip} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  formContainer: {
    gap: 20,
    flexGrow: 1,
  },
  imageContainer: {
    width: '100%',
    height: 150,
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 20,
  },
})

export default UpdateTripDetailScreen
