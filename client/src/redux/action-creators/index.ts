import * as PostActionCreators from './post'
import * as HomeActionCreators from './home'

export default {
  ...PostActionCreators,
  ...HomeActionCreators,
}
