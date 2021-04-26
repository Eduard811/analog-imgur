import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter/AppRouter'
import Navigation from './components/Navigation/Navigation'

const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
      <Navigation />
    </BrowserRouter>
  )
}

export default App
