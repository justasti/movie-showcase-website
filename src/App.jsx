import { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { fetchMovies } from './features/movies/movies.slice'
import { fetchUsers } from './features/movies/users.slice'
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
import { Layout } from './layout.styles'
import ThemeContext from './contexts/theme/theme.context'

function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  const { authUser } = useSelector((state) => state.users)
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    dispatch(fetchMovies())
    dispatch(fetchUsers())
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
