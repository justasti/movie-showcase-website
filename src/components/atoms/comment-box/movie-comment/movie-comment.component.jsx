import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../../'
import { StyledMovieComment } from './movie-comment.styles'
import { MOVIES_ACTION_TYPES } from '../../../../contexts/movies/movies.actions'
import UsersContext from '../../../../contexts/users/users.context'
import ThemeContext from '../../../../contexts/theme/theme.context'
import MoviesContext from '../../../../contexts/movies/movies.context'
const MovieComment = ({ comment, movie }) => {
  const [editing, setEditing] = useState(false)
  const [commentValue, setCommentValue] = useState(comment?.comment || '')
  const {
    users: { users, authUser },
  } = useContext(UsersContext)
  const { theme } = useContext(ThemeContext)
  const { dispatchMovies } = useContext(MoviesContext)
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
    dispatchMovies({
      type: MOVIES_ACTION_TYPES.EDIT_COMMENT,
      comment: { ...comment, comment: commentValue },
      movieId: movie.id,
    })
  }

  const deleteComment = () => {
    dispatchMovies({
      type: MOVIES_ACTION_TYPES.DELETE_COMMENT,
      commentId: comment.id,
      movieId: movie.id,
    })
  }

  const rateComment = (mark) => {
    let newRating
    if (userVote?.rating === mark) newRating = 0
    else newRating = mark
    if (
      !comment.ratings.length ||
      !comment.ratings.map((rating) => rating.userId).includes(authUser.id)
    )
      comment.ratings.push({ userId: authUser.id, rating: newRating })
    const updatedCommentRatings = comment.ratings.map((rating) =>
      rating.userId === authUser.id ? { ...rating, rating: newRating } : rating
    )
    dispatchMovies({
      type: MOVIES_ACTION_TYPES.EDIT_RATING,
      movieId: movie.id,
      commentId: comment.id,
      ratings: updatedCommentRatings,
    })
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
