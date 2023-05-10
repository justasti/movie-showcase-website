import styled from 'styled-components'

export const StyledMain = styled.main`
  justify-content: center;
  padding-block: 50px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
`
