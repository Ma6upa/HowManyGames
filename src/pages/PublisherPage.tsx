import { useEffect, useState } from "react"
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
  createTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"
import { Link, useParams } from "react-router-dom"
import { FiltersAndConstsAPI } from "../store/api/filterAndConsts"
import { publisherAPI } from "../store/api/publisherApi"

const PublisherPage = () => {
  const [pageNumber, setPageNubmer] = useState(1)
  const [pageSize, setPageSize] = useState(10000)
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
  const { id } = useParams();

  const { data: filters } = FiltersAndConstsAPI.useFetchFiltersQuery(0)
  const { data: publisherData } = publisherAPI.useFetchPublisherQuery(Number(id))
  const [getPublisherGames, { isLoading: isUpdating }] = publisherAPI.useFetchPublisherGamesMutation()

  const fetchGames = async () => {
    const data = await getPublisherGames({
      id: Number(id),
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
              Loading...
            </Typography>
          )}
          {!isUpdating && (
            <Box>
              {publisherData && (
                <Box sx={{
                  width: '100%',
                  height: 290,
                  display: 'flex',
                  flexDirection: 'row'
                }}>
                  <Box>
                    <img src={import.meta.env.VITE_API + `/${publisherData.picturePath}`} style={{
                      width: 260,
                      height: 260,
                    }} alt="No picture" />
                  </Box>
                  <Box sx={{
                    marginLeft: 10
                  }}>
                    <Typography component="h3" variant="h4">
                      {publisherData.name}
                    </Typography>
                    <Typography component="h3" variant="h5" style={{ marginTop: 10 }}>
                      {publisherData.description}
                    </Typography>
                  </Box>
                </Box>
              )}
              <Grid container spacing={4}>
                {games.map((item, index) => (
                  <Grid item xs={4} key={item.id}>
                    <Link to={'/game/' + item.id} style={{ textDecoration: 'none', color: 'black' }}>
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
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      </Container>
      <Box sx={{
        width: '15%',
        right: 20,
        top: 360,
        paddingBottom: 10,
        diplay: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
      }}>
        <Accordion>
          <AccordionSummary>
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
          </AccordionSummary>
          <AccordionDetails>
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
                {filters?.sortBy[0]}
              </MenuItem>
              <MenuItem value="false">
                {filters?.sortBy[1]}
              </MenuItem>
            </Select>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginTop: 10 }}>
          <AccordionSummary>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
          </AccordionSummary>
          <AccordionDetails>
            <Card variant="outlined" style={{
              padding: 10
            }}>
              <FormGroup>
                {filters?.status.map((item, index) => (
                  <FormControlLabel key={item} control={<Checkbox defaultChecked={index === 0} onChange={(event) => {
                    if (event.target.checked) {
                      if (!status.includes(item)) {
                        setStatus([...status, item])
                      }
                    } else {
                      if (status.includes(item)) {
                        setStatus(status.filter(el => el !== item))
                      }
                    }
                  }} />} label={item} />
                ))}
              </FormGroup>
            </Card>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginTop: 10 }}>
          <AccordionSummary>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
          </AccordionSummary>
          <AccordionDetails>
            <Card variant="outlined" style={{
              padding: 10
            }}>
              <FormGroup>
                {filters?.type.map((item, index) => (
                  <FormControlLabel key={item} control={<Checkbox defaultChecked onChange={(event) => {
                    if (event.target.checked) {
                      if (!type.includes(item)) {
                        setType([...type, item])
                      }
                    } else {
                      if (type.includes(item)) {
                        setType(type.filter(el => el !== item))
                      }
                    }
                  }} />} label={item} />
                ))}
              </FormGroup>
            </Card>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginTop: 10 }}>
          <AccordionSummary>
            <InputLabel id="demo-simple-select-label">Rating</InputLabel>
          </AccordionSummary>
          <AccordionDetails>
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
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginTop: 10 }}>
          <AccordionSummary>
            <InputLabel id="demo-simple-select-label">Release year</InputLabel>
          </AccordionSummary>
          <AccordionDetails>
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
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginTop: 10 }}>
          <AccordionSummary>
            <InputLabel id="demo-simple-select-label">Playtime</InputLabel>
          </AccordionSummary>
          <AccordionDetails>
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
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginTop: 10 }}>
          <AccordionSummary>
            <InputLabel id="demo-simple-select-label">Genre</InputLabel>
          </AccordionSummary>
          <AccordionDetails>
            <Card variant="outlined" style={{
              padding: 10
            }}>
              <FormGroup>
                {filters?.genres.map((item, index) => (
                  <FormControlLabel key={item.id} control={<Checkbox onChange={(event) => {
                    if (event.target.checked) {
                      if (!genre.includes(item.name)) {
                        setGenre([...genre, item.name])
                      }
                    } else {
                      if (genre.includes(item.name)) {
                        setGenre(genre.filter(el => el !== item.name))
                      }
                    }
                  }} />} label={item.name} />
                ))}
              </FormGroup>
            </Card>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginTop: 10 }}>
          <AccordionSummary>
            <InputLabel id="demo-simple-select-label">Tags</InputLabel>
          </AccordionSummary>
          <AccordionDetails>
            <Card variant="outlined" style={{
              padding: 10
            }}>
              <FormGroup>
                {filters?.tags.map((item, index) => (
                  <FormControlLabel key={item.id} control={<Checkbox onChange={(event) => {
                    if (event.target.checked) {
                      if (!tag.includes(item.name)) {
                        setTag([...tag, item.name])
                      }
                    } else {
                      if (tag.includes(item.name)) {
                        setTag(tag.filter(el => el !== item.name))
                      }
                    }
                  }} />} label={item.name} />
                ))}
              </FormGroup>
            </Card>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginTop: 10 }}>
          <AccordionSummary>
            <InputLabel id="demo-simple-select-label">Platforms</InputLabel>
          </AccordionSummary>
          <AccordionDetails>
            <Card variant="outlined" style={{
              padding: 10
            }}>
              <FormGroup>
                {filters?.platforms.map((item, index) => (
                  <FormControlLabel key={item.id} control={<Checkbox onChange={(event) => {
                    if (event.target.checked) {
                      if (!platform.includes(item.name)) {
                        setPlatform([...platform, item.name])
                      }
                    } else {
                      if (platform.includes(item.name)) {
                        setPlatform(platform.filter(el => el !== item.name))
                      }
                    }
                  }} />} label={item.name} />
                ))}
              </FormGroup>
            </Card>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginTop: 10 }}>
          <AccordionSummary>
            <InputLabel id="demo-simple-select-label">Age Rating</InputLabel>
          </AccordionSummary>
          <AccordionDetails>
            <Card variant="outlined" style={{
              padding: 10
            }}>
              <FormGroup>
                {filters?.ageRatings?.map((item) => (
                  <FormControlLabel key={item.id} control={<Checkbox checked={ageRating === item.name} onChange={(event) => {
                    if (event.target.checked) {
                      setAgeRating(item.name)
                    } else {
                      setAgeRating('')
                    }
                  }} />} label={item.name} />
                ))}
              </FormGroup>
            </Card>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginTop: 10 }}>
          <AccordionSummary>
            <InputLabel id="demo-simple-select-label">NSFW</InputLabel>
          </AccordionSummary>
          <AccordionDetails>
            <Card variant="outlined" style={{
              padding: 10
            }}>
              <FormGroup>
                <FormControlLabel control={<Checkbox onChange={(event) => {
                  setNsfw(event.target.checked)
                }} />} label={filters?.nsfw} />
              </FormGroup>
            </Card>
          </AccordionDetails>
        </Accordion>
      </Box>
    </ThemeProvider>
  )
}

export default PublisherPage;
