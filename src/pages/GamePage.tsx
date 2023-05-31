import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { gamesAPI } from "../store/api/gamesApi";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
  Modal,
  Divider,
  Card
} from "@mui/material"

const GamePage = () => {
  const theme = createTheme();
  const { id } = useParams();
  const { data: game, isLoading } = gamesAPI.useGetGameQuery(Number(id))
  const [openModal, setOpenModal] = useState(false)
  const [gameGenres, setGameGenres] = useState('Genres not found')
  const [gamePlatforms, setGamePlatforms] = useState('Platforms not found')
  const [gameTags, setGameTags] = useState('Tags not found')

  const handleClose = () => {
    setOpenModal(false)
  }

  useEffect(() => {
    console.log(game)
    let genreStr = ''
    let platformStr = ''
    let tagsStr = ''
    game?.genres.forEach((item, index) => index === 0 ? genreStr = item.name : genreStr = genreStr + ', ' + item.name);
    setGameGenres(genreStr)
    game?.platforms.forEach((item, index) => index === 0 ? platformStr = item.name : platformStr = platformStr + ', ' + item.name);
    setGamePlatforms(platformStr)
    game?.tags.forEach((item, index) => index === 0 ? tagsStr = item.name : tagsStr = tagsStr + ', ' + item.name);
    setGameTags(tagsStr)
  }, [game])

  useEffect(() => {
    console.log(gameGenres)
  }, [gameGenres])

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
              alignItems: 'flex-start',
            }}
          >
            <Typography component="h1" variant="h4">
              Идет загрузка...
            </Typography>
          </Box>
        )}
        {!isLoading && (
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Typography component="h1" variant="h4">
              {game?.name}
            </Typography>
            <Box sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row'
            }}>
              <Box sx={{
                width: '20%',
                left: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
              }}>
                <img src={import.meta.env.VITE_API + `/${game?.picturePath}`} style={{
                  width: '100%',
                }} alt="No picture" />
                <Button
                  onClick={() => setOpenModal(true)}
                  style={{ left: 0 }}
                >
                  Add to list +
                </Button>
              </Box>
              <Box sx={{
                width: '70%',
                right: 0,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around'
              }}>
                <Card variant='outlined' style={{
                  width: '30%'
                }}>
                  <Typography variant="h5">
                    INFO
                  </Typography>
                  <Divider />
                  <Typography variant="h6">
                    <b>Type:</b> {game?.type}
                  </Typography>
                  <Typography variant="h6">
                    <b>Release Date:</b> {game?.releaseDate}
                  </Typography>
                  <Typography variant="h6">
                    <b>Genre:</b> {gameGenres}
                  </Typography>
                  <Typography variant="h6">
                    <b>Platform:</b> {gamePlatforms}
                  </Typography>
                  <Typography variant="h6">
                    <b>Age Rating:</b> {game?.ageRating.name}
                  </Typography>
                  <Typography variant="h6">
                    <b>Average Play Time:</b> {game?.averagePlayTime}
                  </Typography>
                </Card>
                <Card variant='outlined' style={{
                  width: '30%'
                }}>
                  <Typography variant="h5">
                    TAGS
                  </Typography>
                  <Divider />
                  <Typography variant="h6">
                    {gameTags}
                  </Typography>
                </Card>
                <Card variant='outlined' style={{
                  width: '30%'
                }}>
                  <Card variant='outlined' style={{
                    width: '100%'
                  }}>
                    <Typography variant="h5">
                      Rating
                    </Typography>
                    <Typography variant="h5">
                      {game?.rating.totalRating} / 10
                    </Typography>
                  </Card>
                  <Card variant='outlined' style={{
                    width: '100%',
                    marginTop: 2
                  }}>
                    <Typography variant="h5">
                      Developer
                    </Typography>
                    {game?.developers.map((item, index) => (
                      <div style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row'
                      }}>
                        <div>
                          <img src={import.meta.env.VITE_API + `/${item.miniPicturePath}`} style={{
                            width: '100%'
                          }} alt="No picture" />
                        </div>
                      </div>
                    ))}
                  </Card>
                  <Card variant='outlined' style={{
                    width: '100%',
                    marginTop: 2
                  }}>
                    <Typography variant="h5">
                      Publisher
                    </Typography>
                    {game?.publishers.map((item, index) => (
                      <div style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row'
                      }}>
                        <div>
                          <img src={import.meta.env.VITE_API + `/${item.miniPicturePath}`} style={{
                            width: '100%',
                          }} alt="No picture" />
                        </div>
                      </div>
                    ))}
                  </Card>
                </Card>
              </Box>
            </Box>
          </Box>
        )}
      </Container>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container component="main" maxWidth="sm">
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            marginTop: '10%',
            borderRadius: 5,
            height: 300
          }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">
                Please log in
              </Typography>
              <Divider />
              <Box
                sx={{
                  width: '90%',
                  alignItems: 'center',
                  textAlign: 'center',
                  marginTop: 10
                }}
              >
                <Typography variant="h4">
                  You have to be logged in to use this option
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Modal>
    </ThemeProvider>
  )
}

export default GamePage;
