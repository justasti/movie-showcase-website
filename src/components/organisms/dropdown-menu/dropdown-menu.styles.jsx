import styled from 'styled-components'

export const StyledDropdown = styled.div`
  position: relative;
  img {
    height: 50px;
    width: 50px;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    cursor: pointer;
  }
  .menu_items {
    background-color: ${({ theme }) => theme.darkBackground};
    box-shadow: 1px 1px 4px 2px ${({ theme }) => theme.lightBackground};
    color: ${({ theme }) => theme.color};
    border-radius: 8px;
    position: absolute;
    bottom: 0;
    transform: translateY(110%);
    right: 0;
    ul {
      list-style: none;
      padding: 10px 0;
      p {
        opacity: 0.5;
        text-align: center;
        margin-bottom: 10px;
        font-size: 1.25rem;
        font-weight: 400;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding-inline: 8px;
      }
      a {
        color: ${({ theme }) => theme.color};
        text-decoration: none;
      }
      li {
        min-width: max-content;
        width: 100%;
        display: flex;
        gap: 10px;
        font-size: 1.25rem;
        align-items: center;
        padding: 10px 20px;
        cursor: pointer;
        i {
          width: 25px;
        }
        &:hover {
          background-color: ${({ theme }) => theme.lightBackground};
        }
      }
    }
  }
`
