import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { useHistory } from 'react-router-dom'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import HomeIcon from '@material-ui/icons/Home'
import MailIcon from '@material-ui/icons/Mail'
import { CHAT_ROUTE, HOME_ROUTE } from '../../utils/consts'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
})

const Navigation = () => {
  const { isOpen } = useTypedSelector((state) => state.home)
  const { toggleIsOpen } = useActions()
  const classes = useStyles()
  const history = useHistory()

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    toggleIsOpen(open)
  }

  const someEventHandler = (pathname: string) => {
    history.push({ pathname })
    toggleIsOpen(false)
  }

  const list = () => (
    <div className={classes.list} onKeyDown={() => toggleIsOpen(false)}>
      <List>
        <ListItem button onClick={() => someEventHandler(HOME_ROUTE)}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>
        <ListItem button onClick={() => someEventHandler(CHAT_ROUTE)}>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText>Chat</ListItemText>
        </ListItem>
      </List>
    </div>
  )

  return (
    <SwipeableDrawer open={isOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
      <nav>{list()}</nav>
    </SwipeableDrawer>
  )
}

export default Navigation
