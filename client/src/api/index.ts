import axios, { AxiosRequestConfig } from 'axios'

//для обычных запросов которые не требуют авторизации
const $host = axios.create({
  baseURL: 'http://localhost:5000',
})

//будет подставлятся header authorization и туда будет добавлятся токен
const $authHost = axios.create({
  baseURL: 'http://localhost:5000',
})

const authInterceptor = (config: AxiosRequestConfig) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}

$authHost.interceptors.request.use(authInterceptor)

export { $host, $authHost }
