import { StyledMain } from './not-found.styles'

const NotFoundPage = ({ theme }) => {
  return (
    <StyledMain theme={theme}>
      <img
        src='https://seosherpa.com/wp-content/uploads/2020/12/404-error-page-header-transparent.png'
        alt='404'
      />
      <h2>Oops! Seems like there's nothing here... :(</h2>
    </StyledMain>
  )
}
export default NotFoundPage
