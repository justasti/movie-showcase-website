import { useContext, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { Form, InputGroup, Button, FormError } from '../../../'
import { StyledMain } from './edit-profile.styles'
import { useFormik } from 'formik'
import { compareSync } from 'bcryptjs'
import * as yup from 'yup'
import ThemeContext from '../../../../contexts/theme/theme.context'
import { editUser } from '../../../../features/movies/users.slice'

const EditProfile = () => {
  const [user, setUser] = useState(null)
  const [incorrectPassword, setIncorrectPassword] = useState(false)
  const { id } = useParams()
  const { users, authUser } = useSelector((state) => state.users)
  const { theme } = useContext(ThemeContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const initialValues = {
    email: user ? user.email : '',
    username: user ? user.username : '',
    avatarUrl: user ? user.avatarUrl : '',
    password: '',
    newPassword: '',
    confirmNew: '',
  }

  const validationSchema = yup.object().shape({
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
    password: yup.string().required('Required field'),
    newPassword: yup
      .string()
      .min(6, 'Must be at least 6 characters long')
      .test('match', 'Required Field', function (value) {
        const { confirmNew } = this.parent
        if (confirmNew && confirmNew.length > 0) {
          return value?.length > 0
        }
        return true
      }),
    confirmNew: yup
      .string()
      .test('match', 'Passwords must match', function (value) {
        const { newPassword } = this.parent
        if (newPassword && newPassword.length > 0) {
          return newPassword === value
        }
        return true
      }),
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const passwordMatching =
        compareSync(values.password, user.password) || authUser.role === 'admin'
      if (!passwordMatching) {
        setIncorrectPassword(true)
      } else {
        const updatedUser = {
          id: user.id,
          username: values.username,
          avatarUrl: values.avatarUrl,
        }
        if (values.newPassword) updatedUser.password = values.newPassword
        dispatch(editUser(updatedUser))
        navigate(-1)
      }
    },
  })

  useEffect(() => {
    const userToEdit = users.find((user) => user.id === id)
    if (userToEdit) setUser(userToEdit)
  }, [users])

  if (id !== authUser?.id && authUser?.role !== 'admin')
    return <Navigate to='/forbidden' />
  return (
    <StyledMain theme={theme}>
      <Form onSubmit={formik.handleSubmit}>
        <InputGroup
          theme={theme}
          id='email'
          type='email'
          {...formik.getFieldProps('email')}
          value={initialValues.email}
          disabled
        >
          {formik.touched.email && formik.errors.email && (
            <FormError>{formik.errors.email}</FormError>
          )}
        </InputGroup>
        <InputGroup
          theme={theme}
          id='username'
          type='text'
          {...formik.getFieldProps('username')}
        >
          {formik.touched.username && formik.errors.username && (
            <FormError>{formik.errors.username}</FormError>
          )}
        </InputGroup>
        <InputGroup
          theme={theme}
          id='avatarUrl'
          type='url'
          {...formik.getFieldProps('avatarUrl')}
          name='Avatar URL'
        >
          {formik.touched.avatarUrl && formik.errors.avatarUrl && (
            <FormError>{formik.errors.avatarUrl}</FormError>
          )}
        </InputGroup>
        <InputGroup
          theme={theme}
          id='password'
          type='password'
          {...formik.getFieldProps('password')}
        >
          {formik.touched.password && formik.errors.password && (
            <FormError>{formik.errors.password}</FormError>
          )}
          {incorrectPassword && <FormError>Incorrect password</FormError>}
        </InputGroup>
        <InputGroup
          theme={theme}
          id='newPassword'
          type='password'
          {...formik.getFieldProps('newPassword')}
          name='New Password'
        >
          {formik.touched.newPassword && formik.errors.newPassword && (
            <FormError>{formik.errors.newPassword}</FormError>
          )}
        </InputGroup>
        <InputGroup
          theme={theme}
          id='confirmNew'
          type='password'
          {...formik.getFieldProps('confirmNew')}
          name='Confirm new Password'
        >
          {formik.touched.confirmNew && formik.errors.confirmNew && (
            <FormError>{formik.errors.confirmNew}</FormError>
          )}
        </InputGroup>
        <Button $inverted type='submit'>
          Save info
        </Button>
      </Form>
    </StyledMain>
  )
}
export default EditProfile
