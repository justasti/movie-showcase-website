import { useContext, useEffect, useState } from 'react'
import { MovieComment } from '../../'
import { StyledCommentsContainer } from './comments-container.styles'
import UsersContext from '../../../contexts/users/users.context'

const CommentsContainer = ({ movie }) => {
  const [filteredComments, setFilteredComments] = useState([])
  const {
    users: { users },
  } = useContext(UsersContext)

  useEffect(() => {
    setFilteredComments(
      movie?.comments?.filter((comment) => {
        const commentCreator = users?.find((user) => user.id === comment.userId)
        if (commentCreator?.isRestricted) return false
        return true
      })
    )
  }, [movie])

  return (
    <>
      <StyledCommentsContainer>
        {filteredComments?.map((comment) => (
          <MovieComment key={comment.id} comment={comment} movie={movie} />
        )) || <h2>No comments yet!</h2>}
      </StyledCommentsContainer>
    </>
  )
}
export default CommentsContainer
