import { $host, $authHost } from './index'
import jwt_decode from 'jwt-decode'

export const registration = async (username: string, password: string) => {
  const { data } = await $host.post('api/auth/registration', { username, password })
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const login = async (username: string, password: string) => {
  const { data } = await $host.post('api/auth/login', { username, password })
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const check = async () => {
  const { data } = await $authHost.get('api/auth/check')
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}
