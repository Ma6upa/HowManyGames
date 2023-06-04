import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
  Card,
  Divider,
} from "@mui/material"
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { userAPI } from "../store/api/userApi";
import { useEffect, useState } from "react";
import { IUser } from "../interfaces/IUser";


const UserPage = () => {
  const { id } = useParams();
  const theme = createTheme();
  const [user, setUser] = useState<IUser | null>(null)
  const [platformsAll, setPlatformsAll] = useState(0)
  const [publishersAll, setPublisherAll] = useState(0)
  const [developersAll, setDevelopersAll] = useState(0)
  const [tagsAll, setTagsAll] = useState(0)
  const [fetchUser] = userAPI.useFetchUserMutation()
  const navigate = useNavigate()

  useEffect(() => {
    getUser(id)
  }, [id])

  useEffect(() => {
    let countPlatformsAll = 0
    let countPublisherAll = 0
    let countDeveloperAll = 0
    let countTagsAll = 0

    if (user) {
      user.platformStatistic.forEach((item) => {
        countPlatformsAll += item.count
      })
      user.publisherStatistic.forEach((item) => {
        countPublisherAll += item.count
      })
      user.developerStatistic.forEach((item) => {
        countDeveloperAll += item.count
      })
      user.tagStatistic.forEach((item) => {
        countTagsAll += item.count
      })
    }

    setPlatformsAll(countPlatformsAll)
    setPublisherAll(countPublisherAll)
    setDevelopersAll(countDeveloperAll)
    setTagsAll(countTagsAll)
  }, [user])

  const getUser = async (id: number) => {
    const res = await fetchUser(id)
    if ('data' in res) setUser(res.data)
    if ('error' in res) navigate('/')
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        {user && (
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: 8
            }}
          >
            <Box sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row'
            }}>
              <Box sx={{
                width: '20%'
              }}>
                <img src={import.meta.env.VITE_API + `/${user.user.picturePath}`} style={{
                  width: '100%',
                }} alt="No picture" />
              </Box>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: 7
              }}>
                <Typography component="h1" variant="h4">
                  {user.user.nickname}
                </Typography>
                <Typography variant="h6">
                  {user.user.gender} / {user.user.age} / on this site from {user.user.registrationdDate}
                </Typography>
                <Typography variant="h5">
                  Game Lists
                </Typography>
                <Typography variant="h6">
                  <Link to={'/completed/Planned'} style={{ textDecoration: 'none', color: 'black' }}> Planed </Link>
                  /
                  <Link to={'/completed/Playing'} style={{ textDecoration: 'none', color: 'black' }}> Playing </Link>
                  /
                  <Link to={'/completed/Completed'} style={{ textDecoration: 'none', color: 'black' }}> Completed </Link>
                  /
                  <Link to={'/completed/Dropped'} style={{ textDecoration: 'none', color: 'black' }}> Dropped </Link>
                  /
                  <Link to={'/completed/Onhold'} style={{ textDecoration: 'none', color: 'black' }}> On hold </Link>
                </Typography>
              </Box>
            </Box>
            <Card variant="outlined" style={{
              width: '100%',
              marginTop: 10,
              padding: '10px 10px 0px 10px'
            }}>
              <Typography variant="h5">
                FAVOURITE GAMES
              </Typography>
              <Divider />
              <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                padding: '10px 10px 0px 10px'
              }}>
                {user.favouriteGames?.map((item, index) => (
                  <div
                    style={{
                      marginLeft: 10,
                      width: 150,
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                    key={item.id}
                  >
                    <img src={import.meta.env.VITE_API + `/${item.picturePath}`} style={{
                      width: 150,
                      height: 200
                    }} alt="No picture" />
                    <Typography variant="h6">
                      {item.name}
                    </Typography>
                  </div>
                ))}
              </div>
            </Card>
            <Card variant="outlined" style={{
              width: '100%',
              marginTop: 10,
              padding: '10px 10px 0px 10px'
            }}>
              <Typography variant="h5">
                GAME PLATFORMS
              </Typography>
              <Divider />
              <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: 10,
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  height: 50,
                  padding: 0,
                  borderRadius: 10,
                  overflow: 'hidden'
                }}>

                  {user.platformStatistic.map((item) => (
                    <div style={{ width: `${Math.floor((item.count / platformsAll) * 100)}%`, height: 50, backgroundColor: `${item.color}` }} key={item.id}></div>
                  ))}
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                  {user.platformStatistic.map((item) => (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginTop: 5
                    }}>
                      <div style={{
                        backgroundColor: `${item.color}`,
                        width: 15,
                        height: 15,
                        borderRadius: 8,
                        marginTop: 9
                      }}></div>
                      <Typography variant="h6" style={{ marginLeft: 5 }}>
                        {item.name}
                      </Typography>
                      <p style={{
                        color: 'gray',
                        marginTop: 6,
                        marginLeft: 5
                      }}>
                        ({item.count})
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            <Box sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <Card variant="outlined" style={{
                width: '30%',
                marginTop: 10,
                padding: 10
              }}>
                <Typography variant="h5">
                  GAMES BY PUBLISHERS
                </Typography>
                <Divider />
                {user.publisherStatistic.map((item) => (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between'
                  }}>
                    <Typography variant='h6'>
                      {item.name}
                    </Typography>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '50%'
                    }}>
                      <p style={{
                        color: 'gray',
                        marginTop: 5,
                        marginLeft: 5
                      }}>
                        ({item.count})
                      </p>
                      <div style={{
                        height: 5,
                        backgroundColor: '#019862',
                        marginTop: 15,
                        marginLeft: 10,
                        borderRadius: 5,
                        width: `${Math.floor((item.count / publishersAll) * 100)}%`,
                      }}>
                      </div>
                    </Box>
                  </div>
                ))}
              </Card>
              <Card variant="outlined" style={{
                width: '30%',
                marginTop: 10,
                padding: 10
              }}>
                <Typography variant="h5">
                  GAMES BY TAGS
                </Typography>
                <Divider />
                {user.tagStatistic.map((item) => (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between'
                  }}>
                    <Typography variant='h6'>
                      {item.name}
                    </Typography>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '50%'
                    }}>
                      <p style={{
                        color: 'gray',
                        marginTop: 5,
                        marginLeft: 5
                      }}>
                        ({item.count})
                      </p>
                      <div style={{
                        height: 5,
                        backgroundColor: '#019862',
                        marginTop: 15,
                        marginLeft: 10,
                        borderRadius: 5,
                        width: `${Math.floor((item.count / tagsAll) * 100)}%`,
                      }}>
                      </div>
                    </Box>
                  </div>
                ))}
              </Card>
              <Card variant="outlined" style={{
                width: '30%',
                marginTop: 10,
                padding: 10
              }}>
                <Typography variant="h5">
                  GAMES BY DEVELOPERS
                </Typography>
                <Divider />
                {user.developerStatistic.map((item) => (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between'
                  }}>
                    <Typography variant='h6'>
                      {item.name}
                    </Typography>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '50%'
                    }}>
                      <p style={{
                        color: 'gray',
                        marginTop: 5,
                        marginLeft: 5
                      }}>
                        ({item.count})
                      </p>
                      <div style={{
                        height: 5,
                        backgroundColor: '#019862',
                        marginTop: 15,
                        marginLeft: 10,
                        borderRadius: 5,
                        width: `${Math.floor((item.count / developersAll) * 100)}%`,
                      }}>
                      </div>
                    </Box>
                  </div>
                ))}
              </Card>
            </Box>
            <Card variant="outlined" style={{
              width: '100%',
              marginTop: 10,
              padding: 10
            }}>
              <Typography variant="h5">
                LAST REVIEWS:
              </Typography>
              <Divider />
              {user.userReviews?.map((item, index) => (
                <Card variant="outlined" key={item.id} style={{
                  marginTop: 15,
                  padding: 5
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row'
                    }}>
                      <img src={import.meta.env.VITE_API + `/${item.user.picturePath}`} style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25
                      }} alt="No picture" />
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: 10
                      }}>
                        <Typography variant="h6" style={{ marginTop: -5 }}>
                          {item.user.nickname}
                        </Typography>
                        <Typography variant="h6" style={{ marginTop: -5 }}>
                          {item.rating} / 10
                        </Typography>
                      </div>
                    </div>
                    <div style={{ width: '70%' }}></div>
                    <div>
                      <Typography variant="h6">
                        {item.publishDate}
                      </Typography>
                    </div>
                  </div>
                  <Card variant="outlined" style={{
                    margin: 10,
                    padding: 5
                  }}>
                    <Typography variant="h6" style={{ marginTop: -5 }}>
                      {item.text}
                    </Typography>
                  </Card>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    right: 0,
                    float: "right"
                  }}>
                    <ThumbUpOffAltIcon />
                    <Typography variant="h6" style={{ marginTop: -5 }}>
                      {item.reviewRating}
                    </Typography>
                    <ThumbDownOffAltIcon />
                  </div>
                </Card>
              ))}
            </Card>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  )
}

export default UserPage
