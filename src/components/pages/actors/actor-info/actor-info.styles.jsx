import styled from 'styled-components'
export const StyledMain = styled.main`
  padding: 30px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  a {
    color: inherit;
    text-decoration: none;
  }
  h2 {
    text-align: center;
    margin-bottom: 50px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 500;
    span {
      color: goldenrod;
      text-decoration: underline;
      text-underline-offset: 5px;
    }
  }
`
