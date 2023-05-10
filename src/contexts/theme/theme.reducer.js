import { THEME_ACTION_TYPES } from './theme.actions';
import { ColorThemes } from './themes';

export const themeReducer = (state, action) => {
  switch (action.type) {
    case THEME_ACTION_TYPES.CHANGE:
      if (state.theme === 'light') {
        localStorage.setItem('theme', 'dark')
        return ColorThemes.dark
      }

      localStorage.setItem('theme', 'light')
      return ColorThemes.light

    default:
      return state;
  }
}