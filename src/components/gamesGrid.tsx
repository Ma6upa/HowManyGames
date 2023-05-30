import { useEffect, useState } from "react"
import { gamesAPI } from "../store/api/gamesApi"
import { IGame } from "../interfaces/IGame"

const GamesGrid = () => {
  const [pageNumber, setPageNubmer] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [minYearOfRelease, setMinYearOfRelease] = useState(1800)
  const [maxYearOfRelease, setMaxYearOfRelease] = useState(3000)
  const [minPlayTime, setMinPlayTime] = useState(0)
  const [maxPlayTime, setMaxPlayTime] = useState(10000)
  const [minRating, setMinRating] = useState(0)
  const [maxRating, setMaxRating] = useState(10)
  const [status, setStatus] = useState(['released'])
  const [type, setType] = useState(['game', 'dlc'])
  const [genre, setGenre] = useState([])
  const [tag, setTag] = useState([])
  const [platform, setPlatform] = useState([])
  const [developer, setDeveloper] = useState([])
  const [publisher, setPublisher] = useState([])
  const [ageRating, setAgeRating] = useState('')
  const [nsfw, setNsfw] = useState(false)
  const [rating, setRating] = useState(true)
  const [games, setGames] = useState<IGame[]>([])

  const [getAllGames, { }] = gamesAPI.useGetAllGamesMutation()

  const fetchGames = async () => {
    const data = await getAllGames({
      pageNumber,
      pageSize,
      minYearOfRelease,
      maxYearOfRelease,
      minPlayTime,
      maxPlayTime,
      minRating,
      maxRating,
      status,
      type,
      genre,
      tag,
      platform,
      developer,
      publisher,
      ageRating,
      nsfw,
      rating
    })
    setGames(data.data)
  }

  useEffect(() => {
    fetchGames()
  }, [])

  useEffect(() => {
    console.log(games)
  }, [games])

  return (
    <div>GamesGrid</div>
  )
}

export default GamesGrid