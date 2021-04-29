import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts'
import { Link, useLocation } from 'react-router-dom'
import LinkMU from '@material-ui/core/Link'
import { login, registration } from '../../api/userAPI'

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
  const isLogin = location.pathname === LOGIN_ROUTE

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const signUpOrsignIn = async () => {
    let user
    if (isLogin) {
      user = await login(userName, password)
    } else {
      user = await registration(userName, password)
    }
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
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
          {!isLogin && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="сonfirm-password"
              label="Сonfirm password"
              type="password"
              id="сonfirm-password"
              autoComplete="current-password"
            />
          )}
          <Button
            onClick={signUpOrsignIn}
            type="submit"
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
                <Link to={REGISTRATION_ROUTE}>
                  <LinkMU>Don't have an account? Registration</LinkMU>
                </Link>
              </Grid>
            </Grid>
          )}
        </form>
      </div>
    </Container>
  )
}

export default Login
