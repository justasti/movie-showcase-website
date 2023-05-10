import styled from 'styled-components'

export const StyledMovieComment = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  width: 700px;
  .rating {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: stretch;
    justify-content: center;
    padding-right: 10px;
    border-right: 1px solid #999;
    i {
      font-size: 1.25rem;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
  }
  .comment-info {
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    gap: 10px;
    flex: 1;
    .user-info {
      display: flex;
      align-items: center;
      gap: 10px;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        object-fit: cover;
        object-position: center;
      }
      p {
        font-weight: 500;
        flex: 1;
        a {
          color: inherit;
          text-decoration: none;
        }
      }

      i {
        opacity: 0.5;
        cursor: pointer;
      }
    }
    .edit-comment {
      display: flex;
      flex-direction: column;
      align-items: end;
      textarea {
        background-color: transparent;
        color: ${({ theme }) => theme.color};
        padding: 5px;
        width: 100%;
        min-height: 75px;
      }
      .buttons {
        display: flex;
        gap: 10px;
        margin-top: 5px;
      }
    }
  }
`
