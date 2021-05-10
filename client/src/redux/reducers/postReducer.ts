import { PostState, PostAction, PostActionTypes } from '../../types/post'

const initialState: PostState = {
  posts: [],
  isLoading: true,
  error: null,
  page: 1,
  limit: 8,
  totalCount: 0,
  post: {},
}

export const postReducer = (state = initialState, action: PostAction): PostState => {
  switch (action.type) {
    case PostActionTypes.FETCH_POSTS:
      return { ...state, isLoading: true, page: state.page + 1 }
    case PostActionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: [...state.posts, ...action.payload],
        totalCount: action.totalCount,
      }
    case PostActionTypes.FETCH_POSTS_ERROR:
      return { ...state, isLoading: false, error: action.payload }
    case PostActionTypes.FETCH_POST:
      return { ...state, isLoading: true }
    case PostActionTypes.FETCH_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        post: action.payload,
      }
    default:
      return state
  }
}
