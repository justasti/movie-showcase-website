import { StyledForm } from './form.styles'
const Form = ({ children, onSubmit }) => {
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>
}
export default Form
