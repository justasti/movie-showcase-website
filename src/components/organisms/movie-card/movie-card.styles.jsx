import styled from 'styled-components'

export const StyledMovieCard = styled.div`
  border: 1px solid ${({ theme }) => theme.darkBackground};
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  padding-bottom: 10px;
  cursor: pointer;
  transition: transform 0.4s ease;
  height: 100%;
  background-color: ${({ theme }) => theme.lightBackground};
  img {
    width: 100%;
    height: 450px;
    object-fit: cover;
    object-position: top;
  }
  *:not(img) {
    padding-inline: 10px;
  }
  &:hover {
    transform: translateY(-10px);
  }
`
