import { $host, $authHost } from './index'

export const createPost = async (post: any) => {
  const { data } = await $authHost.post('api/post', post)
  return data
}

export const fetchPosts = async (page: number, limit: number) => {
  const { data } = await $host.get('api/post', { params: { page, limit } })
  return data
}

export const fetchPost = async (id: string) => {
  const { data } = await $host.get(`api/post/${id}`, { responseType: 'json' })
  return data
}
