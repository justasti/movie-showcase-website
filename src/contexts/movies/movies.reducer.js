import { MOVIES_ACTION_TYPES } from './movies.actions';
export const MOVIES_API_URL = 'http://localhost:3000/movies'

const updateInAPI = (id, method, body) => {
  fetch(`${MOVIES_API_URL}/${id}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
}

export const moviesReducer = (state, action) => {
  switch (action.type) {
    case MOVIES_ACTION_TYPES.GET:
      return action.movies

    case MOVIES_ACTION_TYPES.DELETE:
      fetch(`${MOVIES_API_URL}/${action.movieId}`, { method: 'DELETE' })
      return state.filter(movie => movie.id !== action.movieId)

    case MOVIES_ACTION_TYPES.ADD:
      fetch(MOVIES_API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...action.movie, comments: [] }) })
      return [...state, action.movie]

    case MOVIES_ACTION_TYPES.EDIT:
      updateInAPI(action.movie.id, 'PATCH', action.movie)
      const mappedMovies = state.map(movie => movie.id === action.movie.id ? { ...movie, ...action.movie } : movie)
      return mappedMovies

    case MOVIES_ACTION_TYPES.ADD_COMMENT:
      const movie = state.find(movie => movie.id === action.movieId)
      const updatedMovie = { ...movie, comments: [...movie.comments, action.comment] }
      return state.map(movie => {
        if (movie.id === action.movieId) {
          fetch(`${MOVIES_API_URL}/${action.movieId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedMovie)
          })
          return updatedMovie
        }
        return movie
      })

    case MOVIES_ACTION_TYPES.EDIT_COMMENT:
      const editedComments = state.find(movie => movie.id === action.movieId).comments.map(comment => comment.id === action.comment.id ? action.comment : comment)
      return state.map(movie => {
        if (movie.id === action.movieId) {
          fetch(`${MOVIES_API_URL}/${action.movieId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...state.movie, comments: editedComments })
          })
          return { ...movie, comments: editedComments }
        }
        return movie
      })

    case MOVIES_ACTION_TYPES.DELETE_COMMENT:
      const filteredComments = state.find(movie => movie.id === action.movieId).comments.filter(comment => comment.id !== action.commentId)
      return state.map(movie => {
        if (movie.id === action.movieId) {
          fetch(`${MOVIES_API_URL}/${action.movieId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...state.movie, comments: filteredComments })
          })
          return { ...movie, comments: filteredComments }
        }
        return movie
      })

    case MOVIES_ACTION_TYPES.EDIT_RATING:
      return state.map(movie => {
        if (movie.id === action.movieId) {
          const mappedComments = movie.comments.map(comment => comment.id === action.commentId ? { ...comment, ratings: action.ratings } : comment)
          const updatedMovie = { ...movie, comments: mappedComments }
          updateInAPI(movie.id, 'PATCH', updatedMovie)
          return updatedMovie
        } else {
          return movie
        }
      })

    default:
      return state
  }
}