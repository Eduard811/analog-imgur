import { Dispatch } from 'redux'
import { fetchPosts, fetchPost, likeOrDislike } from '../../api/postAPI'
import { PostAction, PostActionTypes } from '../../types/post'
import { UserAction, UserActionTypes } from '../../types/user'

export const fetchPostsAC = (page: number, limit: number) => async (dispatch: Dispatch<PostAction>) => {
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

export const fetchPostAC = (id: string) => async (dispatch: Dispatch<PostAction>) => {
  try {
    dispatch({ type: PostActionTypes.FETCH_POSTS })
    const response = await fetchPost(id)
    dispatch({
      type: PostActionTypes.FETCH_POST_SUCCESS,
      payload: response,
    })
  } catch (error) {
    dispatch({
      type: PostActionTypes.FETCH_POSTS_ERROR,
      payload: 'Произошла ошибка при загрузке поста',
    })
  }
}

export const scrollFetchingAC = (page: number, limit: number) => async (dispatch: Dispatch<PostAction>) => {
  try {
    dispatch({ type: PostActionTypes.FETCH_POSTS })
    const response = await fetchPosts(page, limit)
    dispatch({
      type: PostActionTypes.SCROLL_FETCHING,
      payload: response.posts,
    })
  } catch (error) {
    dispatch({
      type: PostActionTypes.FETCH_POSTS_ERROR,
      payload: 'Произошла ошибка при загрузке постов',
    })
  }
}

export const likeOrDislikeAC = (id: string) => async (dispatch: Dispatch<PostAction | UserAction>) => {
  try {
    dispatch({ type: PostActionTypes.LIKE_OR_DISLIKE_FETCH })
    const { likes, favoritePosts } = await likeOrDislike(id)
    dispatch({ type: PostActionTypes.LIKE_OR_DISLIKE_SUCCESS, likes })
    dispatch({ type: UserActionTypes.ADD_OR_DELETE_FAVORITE_POSTS, favoritePosts })
  } catch (error) {
    dispatch({
      type: PostActionTypes.FETCH_POSTS_ERROR,
      payload: 'Произошла ошибка при лайке или дизлайке',
    })
  }
}
