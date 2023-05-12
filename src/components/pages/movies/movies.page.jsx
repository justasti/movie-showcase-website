import { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { MovieCard, SkeletonLoader, Input } from '../../'
import { StyledMain, Movies } from './movies-page.styles'
import ThemeContext from '../../../contexts/theme/theme.context'
import UsersContext from '../../../contexts/users/users.context'

const MoviesPage = () => {
  const [filterPhrase, setFilterPhrase] = useState('')
  const { movies } = useSelector((state) => state.movies)
  const {
    users: { authUser, users },
  } = useContext(UsersContext)
  const { theme } = useContext(ThemeContext)

  const filterMovies = (e) => {
    setFilterPhrase(e.target.value)
  }

  const filteredMovies = movies?.filter((movie) => {
    return movie.title.toLowerCase().includes(filterPhrase.toLowerCase())
  })

  return (
    <StyledMain theme={theme}>
      {movies?.length === 0 ? (
        <SkeletonLoader />
      ) : (
        <>
          <h1>
            Find the <span>Best Movies</span> of all times
          </h1>
          <div className='actions_bar'>
            <Input
              type='text'
              placeholder='Search for a movie'
              value={filterPhrase}
              onChange={filterMovies}
            />
            {authUser && (
              <Link className='add_new' to='add'>
                Add New Movie
              </Link>
            )}
          </div>
          <Movies>
            {filteredMovies.map((movie) => {
              const createdBy = users?.find(
                (user) => user.id === movie.createdBy
              )
              return (
                !createdBy?.isRestricted && (
                  <Link to={movie.id} key={movie.id}>
                    <MovieCard movie={movie} />
                  </Link>
                )
              )
            })}
          </Movies>
        </>
      )}
    </StyledMain>
  )
}
export default MoviesPage
