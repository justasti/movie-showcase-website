import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const MOVIES_API_URL = 'http://localhost:3000/movies'

const initialState = {
  loading: false,
  movies: [],
  error: ''
}

const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  return axios.get(MOVIES_API_URL)
    .then(res => res.data)
})

const addNewMovie = createAsyncThunk('movies/addNew', async (movie) => {
  return axios.post(MOVIES_API_URL, movie)
    .then(res => res.data)
})

const editMovie = createAsyncThunk('movies/editMovie', async (movie) => {
  return axios.patch(`${MOVIES_API_URL}/${movie.id}`, movie)
    .then(res => res.data)
})

const deleteMovie = createAsyncThunk('movies/deleteMovie', async (movieId) => {
  return axios.delete(`${MOVIES_API_URL}/${movieId}`)
    .then(() => movieId)
})

const updateMovieWithComments = createAsyncThunk('movies/updateMovieWithComments', async (updatedMovie) => {
  return axios.patch(`${MOVIES_API_URL}/${updatedMovie.id}`, updatedMovie)
    .then(res => res.data)
})

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchMovies.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.loading = false
      state.movies = action.payload
      state.error = ''
    })
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.loading = false
      state.movies = []
      state.error = action.error.message
    })
    builder.addCase(addNewMovie.fulfilled, (state, action) => {
      state.movies.push(action.payload)
    })
    builder.addCase(editMovie.fulfilled, (state, action) => {
      state.movies = state.movies.map(movie => movie.id === action.payload.id ? action.payload : movie)
    })
    builder.addCase(deleteMovie.fulfilled, (state, action) => {
      state.movies = state.movies.filter(movie => movie.id !== action.payload)
    })
    builder.addCase(updateMovieWithComments.fulfilled, (state, action) => {
      state.movies = state.movies.map(movie => movie.id === action.payload.id ? action.payload : movie)
    })
  }
})

export default moviesSlice.reducer
export { fetchMovies, addNewMovie, editMovie, deleteMovie, updateMovieWithComments } 