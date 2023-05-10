import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Layout } from './layout.styles'
import { useContext, useEffect } from 'react'
import { MOVIES_ACTION_TYPES } from './contexts/movies/movies.actions'
import { USERS_ACTION_TYPES } from './contexts/users/users.actions'
import { MOVIES_API_URL } from './contexts/movies/movies.reducer'
import { USERS_API_URL } from './contexts/users/users.reducer'
import {
  Header,
  Footer,
  HomePage,
  MoviesPage,
  ActorsPage,
  MovieInfoPage,
  ActorInfoPage,
  AddMoviePage,
  SignUpPage,
  LoginPage,
  UserProfilePage,
  ForbiddenPage,
  NotFoundPage,
  UsersManagementPage,
  EditProfile,
} from './components/'
import UsersContext from './contexts/users/users.context'
import ThemeContext from './contexts/theme/theme.context'
import MoviesContext from './contexts/movies/movies.context'

function App() {
  const location = useLocation()
  const {
    users: { authUser },
    dispatchUsers,
  } = useContext(UsersContext)
  const { dispatchMovies } = useContext(MoviesContext)
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    fetch(MOVIES_API_URL)
      .then((res) => res.json())
      .then((movies) =>
        dispatchMovies({ type: MOVIES_ACTION_TYPES.GET, movies })
      )
    fetch(USERS_API_URL)
      .then((res) => res.json())
      .then((users) => dispatchUsers({ type: USERS_ACTION_TYPES.GET, users }))
  }, [])

  return (
    <>
      <Layout
        bgImg={location.pathname === '/'}
        homePage={location.pathname !== '/'}
      />
      <Header transparent={location.pathname === '/'} />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='movies'>
          <Route index element={<MoviesPage />} />
          <Route path=':id' element={<MovieInfoPage />} />
          <Route
            path='add'
            element={authUser ? <AddMoviePage /> : <Navigate to='/login' />}
          />
          <Route
            path=':id/edit'
            element={authUser ? <AddMoviePage /> : <Navigate to='/login' />}
          />
        </Route>
        <Route path='actors'>
          <Route index element={<ActorsPage />} />
          <Route path=':name' element={<ActorInfoPage />} />
        </Route>
        <Route path='users'>
          <Route path=':id' element={<UserProfilePage />} />
          <Route
            path='manage'
            element={
              authUser?.role === 'admin' ? (
                <UsersManagementPage theme={theme} />
              ) : (
                <Navigate to='/forbidden' />
              )
            }
          />
          <Route path=':id/edit' element={<EditProfile />} />
        </Route>
        <Route path='signup' element={<SignUpPage />} />
        <Route
          path='login'
          element={authUser ? <Navigate to='/' /> : <LoginPage />}
        />
        <Route path='forbidden' element={<ForbiddenPage />} />
        <Route path='404' element={<NotFoundPage theme={theme} />} />
        <Route path='*' element={<Navigate to='404' />} />
      </Routes>
      {location.pathname !== '/' && <Footer />}
    </>
  )
}

export default App
