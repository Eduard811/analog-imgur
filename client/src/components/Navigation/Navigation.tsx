import React, { useState } from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { Link } from 'react-router-dom'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setIsOpen(open)
  }
  return (
    <SwipeableDrawer open={isOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/chat">Chat</Link>
          </li>
        </ul>
      </nav>
    </SwipeableDrawer>
  )
}

export default Navigation
