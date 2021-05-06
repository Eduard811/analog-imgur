import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Container from '@material-ui/core/Container'
import Fab from '@material-ui/core/Fab'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import Zoom from '@material-ui/core/Zoom'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { useActions } from '../../hooks/useActions'
import { Link } from 'react-router-dom'
import { LOGIN_ROUTE } from '../../utils/consts'
import BadgeAvatars from '../Avatar/Avatar'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

interface Props {
  window?: () => Window
  children?: React.ReactElement
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    appBar: {
      backgroundColor: '#424242',
    },
    wrap: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
    },
    customButton: {
      backgroundColor: '#18ab66',
      '&:hover': {
        backgroundColor: '#139156',
      },
    },
    container: {
      padding: '40px 0',
      display: 'flex',
      justifyContent: 'center',
    },
    link: {
      textDecoration: 'none',
      color: '#fff',
    },
    iconButton: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  })
)

function ScrollTop(props: Props) {
  const { children, window } = props
  const classes = useStyles()
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    )

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  )
}

const MainContainer = (props: Props) => {
  const classes = useStyles()
  const { children } = props
  const { toggleIsOpen, setIsAuth } = useActions()

  const { isAuth } = useTypedSelector((state) => state.user)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const logout = () => {
    localStorage.clear()
    setIsAuth({}, !isAuth)
    setAnchorEl(null)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            onClick={() => toggleIsOpen(true)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.wrap}>
            {isAuth ? (
              <div>
                <IconButton
                  className={classes.iconButton}
                  disableRipple={true}
                  size="small"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <BadgeAvatars />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Avatar</MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <Link className={classes.link} to={LOGIN_ROUTE}>
                <Button color="inherit">Login</Button>
              </Link>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Container>
        <div className={classes.container}>{children}</div>
      </Container>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  )
}

export default MainContainer
