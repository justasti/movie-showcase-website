import { useContext } from 'react'
import { THEME_ACTION_TYPES } from '../../../contexts/theme/theme.actions'
import { ThemeChangeButton } from './theme-changer.styles'
import ThemeContext from '../../../contexts/theme/theme.context'

const ThemeChanger = () => {
  const { dispatchTheme, theme } = useContext(ThemeContext)
  return (
    <ThemeChangeButton theme={theme}>
      <input
        type='checkbox'
        className='checkbox'
        id='chk'
        checked={theme.theme === 'light'}
        onChange={() => dispatchTheme({ type: THEME_ACTION_TYPES.CHANGE })}
      />
      <label className='label' htmlFor='chk'>
        <i className='fa-solid fa-sun'></i>
        <i className='fas fa-moon'></i>
        <div className='ball'></div>
      </label>
    </ThemeChangeButton>
  )
}
export default ThemeChanger
