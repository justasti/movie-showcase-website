import { useContext } from 'react'
import { UserCard } from '../../'
import { StyledMain } from './users-management.styles'
import UsersContext from '../../../contexts/users/users.context'

const UsersManagementPage = ({ theme }) => {
  const {
    users: { users },
  } = useContext(UsersContext)

  return (
    <StyledMain theme={theme}>
      {users.map(
        (user) =>
          user.role !== 'admin' && <UserCard key={user.id} user={user} />
      )}
    </StyledMain>
  )
}
export default UsersManagementPage
