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
  })
)

const NewPost = () => {
  const { page, limit } = useTypedSelector((state) => state.post)
  const { newPost } = useTypedSelector((state) => state.home)
  const { fetchPost, toggleNewPost } = useActions()
  const classes = useStyles()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState('')

  const closeNewPost = () => {
    toggleNewPost(false)
    setTimeout(() => {
      setTitle('')
      setDescription('')
      setFile('')
    }, 300)
  }

  const [drag, setDrag] = useState(false)

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
    setFile(e.dataTransfer.files[0])
  }

  const selectFile = (e: any) => setFile(e.target.files[0])

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
          fetchPost(page, limit)
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
            <Button variant="contained" color="primary" component="span">
              Choose Photo/Video
            </Button>
          </label>
        </div>
        {drag ? (
          <div
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
            onDrop={(e) => onDropHandler(e)}
          >
            {file ? 'Файл добавлен' : 'Отпустите файлы что бы загрузить их'}
          </div>
        ) : (
          <div
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
          >
            Перетащите файлы что бы загрузить их
          </div>
        )}
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
