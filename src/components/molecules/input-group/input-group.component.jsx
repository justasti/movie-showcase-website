import { StyledInputGroup } from './input-group.styles'
import { Label, Input } from '../../../components'

const InputGroup = ({
  name,
  type,
  onChange,
  onBlur,
  value,
  id,
  required,
  disabled,
  theme,
  children,
}) => {
  return (
    <StyledInputGroup>
      <Label htmlFor={id}>{name ? name : id}</Label>
      <Input
        type={type}
        id={id}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        required={required}
        disabled={disabled}
        theme={theme}
      />
      {children}
    </StyledInputGroup>
  )
}
export default InputGroup
