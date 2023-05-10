import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { StyledUserCard } from './user-card.styles'
import { USERS_ACTION_TYPES } from '../../../contexts/users/users.actions'
import { Button } from '../../'
import ThemeContext from '../../../contexts/theme/theme.context'
import UsersContext from '../../../contexts/users/users.context'

const UserCard = ({ user }) => {
  const { theme } = useContext(ThemeContext)
  const { dispatchUsers } = useContext(UsersContext)
  return (
    <StyledUserCard theme={theme}>
      <div className='user_info'>
        <img src={user.avatarUrl} alt={user.username} />
        <div className='user_data'>
          <h3>
            <Link to={`/users/${user.id}`}>{user.username}</Link>
          </h3>
          <p>{user.email}</p>
        </div>
      </div>
      <div className='actions'>
        <Link to={`/users/${user.id}/edit`}>
          <Button>Edit User</Button>
        </Link>
        <Button
          $block={!user.isRestricted}
          $unblock={user.isRestricted}
          onClick={() =>
            dispatchUsers({ type: USERS_ACTION_TYPES.BLOCK, user })
          }
        >
          {user.isRestricted ? 'Unblock User' : 'Block User'}
        </Button>
      </div>
    </StyledUserCard>
  )
}
export default UserCard
