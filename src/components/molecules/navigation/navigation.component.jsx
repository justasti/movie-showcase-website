import { useContext } from 'react'
import { StyledLink, ThemeChanger } from '../../'
import { StyledNav } from './navigation.styles'
import ThemeContext from '../../../contexts/theme/theme.context'

const Navigation = ({ transparent }) => {
  const { theme, dispatchTheme } = useContext(ThemeContext)

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Movies', path: '/movies' },
    { name: 'Actors', path: '/actors' },
  ]
  return (
    <StyledNav>
      <ul>
        {links.map((link) => (
          <StyledLink
            transparent={transparent}
            theme={theme}
            to={link.path}
            key={link.name}
          >
            <li>{link.name}</li>
          </StyledLink>
        ))}
        <li>
          <ThemeChanger />
        </li>
      </ul>
    </StyledNav>
  )
}
export default Navigation
