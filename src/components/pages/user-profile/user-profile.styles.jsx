import styled from 'styled-components'

export const StyledMain = styled.main`
  padding: 30px;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.background};
  a {
    color: inherit;
    text-decoration: none;
  }
  h2 {
    text-align: center;
    margin-block: 30px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 500;
    span {
      color: goldenrod;
      text-decoration: underline;
      text-underline-offset: 5px;
    }
  }
  .add_new {
    font-size: 1.25rem;
    text-transform: uppercase;
    a {
      color: goldenrod;
      font-weight: 500;
      margin-left: 10px;
      &:hover {
        text-decoration: underline;
        text-underline-offset: 5px;
      }
    }
  }
`
export const UserProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  img {
    border-radius: 50%;
    width: 200px;
    height: 200px;
    object-fit: cover;
    object-position: center;
  }
  h3 {
    font-size: 1.5rem;
    font-weight: 500;
    text-transform: uppercase;
    margin-block: 5px;
    span {
      font-size: 1rem;
      vertical-align: top;
      text-transform: none;
    }
  }
  h4 {
    font-weight: 400;
    opacity: 0.5;
  }
  .blocked_user {
    margin-top: 5px;
    font-size: 1.25rem;
    color: red;
  }
`
