import axios from 'axios'
import { Dispatch } from 'redux'
import { PostAction, PostActionTypes } from '../../types/post'

export const fetchPost = () => async (dispatch: Dispatch<PostAction>) => {
  try {
    dispatch({ type: PostActionTypes.FETCH_POSTS })
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
    dispatch({ type: PostActionTypes.FETCH_POSTS_SUCCESS, payload: response.data })
  } catch (error) {
    dispatch({
      type: PostActionTypes.FETCH_POSTS_ERROR,
      payload: 'Произошла ошибка при загрузке постов',
    })
  }
}
