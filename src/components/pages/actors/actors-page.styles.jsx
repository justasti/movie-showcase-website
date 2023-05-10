import styled from 'styled-components'

export const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  padding: 30px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  h1 {
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
  input {
    align-self: flex-start;
    height: 32px;
    margin-bottom: 20px;
  }
`
export const ActorsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-content: start;
  gap: 10px;
  p {
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid #444;
  }
  a {
    color: ${({ theme }) => theme.color};
    text-decoration: none;
    font-size: 1.5rem;
  }
`
