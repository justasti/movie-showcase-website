import { useEffect, useState, useContext } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate, useParams } from 'react-router-dom'
import { SkeletonLoader, MovieCard } from '../../../'
import { Movies } from '../../movies/movies-page.styles'
import { StyledMain } from './actor-info.styles'
import ThemeContext from '../../../../contexts/theme/theme.context'

const ActorInfoPage = () => {
  const [actorMovies, setActorMovies] = useState([])
  const [actorNotFound, setActorNotFound] = useState(false)
  const { name } = useParams()
  const { movies } = useSelector((state) => state.movies)
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    const filteredMovies = movies?.filter((movie) =>
      movie.actors.includes(name)
    )
    if (!filteredMovies.length) setActorNotFound(true)
    else setActorMovies(filteredMovies)
  }, [movies])

  if (actorNotFound) {
    return <Navigate to='/404' />
  }
  return (
    <StyledMain theme={theme}>
      {actorMovies.length === 0 ? (
        <SkeletonLoader />
      ) : (
        <>
          <h2>
            Find movies starring <span>{name}</span>
          </h2>
          <Movies>
            {actorMovies.map((movie) => (
              <Link to={`/movies/${movie.id}`} key={movie.id}>
                <MovieCard movie={movie} />
              </Link>
            ))}
          </Movies>
        </>
      )}
    </StyledMain>
  )
}
export default ActorInfoPage
