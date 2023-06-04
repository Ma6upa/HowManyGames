import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  Card,
  Rating,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField
} from "@mui/material"
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { useAppSelector } from "../hooks/redux";
import { reviewAPI } from "../store/api/reviewApi";
import { personGameAPI } from "../store/api/personGameApi";
import { IPersonGame } from "../interfaces/IGame";

const GamePage = () => {
  const theme = createTheme();
  const { id } = useParams();
  const { data: game, isLoading } = gamesAPI.useGetGameQuery(Number(id))
  const { data: reviews, isLoading: isReviewsLoading } = gamesAPI.useGetGameReviewsQuery(Number(id))
  const [createReview] = reviewAPI.useCreateReviewMutation()
  const [getPersonGame] = personGameAPI.useUserHaveThisPersonGameMutation()
  const [updatePesonGame] = personGameAPI.useUpdatePersonGameMutation()
  const [openModal, setOpenModal] = useState(false)
  const [gameGenres, setGameGenres] = useState('Genres not found')
  const [gamePlatforms, setGamePlatforms] = useState('Platforms not found')
  const [gameTags, setGameTags] = useState('Tags not found')
  const [userRating, setUserRating] = useState(0)
  const [userList, setUserList] = useState('')
  const [review, setReview] = useState<string | null>(null)
  const [reviewError, setReviewError] = useState<string | null>(null)
  const { user } = useAppSelector(state => state.userReducer)
  const [personGame, setPersonGame] = useState<IPersonGame | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (game) {
      let genreStr = ''
      let platformStr = ''
      let tagsStr = ''
      game?.genres.forEach((item, index) => index === 0 ? genreStr = item.name : genreStr = genreStr + ', ' + item.name);
      setGameGenres(genreStr)
      game?.platforms.forEach((item, index) => index === 0 ? platformStr = item.name : platformStr = platformStr + ', ' + item.name);
      setGamePlatforms(platformStr)
      game?.tags.forEach((item, index) => index === 0 ? tagsStr = item.name : tagsStr = tagsStr + ', ' + item.name);
      setGameTags(tagsStr)
      checkPersonGame()
    }
  }, [game])

  const checkPersonGame = async () => {
    const res = await getPersonGame({
      userId: user?.user.id,
      gameId: game?.id
    })
    if (res.data) {
      setPersonGame(res.data)
    }
  }

  useEffect(() => {
    if (userRating) {
      const personGameData = {
        id: personGame?.id,
        score: userRating > 0 ? userRating * 2 : personGame?.score,
        comment: personGame?.comment,
        list: personGame?.list,
        playedPlatform: personGame?.playedPlatform ? personGame?.playedPlatform.id : 0,
        favourite: personGame?.favourite
      }
      updatePesonGame(personGameData)
    }
  }, [userRating])

  const handleClose = () => {
    setOpenModal(false)
  }

  const handleReview = async () => {
    let date = new Date(Date.now());
    let year = date.toLocaleString("default", { year: "numeric" });
    let month = date.toLocaleString("default", { month: "2-digit" });
    let day = date.toLocaleString("default", { day: "2-digit" });
    if (review) {
      await createReview({
        userId: user?.user.id || null,
        gameId: Number(id),
        text: review,
        publishDate: year + "-" + month + "-" + day
      })
      navigate(0)
    } else {
      setReviewError('Review field is empty')
      setTimeout(() => {
        setReviewError(null)
      }, 4000)
    }
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
              alignItems: 'flex-start',
            }}
          >
            <Typography component="h1" variant="h4">
              Loading...
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
              marginBottom: 10
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
                width: '25%',
                left: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
              }}>
                <img src={import.meta.env.VITE_API + `/${game?.picturePath}`} style={{
                  width: '100%',
                }} alt="No picture" />
                {!personGame && (
                  <Button
                    onClick={() => setOpenModal(true)}
                    style={{ left: 0 }}
                  >
                    Add to list +
                  </Button>
                )}
                {personGame && (
                  <div style={{
                    width: '100%'
                  }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%'
                    }}>
                      <Rating name="simple-controlled" value={userRating ? userRating : personGame.score / 2} precision={0.5} style={{ marginTop: 2 }} onChange={(event, newValue) => {
                        setUserRating(newValue);
                      }} />
                      <Typography variant="h5" style={{ marginLeft: 10 }}>
                        {userRating ?
                          userRating * 2
                          :
                          personGame.score
                        }
                      </Typography>
                    </div>
                    <div>
                      <Select
                        required
                        id="sortBy"
                        defaultValue={personGame.list.toLowerCase()}
                        style={{
                          width: '100%'
                        }}
                        onChange={(event) => setUserList(event.target.value)}
                      >
                        <MenuItem value="planned">
                          Planned
                        </MenuItem>
                        <MenuItem value="playing">
                          Playing
                        </MenuItem>
                        <MenuItem value="completed">
                          Completed
                        </MenuItem>
                        <MenuItem value="dropped">
                          Dropped
                        </MenuItem>
                        <MenuItem value="onhold">
                          On hold
                        </MenuItem>
                      </Select>
                    </div>
                  </div>
                )}
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
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row'
                    }}>
                      <Rating name="half-rating" defaultValue={Math.floor(game?.rating!.totalRating!) / 2} precision={0.5} disabled style={{ opacity: 1 }} />
                      <Typography variant="h5" style={{
                        marginLeft: 5,
                        marginTop: -3
                      }}>
                        {game?.rating.totalRating}
                      </Typography>
                    </div>
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
                        <Link to={'/developer/' + item.id}>
                          <div>
                            <img src={import.meta.env.VITE_API + `/${item.miniPicturePath}`} style={{
                              width: '100%'
                            }} alt="No picture" />
                          </div>
                        </Link>
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
                        <Link to={'/publisher/' + item.id}>
                          <div>
                            <img src={import.meta.env.VITE_API + `/${item.miniPicturePath}`} style={{
                              width: '100%',
                            }} alt="No picture" />
                          </div>
                        </Link>
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
                  {game?.description}
                </Typography>
              </Card>
            </Box>
            <Box sx={{
              width: '100%'
            }}>
              <Card variant="outlined" style={{
                width: '100%',
                marginTop: 10,
                padding: '10px 10px 0px 10px'
              }}>
                <Typography variant="h5">
                  DLCs
                </Typography>
                <Divider />
                <div style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  padding: '10px 10px 0px 10px'
                }}>
                  {game?.dlcs.map((item, index) => (
                    <Link to={'/game/' + item.dlcGame.id} key={item.dlcGame.id} style={{ textDecoration: 'none', color: 'black' }}>
                      <div
                        style={{
                          marginLeft: 10,
                          width: 150,
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        <img src={import.meta.env.VITE_API + `/${item.dlcGame.picturePath}`} style={{
                          width: 150,
                          height: 200
                        }} alt="No picture" />
                        <Typography variant="h6">
                          {item.dlcGame.name}
                        </Typography>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
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
                  Sytem Requirements
                </Typography>
                <Divider />
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                  <Card variant="outlined" style={{
                    width: '50%',
                    height: '100%',
                    padding: 5
                  }}>
                    <Typography variant="h5">
                      Minimal:
                    </Typography>
                    <Typography variant="h6">
                      OC: {game?.systemRequirements[0].oc}
                    </Typography>
                    <Typography variant="h6">
                      Processor: {game?.systemRequirements[0].processor}
                    </Typography>
                    <Typography variant="h6">
                      RAM: {game?.systemRequirements[0].ram}
                    </Typography>
                    <Typography variant="h6">
                      Video Card: {game?.systemRequirements[0].videoCard}
                    </Typography>
                    <Typography variant="h6">
                      DirectX version: {game?.systemRequirements[0].directX}
                    </Typography>
                    <Typography variant="h6">
                      Additional: {game?.systemRequirements[0].additional}
                    </Typography>
                    <Typography variant="h6">
                      Hard Drive Space: {game?.systemRequirements[0].hardDriveSpace}
                    </Typography>
                  </Card>
                  <Card variant="outlined" style={{
                    width: '50%',
                    height: '100%',
                    padding: 5
                  }}>
                    <Typography variant="h5">
                      Recommended:
                    </Typography>
                    <Typography variant="h6">
                      OC: {game?.systemRequirements[1].oc}
                    </Typography>
                    <Typography variant="h6">
                      Processor: {game?.systemRequirements[1].processor}
                    </Typography>
                    <Typography variant="h6">
                      RAM: {game?.systemRequirements[1].ram}
                    </Typography>
                    <Typography variant="h6">
                      Video Card: {game?.systemRequirements[1].videoCard}
                    </Typography>
                    <Typography variant="h6">
                      DirectX version: {game?.systemRequirements[1].directX}
                    </Typography>
                    <Typography variant="h6">
                      Additional: {game?.systemRequirements[1].additional}
                    </Typography>
                    <Typography variant="h6">
                      Hard Drive Space: {game?.systemRequirements[1].hardDriveSpace}
                    </Typography>
                  </Card>
                </Box>
              </Card>
            </Box>
            {user && personGame && (
              <Accordion style={{ marginTop: 10, width: '100%' }}>
                <AccordionSummary>
                  <Typography variant="h6">
                    Write a new review
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Card variant="outlined" style={{
                    padding: 10
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
                        <img src={import.meta.env.VITE_API + `/${user.user.picturePath}`} style={{
                          width: 50,
                          height: 50,
                          borderRadius: 25
                        }} alt="No picture" />
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          marginLeft: 10
                        }}>
                          <Typography variant="h6" style={{ marginTop: 10 }}>
                            {user.user.nickname}
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <TextField
                      multiline
                      rows={3}
                      margin="normal"
                      required
                      fullWidth
                      id="review"
                      name="review"
                      placeholder="Write your review here"
                      onChange={(event) => setReview(event.target.value)}
                    />
                    {reviewError && (
                      <Typography component="h1" variant="h5" style={{ color: '#d0342c', float: 'left' }}>
                        {reviewError}
                      </Typography>
                    )}
                    <Button
                      variant="contained"
                      onClick={handleReview}
                      style={{
                        float: 'right'
                      }}
                    >
                      Add review
                    </Button>
                  </Card>
                </AccordionDetails>
              </Accordion>
            )}
            <Box sx={{
              width: '100%',
            }}>
              {isReviewsLoading && (<Typography variant="h3">Loading...</Typography>)}
              {!isReviewsLoading && (
                <Card variant="outlined" style={{
                  width: '100%',
                  marginTop: 10,
                  padding: 10
                }}>
                  <Typography variant="h5">
                    LAST REVIEWS:
                  </Typography>
                  <Divider />
                  {reviews?.map((item, index) => (
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
              )}
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
