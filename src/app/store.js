import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../features/movies/movies.slice';

const store = configureStore({
  reducer: {
    movies: moviesReducer
  }
})

export default store