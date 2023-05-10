import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, InputGroup, Button, FormError } from '../../'
import { StyledMain } from './sign-up-page.styles'
import { nanoid } from 'nanoid'
import { useFormik } from 'formik'
import { USERS_ACTION_TYPES } from '../../../contexts/users/users.actions'
import UsersContext from '../../../contexts/users/users.context'
import ThemeContext from '../../../contexts/theme/theme.context'
import * as yup from 'yup'

const SignUpPage = () => {
  const navigate = useNavigate()
  const [existingUser, setExistingUser] = useState(false)
  const {
    dispatchUsers,
    users: { users },
  } = useContext(UsersContext)
  const { theme } = useContext(ThemeContext)

  const validationSchema = yup.object({
    email: yup
      .string()
      .required('Required field')
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        'Invalid email address'
      ),
    username: yup
      .string()
      .required('Required field')
      .max(15, 'Must be 15 characters or less'),
    avatarUrl: yup
      .string()
      .matches(
        /^(|https?:\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?)$/,
        'Invalid URL'
      ),
    password: yup
      .string()
      .required('Required field')
      .min(6, 'Must be at least 6 characters long'),
    confirm: yup
      .mixed()
      .required('Required field')
      .oneOf([yup.ref('password')], "Passwords doesn't match"),
  })

  const initialValues = {
    email: '',
    username: '',
    avatarUrl: '',
    password: '',
    confirm: '',
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setExistingUser(false)

      const emailInUse = users.find((user) => user.email === values.email)
      if (emailInUse) {
        setExistingUser(true)
        return
      }

      const newUser = {
        id: nanoid(),
        email: values.email,
        username: values.username,
        password: values.password,
        avatarUrl:
          values.avatarUrl ||
          'https://img.freepik.com/free-icon/user_318-159711.jpg',
      }
      dispatchUsers({
        type: USERS_ACTION_TYPES.ADD,
        user: newUser,
      })
      navigate('/')
    },
  })

  return (
    <StyledMain theme={theme}>
      <Form onSubmit={formik.handleSubmit}>
        <h2>Create new account</h2>
        <InputGroup
          id='email'
          type='email'
          theme={theme}
          {...formik.getFieldProps('email')}
        >
          {formik.touched.email && formik.errors.email && (
            <FormError>{formik.errors.email}</FormError>
          )}
          {existingUser && (
            <FormError>User with this e-mail already exist</FormError>
          )}
        </InputGroup>
        <InputGroup
          id='username'
          type='text'
          theme={theme}
          {...formik.getFieldProps('username')}
        >
          {formik.touched.username && formik.errors.username && (
            <FormError>{formik.errors.username}</FormError>
          )}
        </InputGroup>
        <InputGroup
          id='avatarUrl'
          type='url'
          theme={theme}
          {...formik.getFieldProps('Avatar URL')}
          name='Avatar URL'
        >
          {formik.touched.avatarUrl && formik.errors.avatarUrl && (
            <FormError>{formik.errors.avatarUrl}</FormError>
          )}
        </InputGroup>
        <InputGroup
          id='password'
          type='password'
          theme={theme}
          {...formik.getFieldProps('password')}
        >
          {formik.touched.password && formik.errors.password && (
            <FormError>{formik.errors.password}</FormError>
          )}
        </InputGroup>
        <InputGroup
          id='confirm'
          type='password'
          theme={theme}
          {...formik.getFieldProps('confirm')}
        >
          {formik.touched.confirm && formik.errors.confirm && (
            <FormError>{formik.errors.confirm}</FormError>
          )}
        </InputGroup>
        <Button type='submit' $inverted>
          Create Account
        </Button>
      </Form>
    </StyledMain>
  )
}
export default SignUpPage
