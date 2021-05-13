import { PostState, PostAction, PostActionTypes } from '../../types/post'

const initialState: PostState = {
  posts: [],
  isLoading: true,
  error: null,
  page: 1,
  limit: 8,
  totalCount: 0,
  post: {},
  isLikeFetch: false,
}

export const postReducer = (state = initialState, action: PostAction): PostState => {
  switch (action.type) {
    case PostActionTypes.FETCH_POSTS:
      return { ...state, isLoading: true }
    case PostActionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: action.payload,
        totalCount: action.totalCount,
        page: 2,
      }
    case PostActionTypes.FETCH_POSTS_ERROR:
      return { ...state, isLoading: false, error: action.payload }
    case PostActionTypes.FETCH_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        post: action.payload,
      }
    case PostActionTypes.SCROLL_FETCHING:
      return {
        ...state,
        isLoading: false,
        posts: [...state.posts, ...action.payload],
        page: state.page + 1,
      }
    case PostActionTypes.LIKE_OR_DISLIKE_FETCH:
      return { ...state, isLikeFetch: true }
    case PostActionTypes.LIKE_OR_DISLIKE_SUCCESS:
      return {
        ...state,
        isLikeFetch: false,
        post: { ...state.post, likes: [...action.likes] },
      }
    default:
      return state
  }
}
