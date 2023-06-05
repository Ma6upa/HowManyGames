import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
} from "@mui/material"
import { useAppSelector } from "../hooks/redux";
import { FiltersAndConstsAPI } from "../store/api/filterAndConsts";
import { gamesAPI } from "../store/api/gamesApi";

const CreateGamePage = () => {
  const theme = createTheme();
  const { user } = useAppSelector(state => state.userReducer)
  const navigate = useNavigate()
  const { data: consts, isLoading } = FiltersAndConstsAPI.useFetchConstsQuery()
  const { data: filters } = FiltersAndConstsAPI.useFetchFiltersQuery(0)
  const [createGame] = gamesAPI.useCreateGameMutation()

  const [released, setRelease] = useState(false)
  const [nsfw, setNsfw] = useState(false)
  const [genre, setGenre] = useState<any[]>([])
  const [tag, setTag] = useState<any[]>([])
  const [platform, setPlatform] = useState<any[]>([])
  const [developer, setDeveloper] = useState<any[]>([])
  const [publisher, setPublisher] = useState<any[]>([])

  useEffect(() => {
    if (user) {
      if (user?.user.userRoles[1]) {
        if (user?.user.userRoles[1].roleName !== 'admin') navigate('/')
      } else {
        navigate('/')
      }
    }
  }, [user])

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.currentTarget as HTMLFormElement;
    const data = new FormData(target);
    const gameData = {
      name: data.get('name')?.toString() || null,
      status: data.get('status')?.toString() || null,
      releaseDate: data.get('releaseDate')?.toString() || "9999-12-12",
      description: data.get('description')?.toString() || null,
      ageRating: data.get('ageRating')?.toString() || 0,
      nsfw: nsfw,
      type: data.get('type')?.toString() || null,
      averagePlayTime: data.get('averagePlayTime')?.toString() || null,
      systemRequirements: [
        {
          type: 'min',
          oc: data.get('ocMin')?.toString() || null,
          processor: data.get('processorMin')?.toString() || null,
          ram: data.get('ramMin')?.toString() || null,
          videoCard: data.get('videoCardMin')?.toString() || null,
          directX: data.get('directXMin')?.toString() || null,
          ethernet: data.get('ethernetMin')?.toString() || null,
          hardDriveSpace: data.get('hardDriveSpaceMin')?.toString() || null,
          additional: data.get('additionalMin')?.toString() || null,
        },
        {
          type: 'max',
          oc: data.get('ocMax')?.toString() || null,
          processor: data.get('processorMax')?.toString() || null,
          ram: data.get('ramMax')?.toString() || null,
          videoCard: data.get('videoCardMax')?.toString() || null,
          directX: data.get('directXMax')?.toString() || null,
          ethernet: data.get('ethernetMax')?.toString() || null,
          hardDriveSpace: data.get('hardDriveSpaceMax')?.toString() || null,
          additional: data.get('additionalMax')?.toString() || null,
        }
      ],
      developers: developer,
      publishers: publisher,
      platforms: platform,
      genres: genre,
      tags: tag,
    }
    await createGame (gameData)
    navigate('/')
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        {isLoading && (
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Loading
            </Typography>
          </Box>
        )}
        {consts && filters && (
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Create game
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoFocus
              />
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                required
                fullWidth
                id="status"
                name="status"
                defaultValue={consts.status[0]}
                style={{ marginBottom: 10 }}
                onChange={(event) => setRelease(event.target.value === 'released')}
              >
                {consts.status.map((item, index) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              {released && (
                <TextField
                  type="date"
                  margin="normal"
                  fullWidth
                  name="releaseDate"
                  label="Release date"
                  id="releaseDate"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ inputProps: { max: "9999-12-31", lang: "fr-CA" } }}
                />
              )}
              <TextField
                multiline
                rows={3}
                margin="normal"
                required
                fullWidth
                name="description"
                label="Description"
                id="description"
              />
              <InputLabel id="demo-simple-select-label">Age rating</InputLabel>
              <Select
                required
                fullWidth
                id="ageRating"
                name="ageRating"
                defaultValue={filters.ageRatings[0].id}
                style={{ marginBottom: 10 }}
              >
                {filters.ageRatings.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                required
                fullWidth
                id="type"
                name="type"
                defaultValue={consts.type[0]}
                style={{ marginBottom: 10 }}
              >
                {consts.type.map((item, index) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                type="number"
                margin="normal"
                required
                fullWidth
                id="averagePlayTime"
                label="Average play time"
                name="averagePlayTime"
              />
              <FormControlLabel control={<Checkbox onChange={(event) => setNsfw(event.target.checked)} />} label="NSFW" style={{ float: 'left', marginTop: -2 }} />
              <Card variant="outlined" style={{
                padding: 10,
                width: '100%'
              }}>
                <Typography component="h1" variant="h6">
                  Minimal System Requirements
                </Typography>
                <TextField
                  margin="normal"
                  fullWidth
                  id="ocMin"
                  label="OC"
                  name="ocMin"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="processorMin"
                  label="Processor"
                  name="processorMin"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="ramMin"
                  label="Ram"
                  name="ramMin"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="videoCardMin"
                  label="Video card"
                  name="videoCardMin"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="directXMin"
                  label="DirectX"
                  name="directXMin"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="ethernetMin"
                  label="Ethernet"
                  name="ethernetMin"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="hardDriveSpaceMin"
                  label="Hard drive space"
                  name="hardDriveSpaceMin"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="additionalMin"
                  label="Additional"
                  name="additionalMin"
                />
              </Card>
              <Card variant="outlined" style={{
                padding: 10,
                marginTop: 20,
                width: '100%'
              }}>
                <Typography component="h1" variant="h6">
                  Recommended System Requirements
                </Typography>
                <TextField
                  margin="normal"
                  fullWidth
                  id="ocMax"
                  label="OC"
                  name="ocMax"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="processorMax"
                  label="Processor"
                  name="processorMax"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="ramMax"
                  label="Ram"
                  name="ramMax"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="videoCardMax"
                  label="Video card"
                  name="videoCardMax"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="directXMax"
                  label="DirectX"
                  name="directXMax"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="ethernetMax"
                  label="Ethernet"
                  name="ethernetMax"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="hardDriveSpaceMax"
                  label="Hard drive space"
                  name="hardDriveSpaceMax"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="additionalMax"
                  label="Additional"
                  name="additionalMax"
                />
              </Card>
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
                            if (!genre.includes(item.id)) {
                              setGenre([...genre, item.id])
                            }
                          } else {
                            if (genre.includes(item.id)) {
                              setGenre(genre.filter(el => el !== item.id))
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
                            if (!tag.includes(item.id)) {
                              setTag([...tag, item.id])
                            }
                          } else {
                            if (tag.includes(item.id)) {
                              setTag(tag.filter(el => el !== item.id))
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
                            if (!platform.includes(item.id)) {
                              setPlatform([...platform, item.id])
                            }
                          } else {
                            if (platform.includes(item.id)) {
                              setPlatform(platform.filter(el => el !== item.id))
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
                  <InputLabel id="demo-simple-select-label">Developers</InputLabel>
                </AccordionSummary>
                <AccordionDetails>
                  <Card variant="outlined" style={{
                    padding: 10
                  }}>
                    <FormGroup>
                      {filters?.developers.map((item) => (
                        <FormControlLabel key={item.id} control={<Checkbox onChange={(event) => {
                          if (event.target.checked) {
                            if (!developer.includes(item.id)) {
                              setDeveloper([...developer, item.id])
                            }
                          } else {
                            if (developer.includes(item.id)) {
                              setDeveloper(developer.filter(el => el !== item.id))
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
                  <InputLabel id="demo-simple-select-label">Publishers</InputLabel>
                </AccordionSummary>
                <AccordionDetails>
                  <Card variant="outlined" style={{
                    padding: 10
                  }}>
                    <FormGroup>
                      {filters?.publisbhers?.map((item) => (
                        <FormControlLabel key={item.id} control={<Checkbox onChange={(event) => {
                          if (event.target.checked) {
                            if (!publisher.includes(item.id)) {
                              setPublisher([...publisher, item.id])
                            }
                          } else {
                            if (publisher.includes(item.id)) {
                              setPublisher(publisher.filter(el => el !== item.id))
                            }
                          }
                        }} />} label={item.name} />
                      ))}
                    </FormGroup>
                  </Card>
                </AccordionDetails>
              </Accordion>


              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Create Game
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  )
}

export default CreateGamePage;
