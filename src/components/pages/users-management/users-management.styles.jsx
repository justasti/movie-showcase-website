import styled from 'styled-components'

export const StyledMain = styled.main`
  padding: 30px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  display: flex;
  flex-direction: column;
  gap: 30px;
`
