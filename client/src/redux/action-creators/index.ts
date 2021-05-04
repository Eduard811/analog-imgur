import * as PostActionCreators from './post'
import * as HomeActionCreators from './home'
import * as UserActionCreators from './user'

export default {
  ...PostActionCreators,
  ...HomeActionCreators,
  ...UserActionCreators,
}
