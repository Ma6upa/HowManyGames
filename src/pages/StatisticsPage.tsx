import { useParams } from "react-router-dom";
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
  MenuItem,
  Select,
  Card,
  Divider
} from "@mui/material"
import { useAppSelector } from "../hooks/redux";
import { useEffect, useState } from "react";


const StatisticsPage = () => {
  const { user } = useAppSelector(state => state.userReducer);
  const theme = createTheme();
  const [gameGenres, setGameGenres] = useState('Genres not found')
  const [gamePlatforms, setGamePlatforms] = useState('Platforms not found')
  const [gameTags, setGameTags] = useState('Tags not found')

  useEffect(() => {
    let genreStr = ''
    let platformStr = ''
    let tagsStr = ''
    if (user?.favouriteGames) {
      user?.favouriteGames[0].genres.forEach((item, index) => index === 0 ? genreStr = item.name : genreStr = genreStr + ', ' + item.name);
      setGameGenres(genreStr)
      user?.favouriteGames[0].platforms.forEach((item, index) => index === 0 ? platformStr = item.name : platformStr = platformStr + ', ' + item.name);
      setGamePlatforms(platformStr)
      user?.favouriteGames[0].tags.forEach((item, index) => index === 0 ? tagsStr = item.name : tagsStr = tagsStr + ', ' + item.name);
      setGameTags(tagsStr)
    }
  }, [user])

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        {user?.favouriteGames && (
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              marginBottom: 10
            }}
          >
            <Typography component="h1" variant="h4">
              MOST RATED GAME
            </Typography>
            <Typography component="h1" variant="h4">
              {user?.favouriteGames[0].name}
            </Typography>
            <Box sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row'
            }}>
              <Box sx={{
                width: '25%',
                left: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
              }}>
                <img src={import.meta.env.VITE_API + `/${user?.favouriteGames[0]?.picturePath}`} style={{
                  width: '100%',
                }} alt="No picture" />
              </Box>
              <Box sx={{
                width: '72%',
                right: 0,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: '3%'
              }}>
                <Card variant='outlined' style={{
                  width: '30%'
                }}>
                  <Typography variant="h5">
                    INFO
                  </Typography>
                  <Divider />
                  <Typography variant="h6">
                    <b>Type:</b> {user?.favouriteGames[0]?.type}
                  </Typography>
                  <Typography variant="h6">
                    <b>Release Date:</b> {user?.favouriteGames[0]?.releaseDate}
                  </Typography>
                  <Typography variant="h6">
                    <b>Genre:</b> {gameGenres}
                  </Typography>
                  <Typography variant="h6">
                    <b>Platform:</b> {gamePlatforms}
                  </Typography>
                  <Typography variant="h6">
                    <b>Age Rating:</b> {user?.favouriteGames[0].ageRating ? user?.favouriteGames[0].ageRating.name : ''}
                  </Typography>
                  <Typography variant="h6">
                    <b>Average Play Time:</b> {user?.favouriteGames[0].averagePlayTime}
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
                    width: '100%',
                    marginTop: 2
                  }}>
                    <Typography variant="h5">
                      Developer
                    </Typography>
                    {user?.favouriteGames[0].developers.map((item, index) => (
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
                    {user?.favouriteGames[0].publishers.map((item, index) => (
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
            <Box sx={{
              width: '100%'
            }}>
              <Card variant="outlined" style={{
                width: '100%',
                marginTop: 10,
                padding: 10
              }}>
                <Typography variant="h5">
                  Description
                </Typography>
                <Divider />
                <Typography variant="h5">
                  {user?.favouriteGames[0].description}
                </Typography>
              </Card>
            </Box>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  )
}

export default StatisticsPage
