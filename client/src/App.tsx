import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { check } from './api/userAPI'
import AppRouter from './components/AppRouter/AppRouter'
import Navigation from './components/Navigation/Navigation'
import Loader from './components/Loader/Loader'
import { useActions } from './hooks/useActions'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { setIsAuth } = useActions()

  useEffect(() => {
    check()
      .then((data) => {
        setIsAuth(data, true)
      })
      .finally(() => setIsLoading(false))
  })

  if (isLoading) {
    return <Loader />
  }

  return (
    <BrowserRouter>
      <AppRouter />
      <Navigation />
    </BrowserRouter>
  )
}

export default App
