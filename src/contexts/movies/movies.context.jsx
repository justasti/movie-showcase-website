import { createContext, useReducer } from 'react'
import { moviesReducer } from './movies.reducer'

const MoviesContext = createContext(null)

export const MoviesProvider = ({ children }) => {
  const [movies, dispatchMovies] = useReducer(moviesReducer, [])

  const value = { movies, dispatchMovies }
  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  )
}

export default MoviesContext
