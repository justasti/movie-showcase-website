import styled from 'styled-components'

export const StyledMain = styled.main`
  padding: 30px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    width: 50%;
  }
  h2 {
    font-size: 2.5rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding-inline: 20%;
    text-align: center;
  }
`
