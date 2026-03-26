import { theme } from '@/constants/theme'
import { AntDesign } from '@expo/vector-icons'
import { Pressable, PressableProps, StyleSheet } from 'react-native'

const PlusButton = ({ ...props }: PressableProps) => {
  return (
    <Pressable style={styles.createButton} {...props}>
      <AntDesign name='plus' size={24} color='white' />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  createButton: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default PlusButton
