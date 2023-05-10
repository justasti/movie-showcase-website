import { createContext } from 'react'
import { themeReducer } from './theme.reducer'
import { useReducer } from 'react'
import { ColorThemes } from './themes'

const ThemeContext = createContext(null)

export const ThemeProvider = ({ children }) => {
  const currentTheme = localStorage.getItem('theme') || 'dark'
  const [theme, dispatchTheme] = useReducer(
    themeReducer,
    ColorThemes[currentTheme]
  )

  const value = { theme, dispatchTheme }
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeContext
