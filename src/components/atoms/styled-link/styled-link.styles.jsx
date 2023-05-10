import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const StyledLinkComponent = styled(NavLink)`
  color: ${({ $transparent, theme }) => ($transparent ? '#fff' : theme.color)};
  text-decoration: none;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 1.15rem;
  &.active {
    font-weight: 500;
    text-decoration: underline;
    text-underline-offset: 5px;
    text-decoration-color: goldenrod;
  }
  &:hover {
    color: goldenrod;
  }
`
