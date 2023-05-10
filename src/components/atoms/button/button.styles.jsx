import styled from 'styled-components'

export const StyledButton = styled.button`
  background-color: ${(props) =>
    props.$inverted ? 'goldenrod' : 'transparent'};
  color: ${(props) => (props.$inverted ? '#fff' : 'goldenrod')};
  border: 1px solid goldenrod;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-thickness: 2px;
  }
  ${(props) =>
    props.$danger &&
    `
    background-color: transparent;
    color: #B80F0A;
    border: 1px solid #B80F0A;
    &:hover {
      background-color: #B80F0A;
      color: #fff;
    }
  `}
  ${(props) =>
    props.$block &&
    `
    background-color: transparent;
    color: red;
    border: 1px solid red;
  `}
  ${(props) =>
    props.$unblock &&
    `
    background-color: transparent;
    color: green;
    border: 1px solid green;
  `}
  padding: 8px 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 15px;
`
