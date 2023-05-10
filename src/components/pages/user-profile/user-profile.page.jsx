import { useContext, useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { SkeletonLoader, Button, MovieCard } from '../../'
import { StyledMain, UserProfileHeader } from './user-profile.styles'
import { Movies } from '../movies/movies-page.styles'
import MoviesContext from '../../../contexts/movies/movies.context'
import ThemeContext from '../../../contexts/theme/theme.context'
import UsersContext from '../../../contexts/users/users.context'

const UserProfilePage = () => {
  const [user, setUser] = useState(null)
  const [userNotFound, setUserNotFound] = useState(false)
  const { movies } = useContext(MoviesContext)
  const { theme } = useContext(ThemeContext)
  const { id } = useParams()
  const {
    users: { users, authUser },
  } = useContext(UsersContext)

  const filteredMovies = movies.filter((movie) => movie.createdBy === id)

  useEffect(() => {
    if (!users.length) return
    else {
      const existingUser = users.find((user) => user.id === id)
      if (!existingUser) setUserNotFound(true)
      else setUser(existingUser)
    }
  }, [id, users])

  if (userNotFound) {
    return <Navigate to='/404' />
  }
  return (
    <StyledMain theme={theme}>
      {movies.length === 0 || !user ? (
        <SkeletonLoader />
      ) : (
        <>
          <UserProfileHeader>
            <img src={user.avatarUrl} alt={user.username} />
            <h3>
              {user.username} <span>({user.role})</span>
            </h3>
            <h4>{user.email}</h4>
            {(user.id === authUser?.id || authUser?.role === 'admin') &&
              !user.isRestricted && (
                <Link to='edit'>
                  <Button>Edit profile</Button>
                </Link>
              )}
            {user.isRestricted && <p className='blocked_user'>BLOCKED USER</p>}
          </UserProfileHeader>
          <h2>
            Movies by <span>{user.username}</span>
          </h2>
          <Movies>
            {filteredMovies.length !== 0 ? (
              filteredMovies.map((movie) => (
                <Link to={`/movies/${movie.id}`} key={movie.id}>
                  <MovieCard movie={movie} />
                </Link>
              ))
            ) : (
              <p className='add_new'>
                No movies yet!
                {id === authUser?.id && <Link to='/movies/add'>Add one?</Link>}
              </p>
            )}
          </Movies>
        </>
      )}
    </StyledMain>
  )
}
export default UserProfilePage
