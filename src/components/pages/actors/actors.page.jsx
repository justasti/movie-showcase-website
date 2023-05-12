import { useEffect, useState, useContext } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { SkeletonLoader, Input } from '../../'
import { ActorsList, StyledMain } from './actors-page.styles'
import ThemeContext from '../../../contexts/theme/theme.context'

const ActorsPage = () => {
  const [actors, setActors] = useState([])
  const [filterPhrase, setFilterPhrase] = useState('')
  const { theme } = useContext(ThemeContext)
  const { movies } = useSelector((state) => state.movies)

  const filterActors = (e) => {
    setFilterPhrase(e.target.value)
  }

  const filteredActors = actors?.filter((actor) => {
    return actor.name.toLowerCase().includes(filterPhrase.toLowerCase())
  })

  useEffect(() => {
    const allActors = Array.from(
      new Set(movies?.map((movie) => movie.actors).flat())
    ).map((name) => {
      const count = movies?.filter((movie) =>
        movie.actors.includes(name)
      ).length

      return { name, count }
    })
    setActors(allActors)
  }, [movies])

  return (
    <StyledMain theme={theme}>
      {actors?.length === 0 ? (
        <SkeletonLoader />
      ) : (
        <>
          <h1>
            Discover <span>all actors</span> in our database
          </h1>
          <Input
            type='text'
            placeholder='Search for an actor'
            value={filterPhrase}
            onChange={filterActors}
          />
          <ActorsList theme={theme}>
            {filteredActors.map(({ name, count }) => (
              <p key={name}>
                <Link to={`/actors/${name}`}>
                  {name} ({count})
                </Link>
              </p>
            ))}
          </ActorsList>
        </>
      )}
    </StyledMain>
  )
}
export default ActorsPage
