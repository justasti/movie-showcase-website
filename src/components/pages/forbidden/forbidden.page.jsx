import { useContext } from 'react'
import { StyledMain } from './forbidden.styles'
import ThemeContext from '../../../contexts/theme/theme.context'

const ForbiddenPage = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <StyledMain theme={theme}>
      <img src='/403.png' alt='access denied' />
      <h2>Sorry, but You don't have access to this page.</h2>
    </StyledMain>
  )
}
export default ForbiddenPage
