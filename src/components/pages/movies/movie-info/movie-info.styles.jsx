import styled from 'styled-components'

export const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  .back_button {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 500;
    align-self: flex-start;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
      text-underline-offset: 4px;
    }
  }
`
export const MovieInfoContainer = styled.div`
  display: flex;
  gap: 30px;
  border: 1px solid #555;
  padding: 20px;
  position: relative;
  margin-block: 20px;
  span {
    font-weight: 500;
  }
  h2 {
    text-transform: uppercase;
    font-size: 3rem;
    font-weight: 500;
    text-decoration: underline;
    color: goldenrod;
    text-underline-offset: 10px;
    margin-bottom: 50px;
  }
  p {
    margin-block: 8px;
    font-size: 1.1rem;
    &:last-of-type {
      margin-bottom: 50px;
    }
  }
  a {
    color: goldenrod;
    font-weight: 400;
    text-decoration: none;
    margin-right: 5px;
    &:hover {
      text-decoration: underline;
      text-underline-offset: 4px;
    }
    &:not(:last-of-type)::after {
      content: ',';
    }
  }
  img {
    max-width: 300px;
  }
  .buttons_container {
    position: absolute;
    bottom: 15px;
    right: 15px;
    display: flex;
    gap: 20px;
  }
`
