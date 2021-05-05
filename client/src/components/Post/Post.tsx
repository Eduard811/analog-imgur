import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    width: 260,
  },
  media: {
    height: 260,
  },
})

interface Props {
  title: string
  description: string
  picture: string
}

const Post = ({ description, picture, title }: Props) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={picture} title={title} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default Post
