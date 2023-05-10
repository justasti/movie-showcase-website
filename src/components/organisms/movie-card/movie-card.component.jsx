import { StyledMovieCard } from './movie-card.styles'
import { useContext } from 'react'
import ThemeContext from '../../../contexts/theme/theme.context'

const MovieCard = ({ movie }) => {
  const { theme } = useContext(ThemeContext)
  return (
    <StyledMovieCard theme={theme}>
      <img src={movie.posterUrl} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.plot.slice(0, 70)}...</p>
    </StyledMovieCard>
  )
}
export default MovieCard
