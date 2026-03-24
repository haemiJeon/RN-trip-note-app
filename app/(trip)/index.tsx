import { useDeferredValue, useMemo, useState } from 'react'
import { FlatList, Text, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function slowFilter(text: string) {
  const result: string[] = []

  for (let i = 0; i < 1500; i++) {
    result.push(`${text} - item ${i}`)
  }

  return result
}

const MyTripList = () => {
  const [textValue, setTextValue] = useState('')

  // @useTransition 방식 (리렌더링을 지연시킴)
  // const [items, setItems] = useState<string[]>([])
  // const [isPending, startTransition] = useTransition()

  // const handleChange = (value: string) => {
  //   setTextValue(value)
  //   startTransition(() => {
  //     setItems(slowFilter(value))
  //   })
  // }

  // @useDeferredValue 방식 (값의 업데이트를 지연시킴)
  const deferredTextValue = useDeferredValue(textValue)

  const items = useMemo(() => {
    if (!deferredTextValue) return []
    return slowFilter(deferredTextValue)
  }, [deferredTextValue])

  const isPending = textValue !== deferredTextValue

  return (
    <SafeAreaView>
      <TextInput
        value={textValue}
        // onChangeText={handleChange}
        onChangeText={setTextValue}
        style={{ height: 50, borderWidth: 1 }}
      />

      {isPending && (
        <Text style={{ color: 'gray' }}>리스트 업데이트 중...</Text>
      )}

      <FlatList
        data={items}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Text style={{ opacity: isPending ? 0.5 : 1 }}>{item}</Text>
        )}
      />
    </SafeAreaView>
  )
}

export default MyTripList
