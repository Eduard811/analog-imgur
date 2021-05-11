import { useState } from 'react'
import { Dialog, DialogContent, TextField, Button, DialogActions } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { useActions } from '../../hooks/useActions'
import { createPost } from '../../api/postAPI'
import { useTypedSelector } from '../../hooks/useTypedSelector'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      display: 'none',
    },
    inputWrap: {
      marginTop: 15,
    },
    button: {
      display: 'flex',
      width: '100%',
      height: 200,
      '@media (max-width: 1279px)': {
        display: 'none',
      },
    },
    buttonM: {
      display: 'none',
      '@media (max-width: 1279px)': {
        display: 'inline-block',
      },
    },
  })
)

const NewPost = () => {
  const { limit } = useTypedSelector((state) => state.post)
  const { user } = useTypedSelector((state) => state.user)
  const { newPost } = useTypedSelector((state) => state.home)
  const { fetchPostsAC, toggleNewPost } = useActions()
  const classes = useStyles()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState('')
  const [drag, setDrag] = useState(false)

  const closeNewPost = () => {
    toggleNewPost(false)
    setDrag(false)
    setTimeout(() => {
      setTitle('')
      setDescription('')
      setFile('')
    }, 300)
  }

  const dragStartHandler = (e: any) => {
    e.preventDefault()
    setDrag(true)
  }

  const dragLeaveHandler = (e: any) => {
    e.preventDefault()
    setDrag(false)
  }

  const onDropHandler = (e: any) => {
    e.preventDefault()
    setDrag(false)
    setFile(e.dataTransfer.files[0])
  }

  const selectFile = (e: any) => setFile(e.target.files[0])

  const addPost = () => {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('picture', file)
    formData.append('username', user.username)
    formData.append('date', JSON.stringify(new Date()))

    if (title && description && file) {
      createPost(formData)
        .then(() => {
          setTitle('')
          setDescription('')
          setFile('')
          fetchPostsAC(1, limit)
          toggleNewPost(false)
          alert('post added')
        })
        .catch((error) => {
          toggleNewPost(false)
          alert(error.response.data.message)
        })
    } else {
      alert('заполните все поля')
    }
  }

  return (
    <Dialog open={newPost} onClose={closeNewPost} aria-labelledby="form-dialog-title">
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
            <Button
              onDragStart={(e: any) => dragStartHandler(e)}
              onDragLeave={(e: any) => dragLeaveHandler(e)}
              onDragOver={(e: any) => dragStartHandler(e)}
              onDrop={(e: any) => onDropHandler(e)}
              className={classes.button}
              variant="outlined"
              color="primary"
              component="span"
            >
              {drag ? 'Drop the file' : file ? 'File added' : 'Choose Photo/Video or drag and drop'}
            </Button>
            <Button className={classes.buttonM} variant="contained" color="primary" component="span">
              {file ? 'File added' : 'Choose Photo/Video'}
            </Button>
          </label>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeNewPost} color="primary">
          Сancel
        </Button>
        <Button onClick={addPost} color="primary">
          Сreate
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NewPost
