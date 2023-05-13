import { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateMovieWithComments } from '../../../../features/movies/movies.slice'
import { Link } from 'react-router-dom'
import { Button } from '../../../'
import { StyledMovieComment } from './movie-comment.styles'
import ThemeContext from '../../../../contexts/theme/theme.context'

const MovieComment = ({ comment, movie }) => {
  const [editing, setEditing] = useState(false)
  const [commentValue, setCommentValue] = useState(comment?.comment || '')

  const { users, authUser } = useSelector((state) => state.users)
  const { theme } = useContext(ThemeContext)

  const dispatch = useDispatch()

  const user = users?.find((user) => user.id === comment.userId)

  const userVote = comment.ratings.find(
    (rating) => rating.userId === authUser?.id
  )

  const cancelEdit = () => {
    setEditing(false)
    setCommentValue(comment.comment)
  }

  const saveEdit = () => {
    setEditing(false)
    const updatedComments = movie.comments.map((com) =>
      com.id === comment.id ? { ...com, comment: commentValue } : com
    )
    const updatedMovie = { ...movie, comments: updatedComments }
    dispatch(updateMovieWithComments(updatedMovie))
  }

  const deleteComment = () => {
    const updatedComments = movie.comments.filter(
      (com) => com.id !== comment.id
    )
    const updatedMovie = { ...movie, comments: updatedComments }
    dispatch(updateMovieWithComments(updatedMovie))
  }

  const rateComment = (mark) => {
    let newRating
    let ratings

    if (userVote?.rating === mark) newRating = 0
    else newRating = mark

    if (
      !comment.ratings.length ||
      !comment.ratings.map((rating) => rating.userId).includes(authUser.id)
    ) {
      ratings = [{ userId: authUser.id, rating: mark }]
    } else {
      ratings = comment.ratings.map((rating) =>
        rating.userId === authUser.id
          ? { ...rating, rating: newRating }
          : rating
      )
    }

    const updatedComment = { ...comment, ratings }
    const updatedComments = movie.comments.map((com) =>
      com.id === comment.id ? updatedComment : com
    )
    const updatedMovie = { ...movie, comments: updatedComments }

    dispatch(updateMovieWithComments(updatedMovie))
  }

  return (
    <StyledMovieComment theme={theme}>
      <div className='rating'>
        {authUser && (
          <i
            className='fas fa-angle-up'
            style={userVote?.rating === 1 ? { color: 'red' } : undefined}
            onClick={() => rateComment(1)}
          ></i>
        )}
        {comment.ratings.reduce((a, v) => a + v.rating, 0)}
        {authUser && (
          <i
            className='fas fa-angle-down'
            style={userVote?.rating === -1 ? { color: 'red' } : undefined}
            onClick={() => rateComment(-1)}
          ></i>
        )}
      </div>
      <div className='comment-info'>
        <div className='user-info'>
          <img src={user?.avatarUrl} alt={user?.username} />
          <p>
            <Link to={`/users/${user?.id}`}>{user?.username}</Link>
          </p>
          {comment.userId === authUser?.id && (
            <i
              className='fas fa-pencil-alt'
              onClick={() => setEditing(!editing)}
            ></i>
          )}
          {(comment?.userId === authUser?.id || authUser?.role === 'admin') && (
            <i className='fas fa-trash-alt' onClick={deleteComment}></i>
          )}
        </div>
        {editing ? (
          <div className='edit-comment'>
            <textarea
              onChange={(e) => setCommentValue(e.target.value)}
              value={commentValue}
            ></textarea>
            <div className='buttons'>
              <Button onClick={cancelEdit}>Cancel</Button>
              <Button $inverted onClick={saveEdit}>
                Save
              </Button>
            </div>
          </div>
        ) : (
          <p>{commentValue}</p>
        )}
      </div>
    </StyledMovieComment>
  )
}
export default MovieComment
