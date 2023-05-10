import { StyledLabel } from './label.styles'
const Label = ({ htmlFor, children }) => {
  return <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>
}
export default Label
