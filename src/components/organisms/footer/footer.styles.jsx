import styled from 'styled-components'

export const StyledFooter = styled.footer`
  height: 100px;
  padding: 20px 50px;
  border-top: 2px solid ${({ theme }) => theme.darkBackground};
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  display: grid;
  place-content: center;
`
