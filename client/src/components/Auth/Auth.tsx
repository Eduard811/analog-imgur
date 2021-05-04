import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts'
import { Link, useLocation } from 'react-router-dom'
import { login, registration } from '../../api/userAPI'
import { useActions } from '../../hooks/useActions'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { useTypedSelector } from '../../hooks/useTypedSelector'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Login: React.FC = () => {
  const classes = useStyles()
  const location = useLocation()
  const history = useHistory()

  const isLogin = location.pathname === LOGIN_ROUTE

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { isAuth } = useTypedSelector((state) => state.user)

  const { setIsAuth } = useActions()

  const signUpOrsignIn = async () => {
    try {
      let user
      if (isLogin) {
        user = await login(username, password)
      } else {
        user = await registration(username, password)
      }
      setIsAuth(user, true)
      history.push(HOME_ROUTE)
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  if (isAuth) {
    history.push(HOME_ROUTE)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLogin ? 'Login' : 'Registration'}
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={signUpOrsignIn}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isLogin ? 'Login' : 'Registration'}
          </Button>
          {isLogin && (
            <Grid container>
              <Grid item>
                <Link to={REGISTRATION_ROUTE}>Don't have an account? Registration</Link>
              </Grid>
            </Grid>
          )}
        </form>
      </div>
    </Container>
  )
}

export default Login
