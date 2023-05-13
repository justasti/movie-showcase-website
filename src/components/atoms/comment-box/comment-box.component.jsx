import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '../../'
import { StyledCommentBox } from './comment-box.styles'
import ThemeContext from '../../../contexts/theme/theme.context'

const CommentBox = ({ children, onSubmit, ...otherProps }) => {
  const { theme } = useContext(ThemeContext)
  const { authUser } = useSelector((state) => state.users)
  return (
    <StyledCommentBox id='new-comment' theme={theme} onSubmit={onSubmit}>
      <textarea {...otherProps} placeholder='What are your thoughts?'>
        {children}
      </textarea>
      <div>
        <div>
          <img src={authUser?.avatarUrl} alt={authUser?.username} />
          <p>
            Commenting as <span>{authUser?.username}</span>
          </p>
        </div>
        <Button $inverted>Comment</Button>
      </div>
    </StyledCommentBox>
  )
}
export default CommentBox
