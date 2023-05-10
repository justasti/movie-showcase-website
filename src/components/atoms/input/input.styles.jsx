import styled from 'styled-components'

export const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.darkBackground};
  padding: 6px 10px;
  color: ${({ theme }) => theme.color};
  border: 1px solid goldenrod;
  border-radius: 8px;
  &:focus {
    outline: 2px solid goldenrod;
  }
  &:disabled {
    color: ${({ theme }) => theme.color};
    opacity: 0.4;
    cursor: not-allowed;
  }
`
