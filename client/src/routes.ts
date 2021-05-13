import Chat from './components/Chat/Chat'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import Post from './components/Post/Post'

import { CHAT_ROUTE, HOME_ROUTE, LOGIN_ROUTE, POST_ROUTE, REGISTRATION_ROUTE } from './utils/consts'

export const authRoutes = [
  {
    path: CHAT_ROUTE,
    Component: Chat,
  },
]

export const publicRoutes = [
  {
    path: HOME_ROUTE,
    Component: Home,
  },
  {
    path: POST_ROUTE,
    Component: Post,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
]
