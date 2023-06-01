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
import { GlobalStatisticAPI } from "../store/api/statisticsApi";


const StatisticsPage = () => {
  const { user } = useAppSelector(state => state.userReducer);
  const theme = createTheme();
  const [gameGenres, setGameGenres] = useState('Genres not found')
  const [gamePlatforms, setGamePlatforms] = useState('Platforms not found')
  const [gameTags, setGameTags] = useState('Tags not found')
  const { data: mostRatedGame } = GlobalStatisticAPI.useFetchMostRatedGameQuery(0)
  const { data: mostRatedDLC } = GlobalStatisticAPI.useFetchMostRatedDLCQuery(0)
  const [games, setGames] = useState<any[]>([])


  useEffect(() => {
    if (mostRatedGame) {
      if (!games.includes(mostRatedGame)) {
        setGames([...games, mostRatedGame])
      }
    }
    if (mostRatedDLC) {
      if (!games.includes(mostRatedDLC)) {
        setGames([...games, mostRatedDLC])
      }
    }
  }, [mostRatedGame, mostRatedDLC])

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        {games.length &&
          games.map((item, index) => (
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginBottom: 10
              }}
              key={item.id}
            >
              <Typography component="h1" variant="h4">
                {index === 0? 'MOST RATED GAME' : 'MOST RATED DLC'}
                
              </Typography>
              <Typography component="h1" variant="h4">
                {item.name}
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
                  <img src={import.meta.env.VITE_API + `/${item?.picturePath}`} style={{
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
                      <b>Type:</b> {item?.type}
                    </Typography>
                    <Typography variant="h6">
                      <b>Release Date:</b> {item?.releaseDate}
                    </Typography>
                    <Typography variant="h6">
                      <b>Genre:</b> {item?.genres.map((el) => (el.name)).join(', ')}
                    </Typography>
                    <Typography variant="h6">
                      <b>Platform:</b> {item?.platforms.map((el) => (el.name)).join(', ')}
                    </Typography>
                    <Typography variant="h6">
                      <b>Age Rating:</b> {item.ageRating ? item.ageRating.name : ''}
                    </Typography>
                    <Typography variant="h6">
                      <b>Average Play Time:</b> {item.averagePlayTime}
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
                      {mostRatedGame?.tags.map((item) => (item.name)).join(', ')}
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
                      {item.developers.map((el, index) => (
                        <div style={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'row'
                        }}>
                          <div>
                            <img src={import.meta.env.VITE_API + `/${el.miniPicturePath}`} style={{
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
                      {item.publishers.map((el, index) => (
                        <div style={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'row'
                        }}>
                          <div>
                            <img src={import.meta.env.VITE_API + `/${el.miniPicturePath}`} style={{
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
                    {item.description}
                  </Typography>
                </Card>
              </Box>
            </Box>
          ))
        }
      </Container>
    </ThemeProvider>
  )
}

export default StatisticsPage
