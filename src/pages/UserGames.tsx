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
  Divider
} from "@mui/material"
import { useAppSelector } from "../hooks/redux";

const UserListGames = () => {
  const { listType } = useParams();
  const { user } = useAppSelector(state => state.userReducer);
  const theme = createTheme();
  const [openModal, setOpenModal] = useState(false)

  const handleClose = () => {
    setOpenModal(false)
  }

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
                Происходит загрузка...
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
                    width: '10%',
                    alignItems: 'flex-start'
                  }}>
                    Number
                  </Box>
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
                <Card variant="outlined" sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  padding: 1
                }}>
                  <Box sx={{
                    width: '10%',
                    alignItems: 'flex-start'
                  }}>
                    1
                  </Box>
                  <Box sx={{
                    width: '40%',
                    alignItems: 'flex-start'
                  }}>
                    Hollow Knight
                  </Box>
                  <Box sx={{
                    width: '50%'
                  }}></Box>
                  <Box sx={{
                    width: '20%',
                    alignItems: 'flex-start'
                  }}>
                    10
                  </Box>
                  <Box sx={{
                    width: '20%',
                    alignItems: 'flex-start'
                  }}>
                    Game
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
                      onClick={() => setOpenModal(true)}
                    >
                      Edit
                    </Button>
                  </Box>
                </Card>
                <Card variant="outlined" sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  padding: 1,
                  marginTop: 2
                }}>
                  <Box sx={{
                    width: '10%',
                    alignItems: 'flex-start'
                  }}>
                    2
                  </Box>
                  <Box sx={{
                    width: '40%',
                    alignItems: 'flex-start'
                  }}>
                    Euro Truck Simulator
                  </Box>
                  <Box sx={{
                    width: '50%'
                  }}></Box>
                  <Box sx={{
                    width: '20%',
                    alignItems: 'flex-start'
                  }}>
                    10
                  </Box>
                  <Box sx={{
                    width: '20%',
                    alignItems: 'flex-start'
                  }}>
                    Game
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
                      onClick={() => setOpenModal(true)}
                    >
                      Edit
                    </Button>
                  </Box>
                </Card>
                <Card variant="outlined" sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  padding: 1,
                  marginTop: 2
                }}>
                  <Box sx={{
                    width: '10%',
                    alignItems: 'flex-start'
                  }}>
                    3
                  </Box>
                  <Box sx={{
                    width: '40%',
                    alignItems: 'flex-start'
                  }}>
                    Euro Truck Simulator: Going West!
                  </Box>
                  <Box sx={{
                    width: '50%'
                  }}></Box>
                  <Box sx={{
                    width: '20%',
                    alignItems: 'flex-start'
                  }}>
                    10
                  </Box>
                  <Box sx={{
                    width: '20%',
                    alignItems: 'flex-start'
                  }}>
                    DLC
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
                      onClick={() => setOpenModal(true)}
                    >
                      Edit
                    </Button>
                  </Box>
                </Card>
                <Card variant="outlined" sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  padding: 1,
                  marginTop: 2
                }}>
                  <Box sx={{
                    width: '10%',
                    alignItems: 'flex-start'
                  }}>
                    4
                  </Box>
                  <Box sx={{
                    width: '40%',
                    alignItems: 'flex-start'
                  }}>
                    Euro Truck Simulator: Going East!
                  </Box>
                  <Box sx={{
                    width: '50%'
                  }}></Box>
                  <Box sx={{
                    width: '20%',
                    alignItems: 'flex-start'
                  }}>
                    10
                  </Box>
                  <Box sx={{
                    width: '20%',
                    alignItems: 'flex-start'
                  }}>
                    DLC
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
                      onClick={() => setOpenModal(true)}
                    >
                      Edit
                    </Button>
                  </Box>
                </Card>
              </Box>
            </Box>
          )}
        </Box>
      </Container>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container component="main" maxWidth="md">
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            marginTop: '10%',
            borderRadius: 5,
            paddingTop: 2
          }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">
                Hollow Knight
              </Typography>
              <Divider />
              <Box
                sx={{
                  width: '80%',
                  alignItems: 'center',
                  textAlign: 'center',
                  marginTop: 2
                }}
              >
                <InputLabel id="demo-simple-select-label" style={{ marginBottom: -10 }}>Score</InputLabel>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="score"
                  name="score"
                  defaultValue="10"
                />
                <InputLabel id="demo-simple-select-label" style={{ marginBottom: -10 }}>List</InputLabel>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="list"
                  name="list"
                  defaultValue={listType}
                />
                <InputLabel id="demo-simple-select-label" style={{ marginBottom: -10 }}>Comment</InputLabel>
                <TextField
                  multiline
                  rows={3}
                  margin="normal"
                  required
                  fullWidth
                  id="comment"
                  name="comment"
                  defaultValue="Best!!!"
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, float: 'right' }}
                  onClick={() => {
                    setOpenModal(false)
                  }}
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
                  sx={{ mt: 3, mb: 2, float: 'left', mr: 2 }}
                  onClick={() => {
                    setOpenModal(false)
                  }}
                >
                  Remove
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Modal>
    </ThemeProvider>
  )
}

export default UserListGames
