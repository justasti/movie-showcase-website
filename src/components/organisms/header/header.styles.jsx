import styled from 'styled-components'

export const StyledHeader = styled.header`
  height: 100px;
  position: sticky;
  z-index: 1;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  background-color: ${({ transparent, theme }) =>
    transparent ? 'transparent' : theme.background};
  color: ${({ transparent, theme }) => (transparent ? '#fff' : theme.color)};
  .logo_img {
    height: 100px;
    padding: 10px 0;
  }
`
