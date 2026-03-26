import Input from '@/components/Input'
import { theme } from '@/constants/theme'
import { useCreateTrip } from '@/hooks/useTrip'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from './Button'

const CreateTripScreen = () => {
  const router = useRouter()
  const [title, setTitle] = useState<string>('')
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())

  const { mutateAsync } = useCreateTrip()

  const createTrip = () => {
    mutateAsync(
      {
        title,
        startDate: startDate,
        endDate: endDate,
      },
      {
        onSuccess: () => {
          router.back()
        },
      },
    )
  }

  const handleChangeText = useCallback(
    (text: string) => {
      setTitle(text)
    },
    [title],
  )

  // android ui 렌더링을 위한 코드
  const [showStartDate, setShowStartDate] = useState(false)
  const [showEndDate, setShowEndDate] = useState(false)

  const onChangeStartDate = (event: any, selectedDate?: Date) => {
    setShowStartDate(false)
    if (selectedDate) setStartDate(selectedDate)
  }

  const onChangeEndDate = (event: any, selectedDate?: Date) => {
    setShowEndDate(false)
    if (selectedDate) setEndDate(selectedDate)
  }

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <SafeAreaView edges={['bottom']} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Input label='제목' value={title} onChangeText={handleChangeText} />
          <View>
            <Text style={styles.label}>여행 기간</Text>
            <View>
              <View style={styles.dateContainer}>
                <Text>시작일</Text>
                {Platform.OS === 'ios' ? (
                  <DateTimePicker
                    value={startDate ?? new Date()}
                    mode='date'
                    display='default'
                    locale='ko-KR'
                    onValueChange={onChangeStartDate}
                  />
                ) : (
                  <>
                    <Pressable
                      style={styles.dateButton}
                      onPress={() => setShowStartDate(true)}
                    >
                      <Text style={styles.dateText}>
                        {formatDate(startDate ?? new Date())}
                      </Text>
                    </Pressable>
                    {showStartDate && (
                      <DateTimePicker
                        value={startDate ?? new Date()}
                        mode='date'
                        display='default'
                        locale='ko-KR'
                        onValueChange={onChangeStartDate}
                      />
                    )}
                  </>
                )}
              </View>
              <View style={[styles.dateContainer, { marginTop: 12 }]}>
                <Text>종료일</Text>
                {Platform.OS === 'ios' ? (
                  <DateTimePicker
                    value={endDate ?? new Date()}
                    mode='date'
                    display='default'
                    locale='ko-KR'
                    onValueChange={onChangeEndDate}
                    minimumDate={startDate}
                  />
                ) : (
                  <>
                    <Pressable
                      style={styles.dateButton}
                      onPress={() => setShowEndDate(true)}
                    >
                      <Text style={styles.dateText}>
                        {formatDate(endDate ?? new Date())}
                      </Text>
                    </Pressable>
                    {showEndDate && (
                      <DateTimePicker
                        value={endDate ?? new Date()}
                        mode='date'
                        display='default'
                        locale='ko-KR'
                        onValueChange={onChangeEndDate}
                        minimumDate={startDate}
                      />
                    )}
                  </>
                )}
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button label='여행 생성하기' onPress={createTrip} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    gap: 30,
    flexGrow: 1,
  },
  label: {
    marginBottom: 20,
    fontSize: 18,
    fontFamily: theme.fonts.regular,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.black,
  },
  dateButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  dateText: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.black,
  },
  buttonContainer: {
    marginTop: 'auto',
  },
})

export default CreateTripScreen
