import { createGlobalStyle } from 'styled-components'

export const Layout = createGlobalStyle`
  body {
    ${(props) =>
      props.bgImg &&
      `
        background-image: linear-gradient(#0047, #4007), url('/hero_img.jpg');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    `}
  }
  main {
    min-height: calc(100vh - ${({ homePage }) =>
      homePage ? '200px' : '100px'});
    display: grid;
  }
`
