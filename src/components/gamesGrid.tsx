import { useEffect, useState } from "react"
import { gamesAPI } from "../store/api/gamesApi"
import { IGame } from "../interfaces/IGame"
import { ThemeProvider } from "@emotion/react"
import {
  Box,
  Card,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  createTheme
} from "@mui/material"
import { developerAPI } from "../store/api/developerApi"
import { publisherAPI } from "../store/api/publisherApi"

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
  const [genre, setGenre] = useState<any[]>([])
  const [tag, setTag] = useState<any[]>([])
  const [platform, setPlatform] = useState<any[]>([])
  const [developer, setDeveloper] = useState<any[]>([])
  const [publisher, setPublisher] = useState<any[]>([])
  const [ageRating, setAgeRating] = useState('')
  const [nsfw, setNsfw] = useState(false)
  const [rating, setRating] = useState(true)
  const [games, setGames] = useState<IGame[]>([])
  const theme = createTheme();

  const {data: developers} = developerAPI.useFetchAllDevelopersQuery(0)
  const {data: publishers} = publisherAPI.useFetchAllPublishersQuery(0)
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
      <Box sx={{
        width: '12%',
        right: 20,
        top: 100,
        paddingBottom: 10,
        diplay: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
      }}>
        <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
        <Select
          required
          fullWidth
          name="sortBy"
          id="sortBy"
          defaultValue="true"
          onChange={(event) => {
            setRating(JSON.parse(event.target.value))
          }}
        >
          <MenuItem value="true">
            Rating
          </MenuItem>
          <MenuItem value="false">
            Alphabet
          </MenuItem>
        </Select>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Card variant="outlined" style={{
          padding: 10
        }}>
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked onChange={(event) => {
              if (event.target.checked) {
                if (!status.includes('released')) {
                  setStatus([...status, 'released'])
                }
              } else {
                if (status.includes('released')) {
                  setStatus(status.filter(item => item !== 'released'))
                }
              }
            }} />} label="Released" />
            <FormControlLabel control={<Checkbox onChange={(event) => {
              if (event.target.checked) {
                if (!status.includes('announced')) {
                  setStatus([...status, 'announced'])
                }
              } else {
                if (status.includes('announced')) {
                  setStatus(status.filter(item => item !== 'announced'))
                }
              }
            }} />} label="Announced" />
          </FormGroup>
        </Card>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Card variant="outlined" style={{
          padding: 10
        }}>
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked onChange={(event) => {
              if (event.target.checked) {
                if (!type.includes('game')) {
                  setType([...type, 'game'])
                }
              } else {
                if (type.includes('game')) {
                  setType(type.filter(item => item !== 'game'))
                }
              }
            }} />} label="Game" />
            <FormControlLabel control={<Checkbox defaultChecked onChange={(event) => {
              if (event.target.checked) {
                if (!type.includes('dlc')) {
                  setType([...type, 'dlc'])
                }
              } else {
                if (type.includes('dlc')) {
                  setType(type.filter(item => item !== 'dlc'))
                }
              }
            }} />} label="DLC" />
          </FormGroup>
        </Card>
        <InputLabel id="demo-simple-select-label">Rating</InputLabel>
        <Card variant="outlined" style={{
          padding: 10
        }}>
          <FormGroup>
            <TextField
              type='number'
              placeholder="min rating"
              onChange={(event) => {
                setMinRating(Number(event.target.value))
              }}
            />
            <TextField
              type='number'
              placeholder="max rating"
              onChange={(event) => {
                setMaxRating(Number(event.target.value))
              }}
            />
          </FormGroup>
        </Card>
        <InputLabel id="demo-simple-select-label">Release year</InputLabel>
        <Card variant="outlined" style={{
          padding: 10
        }}>
          <FormGroup>
            <TextField
              type='number'
              placeholder="min release year"
              onChange={(event) => {
                setMinYearOfRelease(Number(event.target.value))
              }}
            />
            <TextField
              type='number'
              placeholder="max release year"
              onChange={(event) => {
                setMaxYearOfRelease(Number(event.target.value))
              }}
            />
          </FormGroup>
        </Card>
        <InputLabel id="demo-simple-select-label">Playtime</InputLabel>
        <Card variant="outlined" style={{
          padding: 10
        }}>
          <FormGroup>
            <TextField
              type='number'
              placeholder="min play time"
              onChange={(event) => {
                setMinPlayTime(Number(event.target.value))
              }}
            />
            <TextField
              type='number'
              placeholder="max play time"
              onChange={(event) => {
                setMaxPlayTime(Number(event.target.value))
              }}
            />
          </FormGroup>
        </Card>
        <InputLabel id="demo-simple-select-label">Genre</InputLabel>
        <Card variant="outlined" style={{
          padding: 10
        }}>
          <FormGroup>
            <FormControlLabel control={<Checkbox onChange={(event) => {
              if (event.target.checked) {
                if (!genre.includes('action')) {
                  setGenre([...genre, 'action'])
                }
              } else {
                if (genre.includes('action')) {
                  setGenre(genre.filter(item => item !== 'action'))
                }
              }
            }} />} label="Action" />
            <FormControlLabel control={<Checkbox onChange={(event) => {
              if (event.target.checked) {
                if (!genre.includes('strategy')) {
                  setGenre([...genre, 'strategy'])
                }
              } else {
                if (genre.includes('strategy')) {
                  setGenre(genre.filter(item => item !== 'strategy'))
                }
              }
            }} />} label="Strategy" />
            <FormControlLabel control={<Checkbox onChange={(event) => {
              if (event.target.checked) {
                if (!genre.includes('rpg')) {
                  setGenre([...genre, 'rpg'])
                }
              } else {
                if (genre.includes('rpg')) {
                  setGenre(genre.filter(item => item !== 'rpg'))
                }
              }
            }} />} label="RPG" />
            <FormControlLabel control={<Checkbox onChange={(event) => {
              if (event.target.checked) {
                if (!genre.includes('shooter')) {
                  setGenre([...genre, 'shooter'])
                }
              } else {
                if (genre.includes('shooter')) {
                  setGenre(genre.filter(item => item !== 'shooter'))
                }
              }
            }} />} label="Shooter" />
            <FormControlLabel control={<Checkbox onChange={(event) => {
              if (event.target.checked) {
                if (!genre.includes('adventure')) {
                  setGenre([...genre, 'adventure'])
                }
              } else {
                if (genre.includes('adventure')) {
                  setGenre(genre.filter(item => item !== 'adventure'))
                }
              }
            }} />} label="Adventure" />
            <FormControlLabel control={<Checkbox onChange={(event) => {
              if (event.target.checked) {
                if (!genre.includes('puzzle')) {
                  setGenre([...genre, 'puzzle'])
                }
              } else {
                if (genre.includes('puzzle')) {
                  setGenre(genre.filter(item => item !== 'puzzle'))
                }
              }
            }} />} label="Puzzle" />
            <FormControlLabel control={<Checkbox onChange={(event) => {
              if (event.target.checked) {
                if (!genre.includes('racing')) {
                  setGenre([...genre, 'racing'])
                }
              } else {
                if (genre.includes('racing')) {
                  setGenre(genre.filter(item => item !== 'racing'))
                }
              }
            }} />} label="Racing" />
            <FormControlLabel control={<Checkbox onChange={(event) => {
              if (event.target.checked) {
                if (!genre.includes('sports')) {
                  setGenre([...genre, 'sports'])
                }
              } else {
                if (genre.includes('sports')) {
                  setGenre(genre.filter(item => item !== 'sports'))
                }
              }
            }} />} label="Sports" />
          </FormGroup>
        </Card>
        <InputLabel id="demo-simple-select-label">Tags</InputLabel>
        <Card variant="outlined" style={{
          padding: 10
        }}>
          <FormGroup>
            <FormControlLabel control={<Checkbox onChange={(event) => {
              if (event.target.checked) {
                if (!tag.includes('action')) {
                  setTag([...tag, 'action'])
                }
              } else {
                if (tag.includes('action')) {
                  setTag(tag.filter(item => item !== 'action'))
                }
              }
            }} />} label="Action" />
            <FormControlLabel control={<Checkbox onChange={(event) => {
              if (event.target.checked) {
                if (!tag.includes('strategy')) {
                  setTag([...tag, 'strategy'])
                }
              } else {
                if (tag.includes('strategy')) {
                  setTag(tag.filter(item => item !== 'strategy'))
                }
              }
            }} />} label="Strategy" />
            <FormControlLabel control={<Checkbox onChange={(event) => {
              if (event.target.checked) {
                if (!tag.includes('rpg')) {
                  setTag([...tag, 'rpg'])
                }
              } else {
                if (tag.includes('rpg')) {
                  setTag(tag.filter(item => item !== 'rpg'))
                }
              }
            }} />} label="RPG" />
            <FormControlLabel control={<Checkbox onChange={(event) => {
              if (event.target.checked) {
                if (!tag.includes('shooter')) {
                  setTag([...tag, 'shooter'])
                }
              } else {
                if (tag.includes('shooter')) {
                  setTag(tag.filter(item => item !== 'shooter'))
                }
              }
            }} />} label="Shooter" />
            <FormControlLabel control={<Checkbox onChange={(event) => {
              if (event.target.checked) {
                if (!tag.includes('adventure')) {
                  setTag([...tag, 'adventure'])
                }
              } else {
                if (tag.includes('adventure')) {
                  setTag(tag.filter(item => item !== 'adventure'))
                }
              }
            }} />} label="Adventure" />
            <FormControlLabel control={<Checkbox onChange={(event) => {
              if (event.target.checked) {
                if (!tag.includes('puzzle')) {
                  setTag([...tag, 'puzzle'])
                }
              } else {
                if (tag.includes('puzzle')) {
                  setTag(tag.filter(item => item !== 'puzzle'))
                }
              }
            }} />} label="Puzzle" />
            <FormControlLabel control={<Checkbox onChange={(event) => {
              if (event.target.checked) {
                if (!tag.includes('racing')) {
                  setTag([...tag, 'racing'])
                }
              } else {
                if (tag.includes('racing')) {
                  setTag(tag.filter(item => item !== 'racing'))
                }
              }
            }} />} label="Racing" />
            <FormControlLabel control={<Checkbox onChange={(event) => {
              if (event.target.checked) {
                if (!tag.includes('sports')) {
                  setTag([...tag, 'sports'])
                }
              } else {
                if (tag.includes('sports')) {
                  setTag(tag.filter(item => item !== 'sports'))
                }
              }
            }} />} label="Sports" />
          </FormGroup>
        </Card>
        <InputLabel id="demo-simple-select-label">Platforms</InputLabel>
        <Card variant="outlined" style={{
          padding: 10
        }}>
          <FormGroup>
            <FormControlLabel control={<Checkbox onChange={(event) => {
              if (event.target.checked) {
                if (!platform.includes('pc')) {
                  setPlatform([...platform, 'pc'])
                }
              } else {
                if (platform.includes('pc')) {
                  setPlatform(platform.filter(item => item !== 'pc'))
                }
              }
            }} />} label="PC" />
            <FormControlLabel control={<Checkbox onChange={(event) => {
              if (event.target.checked) {
                if (!platform.includes('ps5')) {
                  setPlatform([...platform, 'ps5'])
                }
              } else {
                if (platform.includes('ps5')) {
                  setPlatform(platform.filter(item => item !== 'ps5'))
                }
              }
            }} />} label="PS5" />
            <FormControlLabel control={<Checkbox onChange={(event) => {
              if (event.target.checked) {
                if (!platform.includes('ps4')) {
                  setPlatform([...platform, 'ps4'])
                }
              } else {
                if (platform.includes('ps4')) {
                  setPlatform(platform.filter(item => item !== 'ps4'))
                }
              }
            }} />} label="PS4" />
            <FormControlLabel control={<Checkbox onChange={(event) => {
              if (event.target.checked) {
                if (!platform.includes('psp')) {
                  setPlatform([...platform, 'psp'])
                }
              } else {
                if (platform.includes('psp')) {
                  setPlatform(platform.filter(item => item !== 'psp'))
                }
              }
            }} />} label="PSP" />
            <FormControlLabel control={<Checkbox onChange={(event) => {
              if (event.target.checked) {
                if (!platform.includes('xbox one')) {
                  setPlatform([...platform, 'xbox one'])
                }
              } else {
                if (platform.includes('xbox one')) {
                  setPlatform(platform.filter(item => item !== 'xbox one'))
                }
              }
            }} />} label="XBox One" />
            <FormControlLabel control={<Checkbox onChange={(event) => {
              if (event.target.checked) {
                if (!platform.includes('xbox series x')) {
                  setPlatform([...platform, 'xbox series x'])
                }
              } else {
                if (platform.includes('xbox series x')) {
                  setPlatform(platform.filter(item => item !== 'xbox series x'))
                }
              }
            }} />} label="XBox Series X" />
          </FormGroup>
        </Card>
        <InputLabel id="demo-simple-select-label">Developers</InputLabel>
        <Card variant="outlined" style={{
          padding: 10
        }}>
          <FormGroup>
            {developers?.map((item) => (
               <FormControlLabel control={<Checkbox onChange={(event) => {
                if (event.target.checked) {
                  if (!developer.includes(item.name)) {
                    setDeveloper([...developer, item.name])
                  }
                } else {
                  if (developer.includes(item.name)) {
                    setDeveloper(developer.filter(el => el !== item.name))
                  }
                }
              }} />} label={item.name} />
            ))}
          </FormGroup>
        </Card>
        <InputLabel id="demo-simple-select-label">Publishers</InputLabel>
        <Card variant="outlined" style={{
          padding: 10
        }}>
          <FormGroup>
            {publishers?.map((item) => (
               <FormControlLabel control={<Checkbox onChange={(event) => {
                if (event.target.checked) {
                  if (!publisher.includes(item.name)) {
                    setPublisher([...publisher, item.name])
                  }
                } else {
                  if (publisher.includes(item.name)) {
                    setPublisher(publisher.filter(el => el !== item.name))
                  }
                }
              }} />} label={item.name} />
            ))}
          </FormGroup>
        </Card>
        <InputLabel id="demo-simple-select-label">NSFW</InputLabel>
        <Card variant="outlined" style={{
          padding: 10
        }}>
          <FormGroup>
            <FormControlLabel control={<Checkbox onChange={(event) => {
              setNsfw(event.target.checked)
            }} />} label="NSFW" />
          </FormGroup>
        </Card>
      </Box>
    </ThemeProvider>
  )
}

export default GamesGrid