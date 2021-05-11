import { $host, $authHost } from './index'
import jwt_decode from 'jwt-decode'

export const registration = async (username: string, password: string) => {
  const { data } = await $host.post('api/auth/registration', { username, password })
  localStorage.setItem('token', data.token)
  const token = jwt_decode(data.token)
  const avatar = data.avatar

  return { token, avatar }
}

export const login = async (username: string, password: string) => {
  const { data } = await $host.post('api/auth/login', { username, password })
  localStorage.setItem('token', data.token)
  const token = jwt_decode(data.token)
  const avatar = data.avatar

  return { token, avatar }
}

export const check = async () => {
  const { data } = await $authHost.get('api/auth/check')
  localStorage.setItem('token', data.token)
  const token = jwt_decode(data.token)
  const avatar = data.avatar

  return { token, avatar }
}

export const updateAvatar = async (avatar: any) => {
  const { data } = await $authHost.put('api/auth/avatar', avatar)
  return { data }
}
