import { Dispatch } from 'redux'
import { fetchPosts } from '../../api/postAPI'
import { PostAction, PostActionTypes } from '../../types/post'

export const fetchPost = (page: number, limit: number) => async (dispatch: Dispatch<PostAction>) => {
  try {
    dispatch({ type: PostActionTypes.FETCH_POSTS })
    const response = await fetchPosts(page, limit)
    dispatch({
      type: PostActionTypes.FETCH_POSTS_SUCCESS,
      payload: response.posts,
      totalCount: response.totalCount,
    })
  } catch (error) {
    dispatch({
      type: PostActionTypes.FETCH_POSTS_ERROR,
      payload: 'Произошла ошибка при загрузке постов',
    })
  }
}
