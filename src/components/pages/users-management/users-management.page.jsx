import { UserCard } from '../../'
import { StyledMain } from './users-management.styles'
import { useSelector } from 'react-redux'

const UsersManagementPage = ({ theme }) => {
  const { users } = useSelector((state) => state.users)

  return (
    <StyledMain theme={theme}>
      {users?.map(
        (user) =>
          user.role !== 'admin' && <UserCard key={user.id} user={user} />
      )}
    </StyledMain>
  )
}
export default UsersManagementPage
