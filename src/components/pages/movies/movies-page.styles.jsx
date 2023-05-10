import styled from 'styled-components'

export const StyledMain = styled.main`
  padding: 30px;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;

  .actions_bar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .add_new {
    justify-self: end;
    text-align: right;
    text-transform: uppercase;
    color: goldenrod;
    font-weight: 400;
    text-decoration: underline;
    text-underline-offset: 5px;
    letter-spacing: 1px;
    &:hover {
      font-weight: 500;
    }
  }
  a {
    color: ${({ theme }) => theme.color};
    text-decoration: none;
  }
  h1 {
    color: inherit;
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

export const Movies = styled.div`
  display: grid;
  justify-items: center;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(300px, max-content));
  gap: 20px;
`
