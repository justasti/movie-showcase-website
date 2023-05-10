import styled from 'styled-components'
export const StyledUserCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.darkBackground};
  box-shadow: 2px 2px 8px 2px ${({ theme }) => theme.lightBackground};
  padding: 10px 20px;
  .user_info {
    display: flex;
    align-items: center;
    gap: 30px;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
    }
    h3 {
      margin-bottom: 5px;
      a {
        color: inherit;
        text-underline-offset: 4px;
      }
    }
  }
  .actions {
    display: flex;
    align-items: end;
    flex-direction: column;
    gap: 10px;
    button {
      margin: 0;
    }
  }
`
