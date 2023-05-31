import { useEffect, useState } from "react"
import { gamesAPI } from "../store/api/gamesApi"
import { IGame } from "../interfaces/IGame"
import { ThemeProvider } from "@emotion/react"
import {
  Box,
  Card,
  Container,
  CssBaseline,
  Grid,
  Typography,
  createTheme
} from "@mui/material"

const GamesGrid = () => {
  const [pageNumber, setPageNubmer] = useState(1)
  const [pageSize, setPageSize] = useState(9)
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
  const theme = createTheme();

  const [getAllGames, { isLoading: isUpdating }] = gamesAPI.useGetAllGamesMutation()

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

  const handlePrev = () => {
    if (pageNumber > 1) setPageNubmer((pageNumber) => pageNumber - 1)
  }

  const handleNext = () => {
    if (pageNumber < 2) setPageNubmer((pageNumber) => pageNumber + 1)
  }

  useEffect(() => {
    fetchGames()
  }, [
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
  ])
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 100,
          marginTop: 8
        }}>
          <div onClick={() => handlePrev()}>
            <Typography component="h3" variant="h6" style={{ cursor: 'pointer' }}>
              prev
            </Typography>
          </div>
          <Typography component="h3" variant="h6">
            |
          </Typography>
          <div onClick={() => handleNext()}>
            <Typography component="h3" variant="h6" style={{ cursor: 'pointer' }}>
              next
            </Typography>
          </div>
        </div>
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8
          }}
        >
          {isUpdating && (
            <Typography component="h1" variant="h5">
              Происходит загрузка...
            </Typography>
          )}
          {!isUpdating && (
            <Box>
              <Grid container spacing={4}>
                {games.map((item, index) => (
                  <Grid item xs={4} key={item.id}>
                    <Card variant="outlined">
                      <img src={import.meta.env.VITE_API + `/${item.picturePath}`} style={{
                        width: 270,
                        height: 350,
                      }} alt="No picture" />
                      <Typography component="h3" variant="h6" style={{ marginLeft: 5 }}>
                        {item.name}
                      </Typography>
                      <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                      }}>
                        <Typography component="h2" variant="h6">
                          {item.type}
                        </Typography>
                        <div style={{ width: '50%' }}></div>
                        <Typography component="h2" variant="h6">
                          {item.releaseDate?.split('-')[0]}
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default GamesGrid