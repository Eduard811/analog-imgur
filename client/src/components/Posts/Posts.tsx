import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import FavoriteIcon from '@material-ui/icons/Favorite'
import SmsIcon from '@material-ui/icons/Sms'
import VisibilityIcon from '@material-ui/icons/Visibility'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    width: 260,
    '@media (max-width: 567px)': {
      width: 'calc(100vw - 16px - 16px)',
    },
  },
  media: {
    height: 260,
  },
  icon: {
    fontSize: 17,
    marginRight: 3,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  wrapIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  counter: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 13,
  },
})

interface Props {
  title: string
  picture: string
  likes: number
  views: number
  comments: any[]
}

const Posts = ({ picture, title, likes, views, comments }: Props) => {
  const classes = useStyles()

  const i = picture.indexOf('.')
  const format = i === -1 ? picture : picture.slice(i)

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component={format !== '.mp4' ? 'img' : 'video'}
          className={classes.media}
          image={picture}
          title={title}
          autoPlay
          muted
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {title.length > 30 ? title.slice(0, 30) + ' ' + '...' : title}
          </Typography>
          <div className={classes.cardContent}>
            <div className={classes.wrapIcon}>
              <FavoriteIcon color="disabled" className={classes.icon} />
              <Typography className={classes.counter} component="p">
                {likes}
              </Typography>
            </div>
            <div className={classes.wrapIcon}>
              <SmsIcon color="disabled" className={classes.icon} />
              <Typography className={classes.counter} component="p">
                {comments.length}
              </Typography>
            </div>
            <div className={classes.wrapIcon}>
              <VisibilityIcon color="disabled" className={classes.icon} />
              <Typography className={classes.counter} component="p">
                {views}
              </Typography>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default Posts
