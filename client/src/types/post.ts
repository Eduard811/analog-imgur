export interface PostState {
  posts: any[]
  isLoading: boolean
  error: null | string
  page: number
  limit: number
  totalCount: number
  post: any
  isLikeFetch: boolean
}

export enum PostActionTypes {
  FETCH_POSTS = 'FETCH_POSTS',
  FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS',
  FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR',
  FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS',
  SCROLL_FETCHING = 'SCROLL_FETCHING',
  LIKE_OR_DISLIKE_FETCH = 'LIKE_OR_DISLIKE_FETCH',
  LIKE_OR_DISLIKE_SUCCESS = 'LIKE_OR_DISLIKE_SUCCESS',
}

interface FetchPostsAction {
  type: PostActionTypes.FETCH_POSTS
}

interface FetchPostsSuccessAction {
  type: PostActionTypes.FETCH_POSTS_SUCCESS
  payload: any[]
  totalCount: number
}

interface FetchPostsErrorAction {
  type: PostActionTypes.FETCH_POSTS_ERROR
  payload: string
}

interface FetchPostSuccessAction {
  type: PostActionTypes.FETCH_POST_SUCCESS
  payload: {}
}

interface ScrollFetchingAction {
  type: PostActionTypes.SCROLL_FETCHING
  payload: any[]
}

interface LikeOrDislikeFetchAction {
  type: PostActionTypes.LIKE_OR_DISLIKE_FETCH
}

interface LikeOrDislikeSuccessAction {
  type: PostActionTypes.LIKE_OR_DISLIKE_SUCCESS
  likes: any[]
}

export type PostAction =
  | FetchPostsAction
  | FetchPostsSuccessAction
  | FetchPostsErrorAction
  | FetchPostSuccessAction
  | ScrollFetchingAction
  | LikeOrDislikeFetchAction
  | LikeOrDislikeSuccessAction
