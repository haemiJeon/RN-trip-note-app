import axios from 'axios'
import { Platform } from 'react-native'

// 안드로이드 에뮬레이터에서는 localhost 대신 10.0.2.2를 사용해야 호스트 PC의 서버에 접속할 수 있음
// (만약 실기기라면 PC의 IP 주소(예: 192.168.X.X)를 직접 입력해야 함)
const baseURL =
  Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000'

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})
