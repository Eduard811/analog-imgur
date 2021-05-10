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
  FETCH_POST = 'FETCH_POST',
  FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS',
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

interface FetchPostAction {
  type: PostActionTypes.FETCH_POST
}

interface FetchPostSuccessAction {
  type: PostActionTypes.FETCH_POST_SUCCESS
  payload: {}
}

export type PostAction =
  | FetchPostsAction
  | FetchPostsSuccessAction
  | FetchPostsErrorAction
  | FetchPostAction
  | FetchPostSuccessAction
