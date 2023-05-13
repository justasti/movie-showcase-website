import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { blockUser } from '../../../features/movies/users.slice'
import { Link } from 'react-router-dom'
import { StyledUserCard } from './user-card.styles'
import { Button } from '../../'
import ThemeContext from '../../../contexts/theme/theme.context'

const UserCard = ({ user }) => {
  const dispatch = useDispatch()
  const { theme } = useContext(ThemeContext)

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
          onClick={() => dispatch(blockUser(user))}
        >
          {user.isRestricted ? 'Unblock User' : 'Block User'}
        </Button>
      </div>
    </StyledUserCard>
  )
}
export default UserCard
