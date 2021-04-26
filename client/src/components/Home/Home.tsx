import React, { useEffect } from 'react'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import MainContainer from '../MainContainer/MainContainer'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    customButton: {
      backgroundColor: '#18ab66',
      '&:hover': {
        backgroundColor: '#139156',
      },
    },
  })
)
const Home: React.FC = () => {
  const { posts, isLoading, error } = useTypedSelector((state) => state.post)
  const { fetchPost } = useActions()
  const classes = useStyles()

  useEffect(() => {
    fetchPost()
  }, [])

  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <MainContainer>
      <div>
        <Button className={classes.customButton} variant="contained" color="primary">
          New post
        </Button>
        {isLoading ? <h1>Идет загрузка...</h1> : posts.map((post) => <div>{post.title}</div>)}
      </div>
    </MainContainer>
  )
}

export default Home
