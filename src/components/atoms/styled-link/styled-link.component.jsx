import { StyledLinkComponent } from './styled-link.styles'
const StyledLink = ({ children, to, transparent, theme }) => {
  return (
    <StyledLinkComponent $transparent={transparent} theme={theme} to={to}>
      {children}
    </StyledLinkComponent>
  )
}
export default StyledLink
