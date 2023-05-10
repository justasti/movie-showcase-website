import { StyledInput } from './input.styles'
const Input = ({
  type,
  onChange,
  onBlur,
  value,
  id,
  required,
  disabled,
  theme,
  placeholder,
}) => {
  return (
    <StyledInput
      placeholder={placeholder}
      type={type}
      id={id}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      required={required}
      disabled={disabled}
      theme={theme}
    />
  )
}
export default Input
