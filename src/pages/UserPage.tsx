import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  Card,
  Divider,
} from "@mui/material"
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { useAppSelector } from "../hooks/redux";


const UserPage = () => {
  const { id } = useParams();
  const theme = createTheme();
  const { user } = useAppSelector(state => state.userReducer);

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
                <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                  <Typography variant="h6">
                    Planed / Playing / Completed / Dropped / On hold
                  </Typography>
                </Link>
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
                }}>
                  <div style={{ width: '33%', height: 50, backgroundColor: '#2596be', borderRadius: '10px 0 0 10px' }}></div>
                  <div style={{ width: '33%', height: 50, backgroundColor: '#66b973' }}></div>
                  <div style={{ width: '33%', height: 50, backgroundColor: '#d24e4e', borderRadius: '0 10px 10px 0' }}></div>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 5
                  }}>
                    <div style={{
                      backgroundColor: '#2596be',
                      width: 15,
                      height: 15,
                      borderRadius: 8,
                      marginTop: 7
                    }}></div>
                    <Typography variant="h6" style={{ marginLeft: 5 }}>
                      PC
                    </Typography>
                    <p style={{
                      color: 'gray',
                      marginTop: 4,
                      marginLeft: 5
                    }}>
                      (15)
                    </p>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginLeft: 15,
                    marginTop: 5
                  }}>
                    <div style={{
                      backgroundColor: '#66b973',
                      width: 15,
                      height: 15,
                      borderRadius: 8,
                      marginTop: 7
                    }}></div>
                    <Typography variant="h6" style={{ marginLeft: 5 }}>
                      XBOX ONE
                    </Typography>
                    <p style={{
                      color: 'gray',
                      marginTop: 4,
                      marginLeft: 5
                    }}>
                      (15)
                    </p>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginLeft: 15,
                    marginTop: 5
                  }}>
                    <div style={{
                      backgroundColor: '#d24e4e',
                      width: 15,
                      height: 15,
                      borderRadius: 8,
                      marginTop: 7
                    }}></div>
                    <Typography variant="h6" style={{ marginLeft: 5 }}>
                      NINTENDO
                    </Typography>
                    <p style={{
                      color: 'gray',
                      marginTop: 4,
                      marginLeft: 5
                    }}>
                      (15)
                    </p>
                  </div>
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
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%'
                }}>
                  <Typography variant='h6'>
                    1 Forever Entert.
                  </Typography>
                  <p style={{
                    color: 'gray',
                    marginTop: 5,
                    marginLeft: 5
                  }}>
                    (5)
                  </p>
                  <div style={{
                    height: 5,
                    backgroundColor: '#019862',
                    width: 100,
                    marginTop: 15,
                    marginLeft: 10,
                    borderRadius: 5
                  }}>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%'
                }}>
                  <Typography variant='h6'>
                    1 Valve Software
                  </Typography>
                  <p style={{
                    color: 'gray',
                    marginTop: 5,
                    marginLeft: 5
                  }}>
                    (4)
                  </p>
                  <div style={{
                    height: 5,
                    backgroundColor: '#019862',
                    width: 80,
                    marginTop: 15,
                    marginLeft: 10,
                    borderRadius: 5,
                  }}>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%'
                }}>
                  <Typography variant='h6'>
                    3 Team Cherrycc
                  </Typography>
                  <p style={{
                    color: 'gray',
                    marginTop: 5,
                    marginLeft: 5
                  }}>
                    (3)
                  </p>
                  <div style={{
                    height: 5,
                    backgroundColor: '#019862',
                    width: 60,
                    marginTop: 15,
                    marginLeft: 10,
                    borderRadius: 5,
                  }}>
                  </div>
                </div>
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
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%'
                }}>
                  <Typography variant='h6'>
                    1 Indie-g
                  </Typography>
                  <p style={{
                    color: 'gray',
                    marginTop: 5,
                    marginLeft: 5
                  }}>
                    (5)
                  </p>
                  <div style={{
                    height: 5,
                    backgroundColor: '#019862',
                    width: 100,
                    marginTop: 15,
                    marginLeft: 10,
                    borderRadius: 5
                  }}>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%'
                }}>
                  <Typography variant='h6'>
                    1 Action.
                  </Typography>
                  <p style={{
                    color: 'gray',
                    marginTop: 5,
                    marginLeft: 5
                  }}>
                    (4)
                  </p>
                  <div style={{
                    height: 5,
                    backgroundColor: '#019862',
                    width: 80,
                    marginTop: 15,
                    marginLeft: 10,
                    borderRadius: 5,
                  }}>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%'
                }}>
                  <Typography variant='h6'>
                    3 Adven.
                  </Typography>
                  <p style={{
                    color: 'gray',
                    marginTop: 5,
                    marginLeft: 5
                  }}>
                    (3)
                  </p>
                  <div style={{
                    height: 5,
                    backgroundColor: '#019862',
                    width: 60,
                    marginTop: 15,
                    marginLeft: 10,
                    borderRadius: 5,
                  }}>
                  </div>
                </div>
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
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%'
                }}>
                  <Typography variant='h6'>
                    1 Forever Entert.
                  </Typography>
                  <p style={{
                    color: 'gray',
                    marginTop: 5,
                    marginLeft: 5
                  }}>
                    (5)
                  </p>
                  <div style={{
                    height: 5,
                    backgroundColor: '#019862',
                    width: 100,
                    marginTop: 15,
                    marginLeft: 10,
                    borderRadius: 5
                  }}>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%'
                }}>
                  <Typography variant='h6'>
                    1 Valve Software
                  </Typography>
                  <p style={{
                    color: 'gray',
                    marginTop: 5,
                    marginLeft: 5
                  }}>
                    (4)
                  </p>
                  <div style={{
                    height: 5,
                    backgroundColor: '#019862',
                    width: 80,
                    marginTop: 15,
                    marginLeft: 10,
                    borderRadius: 5,
                  }}>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%'
                }}>
                  <Typography variant='h6'>
                    3 Team Cherrycc
                  </Typography>
                  <p style={{
                    color: 'gray',
                    marginTop: 5,
                    marginLeft: 5
                  }}>
                    (3)
                  </p>
                  <div style={{
                    height: 5,
                    backgroundColor: '#019862',
                    width: 60,
                    marginTop: 15,
                    marginLeft: 10,
                    borderRadius: 5,
                  }}>
                  </div>
                </div>
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
                <Card variant="outlined" style={{
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
