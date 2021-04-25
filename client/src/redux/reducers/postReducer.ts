import { PostState, PostAction, PostActionTypes } from '../../types/post'

const initialState: PostState = {
  posts: [],
  isLoading: false,
  error: null,
}

export const postReducer = (state = initialState, action: PostAction): PostState => {
  switch (action.type) {
    case PostActionTypes.FETCH_POSTS:
      return { ...state, isLoading: true, posts: [] }
    case PostActionTypes.FETCH_POSTS_SUCCESS:
      return { ...state, isLoading: true, posts: action.payload }
    case PostActionTypes.FETCH_POSTS_ERROR:
      return { ...state, isLoading: true, error: action.payload }
    default:
      return state
  }
}
