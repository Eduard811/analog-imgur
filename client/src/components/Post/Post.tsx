import React, { useEffect } from 'react'
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 676,
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
)

const Post: React.FC = () => {
  const classes = useStyles()
  const { id } = useParams<{ id: string }>()
  const { fetchPostAC } = useActions()
  const { post, isLoading } = useTypedSelector((state) => state.post)
  const { user } = useTypedSelector((state) => state.user)

  useEffect(() => {
    fetchPostAC(id)
  }, [])

  if (isLoading) {
    return <h1>идет загрузка</h1>
  }

  let i
  let format

  if (!!post.picture) {
    i = post.picture.indexOf('.')
    format = i === -1 ? post.picture : post.picture.slice(i)
  }

  return (
    <MainContainer>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              alt={post.username}
              src={process.env.REACT_APP_API_URL + post.avatar}
              className={classes.avatar}
            />
          }
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
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </MainContainer>
  )
}

export default Post
