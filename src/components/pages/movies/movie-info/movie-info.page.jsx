import { useEffect, useState, useContext } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { MovieInfoContainer, StyledMain } from './movie-info.styles'
import {
  SkeletonLoader,
  Button,
  CommentBox,
  CommentsContainer,
} from '../../../'
import { MOVIES_ACTION_TYPES } from '../../../../contexts/movies/movies.actions'
import MoviesContext from '../../../../contexts/movies/movies.context'
import ThemeContext from '../../../../contexts/theme/theme.context'
import UsersContext from '../../../../contexts/users/users.context'
import { nanoid } from 'nanoid'

const MovieInfoPage = () => {
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [movieNotFound, setMovieNotFound] = useState(false)
  const [comment, setComment] = useState('')
  const { id } = useParams()
  const { dispatchMovies } = useContext(MoviesContext)
  const {
    users: { authUser },
  } = useContext(UsersContext)
  const { theme } = useContext(ThemeContext)
  const { movies } = useContext(MoviesContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatchMovies({
      type: MOVIES_ACTION_TYPES.ADD_COMMENT,
      movieId: movie.id,
      comment: {
        id: nanoid(),
        userId: authUser.id,
        comment,
        ratings: [],
      },
    })
    setComment('')
  }

  useEffect(() => {
    if (!movies.length) return
    else {
      const movie = movies.find((movie) => movie.id === id)
      if (!movie) setMovieNotFound(true)
      else setMovie(movie)
    }
  }, [id, movies])

  if (movieNotFound) {
    return <Navigate to='/404' />
  }
  return (
    <StyledMain theme={theme}>
      {movie ? (
        <>
          <p className='back_button' onClick={() => navigate(-1)}>
            <i className='fas fa-long-arrow-alt-left'></i> Go Back
          </p>
          <MovieInfoContainer>
            <div>
              <img src={movie.posterUrl} alt={movie.title} />
            </div>
            <div>
              <h2>{movie.title}</h2>
              <p>
                <span>Release Year:</span> {movie.year}
              </p>
              <p>
                <span>Run Time:</span> {Math.floor(movie.runtime / 60)}h{' '}
                {movie.runtime - 60 * Math.floor(movie.runtime / 60)}min
              </p>
              <p>
                <span>Genres:</span> {movie.genres.join(', ')}
              </p>
              <p>
                <span>Director:</span> {movie.director}
              </p>
              <p>
                <span>Actors:</span>{' '}
                {movie.actors.map((actor) => (
                  <Link key={actor} to={`/actors/${actor}`}>
                    {actor}
                  </Link>
                ))}
              </p>
              <p>
                <span>Plot:</span> {movie.plot}
              </p>
              <div className='buttons_container'>
                {authUser?.id === movie.createdBy && (
                  <Button onClick={() => navigate('edit')}>Edit Movie</Button>
                )}
                {(authUser?.id === movie.createdBy ||
                  authUser?.role === 'admin') && (
                  <Button
                    $danger
                    onClick={() => {
                      dispatchMovies({
                        type: MOVIES_ACTION_TYPES.DELETE,
                        movieId: id,
                      })
                      navigate('/movies')
                    }}
                  >
                    Delete Movie
                  </Button>
                )}
              </div>
            </div>
          </MovieInfoContainer>
          {authUser ? (
            <CommentBox
              onSubmit={handleSubmit}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
          ) : (
            <h3
              style={{
                fontSize: '1.75rem',
                textTransform: 'uppercase',
                fontWeight: 500,
                marginBlock: '20px',
              }}
            >
              Login to post comments!
            </h3>
          )}
          <CommentsContainer movie={movie} />
        </>
      ) : (
        <SkeletonLoader />
      )}
    </StyledMain>
  )
}
export default MovieInfoPage
