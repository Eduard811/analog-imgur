import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MainContainer from '../MainContainer/MainContainer'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import Loader from '../Loader/Loader'
import { likeOrDislike } from '../../api/postAPI'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: 676,
    },
    card: {
      marginTop: 15,
      width: '100%',
    },
  })
)

const Post: React.FC = () => {
  const classes = useStyles()
  const { id } = useParams<{ id: string }>()
  const { fetchPostAC, likeOrDislikeAC } = useActions()
  const { post, isLoading, isLikeFetch } = useTypedSelector((state) => state.post)

  useEffect(() => {
    fetchPostAC(id)
  }, [])

  let i
  let format

  if (!!post.picture) {
    i = post.picture.indexOf('.')
    format = i === -1 ? post.picture : post.picture.slice(i)
  }

  const onLikeHandler = () => {
    likeOrDislikeAC(id)
  }

  return (
    <MainContainer>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={classes.root}>
          <Typography variant="h5" component="h1">
            {post.title}
          </Typography>
          <Card className={classes.card}>
            <CardHeader
              avatar={<Avatar alt={post.username} src={process.env.REACT_APP_API_URL + post.avatar} />}
              title={post.username}
              subheader={post.date}
            />
            <CardMedia
              component={format !== '.mp4' ? 'img' : 'video'}
              image={process.env.REACT_APP_API_URL + post.picture}
              title="Paella dish"
              controls
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {post.description}
              </Typography>
            </CardContent>
            <CardActions>
              {isLikeFetch ? (
                <IconButton disabled>
                  <FavoriteIcon />
                </IconButton>
              ) : (
                <IconButton color={post.isLike ? 'secondary' : 'default'} onClick={onLikeHandler}>
                  <FavoriteIcon />
                </IconButton>
              )}
              <Typography color="textSecondary" component="span">
                {post.likes && post.likes.length}
              </Typography>
            </CardActions>
          </Card>
        </div>
      )}
    </MainContainer>
  )
}

export default Post
