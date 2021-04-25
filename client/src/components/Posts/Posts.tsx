import React, { useEffect } from 'react'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'

const Posts: React.FC = () => {
  const { posts, isLoading, error } = useTypedSelector((state) => state.post)
  const { fetchPost } = useActions()

  useEffect(() => {
    fetchPost()
  }, [])

  if (isLoading) {
    return <h1>Идет загрузка...</h1>
  }

  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <div>
      {posts.map((post) => (
        <div>{post.title}</div>
      ))}
    </div>
  )
}

export default Posts
