import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { StyledHeader } from './header.styles'
import { Navigation, UserInfo } from '../../'
import ThemeContext from '../../../contexts/theme/theme.context'

const Header = ({ transparent }) => {
  const { theme } = useContext(ThemeContext)
  const navigate = useNavigate()

  return (
    <StyledHeader transparent={transparent} theme={theme}>
      <div>
        <img className='logo_img' src='/logo.png' alt='logo' />
      </div>
      <Navigation transparent={transparent} />
      <UserInfo />
    </StyledHeader>
  )
}
export default Header
