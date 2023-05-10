import styled from 'styled-components'

export const StyledCommentBox = styled.form`
  width: 700px;
  display: flex;
  flex-direction: column;
  textarea {
    color: ${({ theme }) => theme.color};
    background-color: transparent;
    padding: 10px;
    height: 100px;
  }

  > div {
    width: calc(100% + 2px);
    padding: 5px 0 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div {
      display: flex;
      align-items: center;
      gap: 5px;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        object-fit: cover;
        object-position: center;
      }
      p {
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        span {
          font-weight: 500;
        }
      }
    }
    button {
      margin: 0;
    }
  }
`
