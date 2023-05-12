import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { UsersProvider } from './contexts/users/users.context'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/theme/theme.context'
import { Provider } from 'react-redux'
import store from './app/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <Provider store={store}>
      <UsersProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UsersProvider>
    </Provider>
  </ThemeProvider>
)
