import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import MainContainer from '../MainContainer/MainContainer'
import Button from '@material-ui/core/Button'
import { LOGIN_ROUTE } from '../../utils/consts'
import Posts from '../Posts/Posts'
import Skeleton from '@material-ui/lab/Skeleton'
import NewPost from '../NewPost/NewPost'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    customButton: {
      backgroundColor: '#18ab66',
      '&:hover': {
        backgroundColor: '#139156',
      },
    },
    postsWrap: {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: 40,
      marginRight: -16,
      marginBottom: -16,
      '@media (max-width: 567px)': {
        marginRight: 0,
      },
    },
    post: {
      marginRight: 16,
      marginBottom: 16,
      '@media (max-width: 567px)': {
        marginRight: 0,
      },
    },
    addPost: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 1088,
      '@media (max-width: 1135px)': {
        maxWidth: 812,
      },
      '@media (max-width: 859px)': {
        maxWidth: 536,
      },
    },
    skeleton: {
      width: 260,
      height: 334,
      borderRadius: 4,
      '@media (max-width: 567px)': {
        width: 'calc(100vw - 16px - 16px)',
      },
    },
  })
)

const Home: React.FC = () => {
  const { posts, isLoading, error, page, limit, totalCount } = useTypedSelector((state) => state.post)
  const { isAuth } = useTypedSelector((state) => state.user)
  const { fetchPostsAC, toggleNewPost, scrollFetchingAC } = useActions()
  const classes = useStyles()
  const history = useHistory()

  const openNewPost = () => toggleNewPost(true)

  useEffect(() => {
    fetchPostsAC(1, limit)
  }, [])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  })

  const scrollHandler = (e: any) => {
    let scrollHeight = e.target.documentElement.scrollHeight //общая высота страницы с учетом скролла
    let scrollTop = e.target.documentElement.scrollTop //текущее положение скролла от верха страницы
    let innerHeight = window.innerHeight // высота видимой области

    if (scrollHeight - (innerHeight + scrollTop) < 100 && posts.length < totalCount) {
      scrollFetchingAC(page, limit)
    }
  }

  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <MainContainer>
      <>
        <div className={classes.root}>
          <div className={classes.addPost}>
            <Button
              onClick={isAuth ? openNewPost : () => history.push(LOGIN_ROUTE)}
              className={classes.customButton}
              variant="contained"
              color="primary"
            >
              New post
            </Button>
          </div>
          {isLoading && posts.length === 0 ? (
            <div className={classes.postsWrap}>
              {Array(limit)
                .fill(0)
                .map((_, index) => (
                  <div className={classes.post} key={index}>
                    <Skeleton animation="wave" variant="rect" className={classes.skeleton} />
                  </div>
                ))}
            </div>
          ) : (
            <div className={classes.postsWrap}>
              {posts.map((post) => (
                <div
                  className={classes.post}
                  key={post._id}
                  onClick={() => history.push(`/post/${post._id}`)}
                >
                  <Posts
                    comments={post.comments}
                    views={post.views}
                    likes={post.likes}
                    title={post.title}
                    picture={process.env.REACT_APP_API_URL + post.picture}
                  />
                </div>
              ))}
              {isLoading &&
                posts.length > 0 &&
                Array(limit)
                  .fill(0)
                  .map((_, index) => (
                    <div className={classes.post} key={index}>
                      <Skeleton animation="wave" variant="rect" className={classes.skeleton} />
                    </div>
                  ))}
            </div>
          )}
        </div>
        <NewPost />
      </>
    </MainContainer>
  )
}

export default Home
