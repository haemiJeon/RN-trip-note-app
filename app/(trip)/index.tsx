import { useState } from 'react'
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const MyTripList = () => {
  const [inputValue, setInputValue] = useState('')

  return (
    <SafeAreaView>
      <ScrollView horizontal>
        <View style={{ width: 300, height: 300, backgroundColor: 'blue' }} />
        <View style={{ width: 300, height: 300, backgroundColor: 'red' }} />
        <View style={{ width: 300, height: 300, backgroundColor: 'black' }} />
        <View style={{ width: 300, height: 300, backgroundColor: 'yellow' }} />
      </ScrollView>

      <Pressable
        onPress={() => console.log('press')}
        onPressIn={() => console.log('in')}
        onPressOut={() => console.log('out')}
      >
        <Text>버튼</Text>
      </Pressable>

      <View>
        <TextInput
          keyboardType='email-address'
          style={{ width: 200, height: 40, borderWidth: 1 }}
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />
        <Text>{inputValue}</Text>
      </View>
    </SafeAreaView>
  )
}

export default MyTripList
