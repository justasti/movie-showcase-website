import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { UsersProvider } from './contexts/users/users.context'
import { MoviesProvider } from './contexts/movies/movies.context'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/theme/theme.context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <UsersProvider>
      <MoviesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MoviesProvider>
    </UsersProvider>
  </ThemeProvider>
)
