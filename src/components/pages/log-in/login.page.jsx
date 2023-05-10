import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, InputGroup, Button } from '../../'
import { FormError } from '../../atoms/form-error/form-error.styles'
import { StyledMain } from './login-page.styles'
import { compareSync } from 'bcryptjs'
import { USERS_ACTION_TYPES } from '../../../contexts/users/users.actions'
import UsersContext from '../../../contexts/users/users.context'
import ThemeContext from '../../../contexts/theme/theme.context'

const LoginPage = () => {
  const navigate = useNavigate()
  const [formInputs, setFormInputs] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState([])
  const {
    dispatchUsers,
    users: { users },
  } = useContext(UsersContext)
  const { theme } = useContext(ThemeContext)

  const createErrorMessage = (message) => {
    setErrors((prevErrors) => [...prevErrors, message])
  }

  const handleInputChange = (e) => {
    setErrors([])
    setFormInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.id]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors([])

    const existingUser = users.find((user) => user.email === formInputs.email)

    const passwordIsMatching = () => {
      if (
        existingUser &&
        compareSync(formInputs.password, existingUser.password)
      )
        return true
      else return false
    }

    if (!passwordIsMatching()) {
      createErrorMessage('Incorrect email address or password')
    } else if (existingUser.isRestricted) {
      createErrorMessage('User is blocked! Please contact support.')
    } else {
      dispatchUsers({
        type: USERS_ACTION_TYPES.LOGIN,
        user: existingUser,
      })
      navigate('/')
    }
  }
  return (
    <StyledMain theme={theme}>
      <Form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <InputGroup
          required
          name='E-mail address'
          id='email'
          type='email'
          value={formInputs.email}
          onChange={handleInputChange}
          theme={theme}
        />
        <InputGroup
          required
          name='Password'
          id='password'
          type='password'
          value={formInputs.password}
          onChange={handleInputChange}
          theme={theme}
        />
        <Button $inverted>Log in</Button>
        {errors.length > 0 && (
          <div>
            {errors.map((error) => (
              <FormError key={error}>{error}</FormError>
            ))}
          </div>
        )}
      </Form>
    </StyledMain>
  )
}
export default LoginPage
