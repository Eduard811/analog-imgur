import Admin from './components/Admin/Admin'
import Chat from './components/Chat/Chat'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Post from './components/Post/Post'
import Registration from './components/Registration/Registration'
import {
  ADMIN_ROUTE,
  CHAT_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  POST_ROUTE,
  REGISTRATION_ROUTE,
} from './utils/consts'

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
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
    Component: Login,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Registration,
  },
  {
    path: CHAT_ROUTE,
    Component: Chat,
  },
]
