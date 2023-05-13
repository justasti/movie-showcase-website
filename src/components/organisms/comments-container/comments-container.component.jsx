import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MovieComment } from '../../'
import { StyledCommentsContainer } from './comments-container.styles'

const CommentsContainer = ({ movie }) => {
  const [filteredComments, setFilteredComments] = useState([])
  const { users } = useSelector((state) => state.users)

  useEffect(() => {
    setFilteredComments(
      movie.comments?.filter((comment) => {
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
