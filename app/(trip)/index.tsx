import { Suspense } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

let userInfo: { name: string; email: string } | null = null
let userPromise: Promise<void> | null = null

function fetchUser() {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      userInfo = {
        name: '홍길동',
        email: 'test@email.com',
      }
      resolve()
    }, 2000)
  })
}

function useUser() {
  if (userInfo) {
    return userInfo
  }
  if (!userPromise) {
    userPromise = fetchUser()
  }
  throw userPromise
}

function UserProfile() {
  const user = useUser()
  return (
    <View>
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
    </View>
  )
}

const MyTripList = () => {
  return (
    <Suspense
      fallback={
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size='large' />
        </View>
      }
    >
      <SafeAreaView>
        <UserProfile />
      </SafeAreaView>
    </Suspense>
  )
}

export default MyTripList
