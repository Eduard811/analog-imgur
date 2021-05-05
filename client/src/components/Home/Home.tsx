import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import MainContainer from '../MainContainer/MainContainer'
import Button from '@material-ui/core/Button'
import { createPost } from '../../api/postAPI'
import { Dialog, DialogContent, TextField, DialogActions } from '@material-ui/core'
import { LOGIN_ROUTE } from '../../utils/consts'
import Post from '../Post/Post'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    customButton: {
      backgroundColor: '#18ab66',
      '&:hover': {
        backgroundColor: '#139156',
      },
    },
    input: {
      display: 'none',
    },
    inputWrap: {
      marginTop: 15,
    },
    postsWrap: {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: 40,
      marginRight: -16,
      marginBottom: -16,
    },
    post: {
      marginRight: 16,
      marginBottom: 16,
    },
  })
)
const Home: React.FC = () => {
  const { posts, isLoading, error } = useTypedSelector((state) => state.post)
  const { isAuth } = useTypedSelector((state) => state.user)
  const { fetchPost } = useActions()
  const classes = useStyles()
  const history = useHistory()

  const [post, setPost] = useState(false)
  const onClickAddPost = () => setPost(!post)

  useEffect(() => {
    fetchPost()
  }, [])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState('')

  const selectFile = (event: any) => setFile(event.target.files[0])

  const addPost = () => {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('picture', file)

    if (title && description && file) {
      createPost(formData)
        .then(() => {
          setTitle('')
          setDescription('')
          setFile('')
          fetchPost()
          setPost(false)
          alert('post added')
        })
        .catch((error) => {
          setPost(false)
          alert(error.response.data.message)
        })
    } else {
      alert('заполните все поля')
    }
  }

  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <MainContainer>
      <>
        <div>
          <Button
            onClick={isAuth ? onClickAddPost : () => history.push(LOGIN_ROUTE)}
            className={classes.customButton}
            variant="contained"
            color="primary"
          >
            New post
          </Button>
          {isLoading ? (
            <h1>Идет загрузка...</h1>
          ) : (
            <div className={classes.postsWrap}>
              {posts.map((post) => (
                <div className={classes.post} key={post._id}>
                  <Post
                    title={post.title}
                    description={post.description}
                    picture={process.env.REACT_APP_API_URL + post.picture}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <Dialog open={post} onClose={onClickAddPost} aria-labelledby="form-dialog-title">
          <DialogContent>
            <TextField
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type="email"
              fullWidth
            />
            <TextField
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              margin="dense"
              id="description"
              label="Description"
              type="email"
              fullWidth
            />
            <div className={classes.inputWrap}>
              <input
                className={classes.input}
                onChange={selectFile}
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Content
                </Button>
              </label>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClickAddPost} color="primary">
              Отмена
            </Button>
            <Button onClick={addPost} color="primary">
              Добавить
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </MainContainer>
  )
}

export default Home
