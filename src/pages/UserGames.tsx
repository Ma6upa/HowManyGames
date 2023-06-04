import { useState } from "react";
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
  Card,
  Modal,
  Divider,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  Rating
} from "@mui/material"
import { useAppSelector } from "../hooks/redux";
import { useEffect } from "react"
import { personGameAPI } from "../store/api/personGameApi";
import { IPersonGame } from "../interfaces/IGame";

const UserListGames = () => {
  const { listType } = useParams();
  const { user } = useAppSelector(state => state.userReducer);
  const theme = createTheme();
  const [openModal, setOpenModal] = useState(false)
  const [fetchPersonGames] = personGameAPI.useFetchPersonGamesMutation()
  const [updatePesonGame] = personGameAPI.useUpdatePersonGameMutation()
  const [deletePersonGame] = personGameAPI.useDeletePersonGameMutation()
  const [personGames, setPersonGames] = useState<IPersonGame[]>([])
  const [personGame, setPersonGame] = useState<IPersonGame | null>(null)
  const [userRating, setUserRating] = useState(0)
  const [favourite, setFavourite] = useState(false)

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.currentTarget as HTMLFormElement;
    const data = new FormData(target);
    const personGameData = {
      id: personGame?.id,
      score: userRating > 0 ? userRating * 2 : personGame?.score,
      comment: data.get('comment')?.toString(),
      list: data.get('list')?.toString(),
      playedPlatform: data.get('playedPlatform'),
      favourite: favourite
    }
    await updatePesonGame(personGameData)
    setOpenModal(false)
    setPersonGame(null)
    setFavourite(false)
    setUserRating(0)
    fetchGames()
  }

  const handleClose = () => {
    setPersonGame(null)
    setFavourite(false)
    setUserRating(0)
    setOpenModal(false)
  }

  const handleDelete = async () => {
    await deletePersonGame(personGame?.id)
    setOpenModal(false)
    fetchGames()
  }

  const fetchGames = async () => {
    const res = await fetchPersonGames({
      userId: user?.user.id,
      list: listType === 'On hold' ? 'onhold' : listType
    })
    setPersonGames(res.data)
  }

  useEffect(() => {
    if (user) {
      fetchGames()
    }
  }, [user])

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box sx={{
          marginTop: 8,
          display: 'flex',
          justifyContent: 'flex-start',
          marginBottom: 8,
        }}>
          {!user && (
            <Box>
              <Typography component="h1" variant="h4">
                Loading...
              </Typography>
            </Box>
          )}
          {user && (
            <Box sx={{
              width: '100%'
            }}>
              <Typography component="h1" variant="h4">
                {user.user.nickname}
              </Typography>
              <Typography component="h1" variant="h5">
                {listType}
              </Typography>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                marginTop: 2
              }}>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  padding: 1
                }}>
                  <Box sx={{
                    width: '40%',
                    alignItems: 'flex-start'
                  }}>
                    Game
                  </Box>
                  <Box sx={{
                    width: '50%'
                  }}></Box>
                  <Box sx={{
                    width: '20%',
                    alignItems: 'flex-start'
                  }}>
                    Score
                  </Box>
                  <Box sx={{
                    width: '20%',
                    alignItems: 'flex-start'
                  }}>
                    Type
                  </Box>
                  <Box sx={{
                    width: '20%',
                    alignItems: 'flex-start'
                  }}>
                    Actions
                  </Box>
                </Box>
                {personGames.map((item) => (
                  <Card variant="outlined" sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    padding: 1,
                    marginTop: 2
                  }}>
                    <Box sx={{
                      width: '40%',
                      alignItems: 'flex-start'
                    }}>
                      {item.game.name}
                    </Box>
                    <Box sx={{
                      width: '50%'
                    }}></Box>
                    <Box sx={{
                      width: '20%',
                      alignItems: 'flex-start'
                    }}>
                      {item.score}
                    </Box>
                    <Box sx={{
                      width: '20%',
                      alignItems: 'flex-start'
                    }}>
                      {item.game.type}
                    </Box>
                    <Box sx={{
                      width: '20%',
                      alignItems: 'flex-start'
                    }}>
                      <Button
                        variant="outlined"
                        style={{
                          padding: 1
                        }}
                        onClick={() => {
                          setPersonGame(item)
                          setFavourite(item.favourite)
                          setOpenModal(true)
                        }}
                      >
                        Edit
                      </Button>
                    </Box>
                  </Card>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Container>
      {personGame && (
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Container component="main" maxWidth="md">
            <Box
              component="form" onSubmit={handleSubmit} noValidate
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'white',
                marginTop: '10%',
                borderRadius: 5,
                paddingTop: 2
              }}
            >
              <Typography variant="h6">
                {personGame.game.name}
              </Typography>
              <Divider />
              <Box
                sx={{
                  width: '80%',
                  alignItems: 'center',
                  textAlign: 'flex-start',
                  marginTop: 2
                }}
              >
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
                    } / 10
                  </Typography>
                </div>
                <InputLabel id="demo-simple-select-label">List</InputLabel>
                <Select
                  required
                  fullWidth
                  id="list"
                  name="list"
                  defaultValue={personGame.list.toLowerCase()}
                  style={{ marginBottom: 10 }}
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
                <InputLabel id="demo-simple-select-label">Platform used for playing</InputLabel>
                <Select
                  required
                  fullWidth
                  id="playedPlatform"
                  name="playedPlatform"
                  defaultValue={personGame.playedPlatform? personGame.playedPlatform.id : null}
                  style={{ marginBottom: 10 }}
                >
                  {personGame.game.platforms.map((el) => (
                    <MenuItem value={el.id} key={el.id}>
                      {el.name}
                    </MenuItem>
                  ))}
                </Select>
                <InputLabel id="demo-simple-select-label" style={{ marginBottom: -10 }}>Comment</InputLabel>
                <TextField
                  multiline
                  rows={3}
                  margin="normal"
                  required
                  fullWidth
                  id="comment"
                  name="comment"
                  defaultValue={personGame.comment}
                />
                <FormControlLabel control={<Checkbox defaultChecked={favourite} onChange={(event) => setFavourite(event.target.checked)} />} label="Favourite" style={{ float: 'left', marginTop: -2 }} />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, float: 'right' }}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  sx={{ mt: 3, mb: 2, float: 'right', mr: 2 }}
                  onClick={() => {
                    setOpenModal(false)
                  }}
                >
                  Undo
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ mt: 3, mb: 2, float: 'right', mr: 2 }}
                  onClick={handleDelete}
                >
                  Remove
                </Button>
              </Box>
            </Box>
          </Container>
        </Modal>
      )}
    </ThemeProvider>
  )
}

export default UserListGames
