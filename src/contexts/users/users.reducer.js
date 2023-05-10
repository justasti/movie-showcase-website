import { genSaltSync, hashSync } from 'bcryptjs';
import { USERS_ACTION_TYPES } from './users.actions';
export const USERS_API_URL = 'http://localhost:3000/users'

export const usersReducer = (state, action) => {
  const hashPassword = (password) => {
    const salt = genSaltSync(10)
    return hashSync(password, salt)
  }

  switch (action.type) {
    case USERS_ACTION_TYPES.GET:
      return { ...state, users: action.users }

    case USERS_ACTION_TYPES.DELETE:
      fetch(`${USERS_API_URL}/${action.userId}`, { method: 'DELETE' })
      return { ...state, users: state.users.filter(user => user.id !== action.userId) }

    case USERS_ACTION_TYPES.ADD:
      fetch(USERS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...action.user,
          password: hashPassword(action.user.password),
          role: 'user',
          isRestricted: false
        })
      })
      return { ...state, users: [...state.users, action.user], authUser: action.user, authenticated: true }

    case USERS_ACTION_TYPES.EDIT:
      let hashedPassword
      if (action.user.password) hashedPassword = hashPassword(action.user.password)
      fetch(`${USERS_API_URL}/${action.user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action.user.password ?
          { ...action.user, password: hashedPassword } :
          { ...action.user }
        )
      })
      const editedUsers = state.users.map(user => user.id === action.user.id ?
        { ...user, ...action.user, password: hashedPassword ? hashedPassword : user.password } :
        user
      )
      return { ...state, users: editedUsers }

    case USERS_ACTION_TYPES.LOGIN:
      return { ...state, authUser: action.user, authenticated: true }

    case USERS_ACTION_TYPES.LOGOUT:
      return { ...state, authUser: null, authenticated: false }

    case USERS_ACTION_TYPES.BLOCK:
      const mappedUsers = state.users.map(user => {
        if (user.id === action.user.id) {
          fetch(`${USERS_API_URL}/${action.user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isRestricted: !user.isRestricted })
          })
          return { ...user, isRestricted: !user.isRestricted }
        }
        return user
      })
      return { ...state, users: mappedUsers }
    default:
      return state
  }
}