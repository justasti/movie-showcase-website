import styled from 'styled-components'

export const StyledMain = styled.main`
  height: calc(100vh - 200px);
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
