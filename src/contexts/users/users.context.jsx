import { createContext, useReducer } from 'react'
import { usersReducer } from './users.reducer'

const UsersContext = createContext(null)

export const UsersProvider = ({ children }) => {
  const INITIAL_STATE = {
    authenticated: false,
    authUser: null,
    users: [],
  }

  const [users, dispatchUsers] = useReducer(usersReducer, INITIAL_STATE)

  const value = { users, dispatchUsers }
  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
}

export default UsersContext
