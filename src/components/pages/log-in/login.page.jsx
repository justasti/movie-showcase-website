import { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../../features/movies/users.slice'
import { Form, InputGroup, Button } from '../../'
import { FormError } from '../../atoms/form-error/form-error.styles'
import { StyledMain } from './login-page.styles'
import { compareSync } from 'bcryptjs'
import ThemeContext from '../../../contexts/theme/theme.context'

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formInputs, setFormInputs] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState([])
  const { users } = useSelector((state) => state.users)
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
      return (
        existingUser && compareSync(formInputs.password, existingUser.password)
      )
    }

    if (!passwordIsMatching()) {
      createErrorMessage('Incorrect email address or password')
    } else if (existingUser.isRestricted) {
      createErrorMessage('User is blocked! Please contact support.')
    } else {
      dispatch(loginUser(existingUser))
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
