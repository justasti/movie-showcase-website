import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { USERS_API_URL } from '../../contexts/users/users.reducer';
import { genSaltSync, hashSync } from 'bcryptjs';

const hashPassword = (password) => {
  const salt = genSaltSync(10)
  return hashSync(password, salt)
}

const initialState = {
  loading: false,
  users: [],
  authUser: null,
  error: ''
}

const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return axios.get(USERS_API_URL)
    .then(res => res.data)
})

const addUser = createAsyncThunk('users/addUser', async (user) => {
  const modifiedUser = {
    ...user,
    password: hashPassword(user.password),
    role: 'user',
    isRestricted: false
  }
  return axios.post(USERS_API_URL, modifiedUser)
    .then(res => res.data)
})

const deleteUser = createAsyncThunk('users/deleteUser', async (userId) => {
  return axios.delete(`${USERS_API_URL}/${userId}`)
    .then(() => userId)
})

const editUser = createAsyncThunk('users/editUser', async (user) => {
  let hashedPassword
  if (user.password) hashedPassword = hashPassword(user.password)

  return axios.patch(`${USERS_API_URL}/${user.id}`,
    user.password ?
      { ...user, password: hashedPassword } :
      user
  )
    .then(res => res.data)
})

const blockUser = createAsyncThunk('users/blockUser', async (user) => {
  return axios.patch(`${USERS_API_URL}/${user.id}`, { isRestricted: !user.isRestricted })
    .then(res => res.data)
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.authUser = action.payload
    },
    logoutUser: (state) => {
      state.authUser = null
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false
      state.users = action.payload
      state.error = ''
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false
      state.users = []
      state.error = action.error.message
    })
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.users = state.users.push(action.payload)
      state.authUser = action.payload
    })
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload)
    })
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.users = state.users.map(user => user.id === action.payload.id ? action.payload : user)
    })
    builder.addCase(blockUser.fulfilled, (state, action) => {
      state.users = state.users.map(user => user.id === action.payload.id ? action.payload : user)
    })
  }
})

export default usersSlice.reducer
export { fetchUsers, addUser, deleteUser, editUser, blockUser }
export const { loginUser, logoutUser } = usersSlice.actions