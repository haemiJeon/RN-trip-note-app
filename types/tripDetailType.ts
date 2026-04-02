import { MetaType } from '@/types/commonType'
import * as ImagePicker from 'expo-image-picker'

export interface TripDetailItemType {
  id: string
  title: string
  content: string
  weather: string
  image: string
  createdAt: string | Date
}

export interface ResponseTripDetailList {
  data: TripDetailItemType[]
  meta: MetaType
}

export interface RequestCreateTripDetailType {
  tripId: string
  title: string
  content: string
  weather: string
  image: ImagePicker.ImagePickerAsset
}

export interface RequestUpdateTripDetailType {
  tripDetailId: string
  title: string
  content: string
  weather: string
  image: ImagePicker.ImagePickerAsset
}
