import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { ButtonsContainer } from './user-info.styles'
import { DropdownMenu, Button } from '../../'
import ThemeContext from '../../../contexts/theme/theme.context'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../../features/movies/users.slice'

const UserInfo = () => {
  const dispatch = useDispatch()
  const { users, authUser } = useSelector((state) => state.users)
  const { theme } = useContext(ThemeContext)
  const navigate = useNavigate()

  return authUser ? (
    <DropdownMenu userPic={authUser.avatarUrl} theme={theme}>
      <p>{authUser.username}</p>
      <Link to={`/users/${authUser.id}`}>
        <li>
          <i className='fas fa-cog'></i>Settings
        </li>
      </Link>
      {authUser.role === 'admin' && (
        <Link to='/users/manage'>
          <li>
            <i className='fas fa-user-cog'></i>Users
          </li>
        </Link>
      )}
      <li
        onClick={() => {
          dispatch(logoutUser())
          navigate('/')
        }}
      >
        <i className='fas fa-sign-out-alt'></i>
        Sign Out
      </li>
    </DropdownMenu>
  ) : (
    <ButtonsContainer>
      <Button style={{ margin: 0 }} onClick={() => navigate('/login')}>
        Log In
      </Button>
      <Button
        $inverted
        style={{ margin: 0 }}
        onClick={() => navigate('/signup')}
      >
        Sign Up
      </Button>
    </ButtonsContainer>
  )
}
export default UserInfo
