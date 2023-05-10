import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { ButtonsContainer } from './user-info.styles'
import { USERS_ACTION_TYPES } from '../../../contexts/users/users.actions'
import { DropdownMenu, Button } from '../../'
import UsersContext from '../../../contexts/users/users.context'
import ThemeContext from '../../../contexts/theme/theme.context'

const UserInfo = () => {
  const { users, dispatchUsers } = useContext(UsersContext)
  const { theme } = useContext(ThemeContext)
  const navigate = useNavigate()

  return users.authenticated ? (
    <DropdownMenu userPic={users.authUser.avatarUrl} theme={theme}>
      <p>{users.authUser.username}</p>
      <Link to={`/users/${users.authUser.id}`}>
        <li>
          <i className='fas fa-cog'></i>Settings
        </li>
      </Link>
      {users.authUser.role === 'admin' && (
        <Link to='/users/manage'>
          <li>
            <i className='fas fa-user-cog'></i>Users
          </li>
        </Link>
      )}
      <li
        onClick={() => {
          dispatchUsers({ type: USERS_ACTION_TYPES.LOGOUT })
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
