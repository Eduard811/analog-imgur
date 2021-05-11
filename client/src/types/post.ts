export interface PostState {
  posts: any[]
  isLoading: boolean
  error: null | string
  page: number
  limit: number
  totalCount: number
  post: any
}

export enum PostActionTypes {
  FETCH_POSTS = 'FETCH_POSTS',
  FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS',
  FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR',
  FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS',
  SCROLL_FETCHING = 'SCROLL_FETCHING',
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

export type PostAction =
  | FetchPostsAction
  | FetchPostsSuccessAction
  | FetchPostsErrorAction
  | FetchPostSuccessAction
  | ScrollFetchingAction
