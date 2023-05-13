import { useState, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
  addNewMovie,
  editMovie,
} from '../../../../features/movies/movies.slice'
import { Form, InputGroup, Button } from '../../../'
import { nanoid } from 'nanoid'
import { StyledMain } from './add-movie-page.styles'
import ThemeContext from '../../../../contexts/theme/theme.context'

const AddMoviePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formInputs, setFormInputs] = useState({
    title: '',
    year: '',
    runtime: '',
    genres: '',
    director: '',
    actors: '',
    plot: '',
    posterUrl: '',
  })
  const { id } = useParams()
  const { authUser } = useSelector((state) => state.users)
  const { movies } = useSelector((state) => state.movies)
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    if (id) {
      const movie = movies?.find((movie) => movie.id === id)
      if (movie.createdBy !== authUser?.id) {
        navigate('/forbidden')
      } else
        setFormInputs({
          title: movie.title,
          year: movie.year,
          runtime: movie.runtime,
          genres: movie.genres.join(', '),
          director: movie.director,
          actors: movie.actors.join(', '),
          plot: movie.plot,
          posterUrl: movie.posterUrl,
        })
    }
  }, [])

  const handleInputChange = (e) => {
    setFormInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.id]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const movie = {
      ...formInputs,
      id: id ? id : nanoid(),
      genres: formInputs.genres.split(',').map((genre) => genre.trim()),
      actors: formInputs.actors.split(',').map((actor) => actor.trim()),
      createdBy: authUser.id,
    }
    // dispatchMovies({
    //   type: id ? MOVIES_ACTION_TYPES.EDIT : MOVIES_ACTION_TYPES.ADD,
    //   movie,
    // })
    dispatch(id ? editMovie(movie) : addNewMovie(movie))
    navigate(-1)
  }

  return (
    <StyledMain theme={theme}>
      <Form onSubmit={handleSubmit}>
        <InputGroup
          name='Title'
          type='text'
          id='title'
          onChange={handleInputChange}
          value={formInputs.title}
          required
          theme={theme}
        />
        <InputGroup
          name='Release Year'
          type='number'
          id='year'
          onChange={handleInputChange}
          value={formInputs.year}
          required
          theme={theme}
        />
        <InputGroup
          name='Runtime (in minutes)'
          type='number'
          id='runtime'
          onChange={handleInputChange}
          value={formInputs.runtime}
          required
          theme={theme}
        />
        <InputGroup
          name='Genres (separated by comma)'
          type='text'
          id='genres'
          onChange={handleInputChange}
          value={formInputs.genres}
          required
          theme={theme}
        />
        <InputGroup
          name='Director'
          type='text'
          id='director'
          onChange={handleInputChange}
          value={formInputs.director}
          required
          theme={theme}
        />
        <InputGroup
          name='Actors (separated by comma)'
          type='text'
          id='actors'
          onChange={handleInputChange}
          value={formInputs.actors}
          required
          theme={theme}
        />
        <InputGroup
          name='Plot'
          type='text'
          id='plot'
          onChange={handleInputChange}
          value={formInputs.plot}
          required
          theme={theme}
        />
        <InputGroup
          name='Poster URL'
          type='url'
          id='posterUrl'
          onChange={handleInputChange}
          value={formInputs.posterUrl}
          required
          theme={theme}
        />
        <Button $inverted>Submit</Button>
      </Form>
    </StyledMain>
  )
}
export default AddMoviePage
