import styled from 'styled-components'

export const StyledMain = styled.main`
  padding: 30px;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.background};
  display: flex;
  justify-content: center;
`
