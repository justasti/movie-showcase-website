import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../features/movies/movies.slice';
import usersReducer from '../features/movies/users.slice';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    users: usersReducer
  }
})

export default store