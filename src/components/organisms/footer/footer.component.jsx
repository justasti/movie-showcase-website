import { useContext } from 'react'
import { StyledFooter } from './footer.styles'
import ThemeContext from '../../../contexts/theme/theme.context'
const Footer = () => {
  const { theme } = useContext(ThemeContext)
  return <StyledFooter theme={theme}>Footer</StyledFooter>
}
export default Footer
