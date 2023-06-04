import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Container,
  CssBaseline,
  Divider,
  InputLabel,
  Modal,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material"
import { useAppSelector } from "../hooks/redux";
import { platformsAPI } from "../store/api/platformsApi";
import { IPlatform } from "../interfaces/IFiltersConsts";

const PlatformsEdit = () => {
  const theme = createTheme();
  const { user } = useAppSelector(state => state.userReducer)
  const [createError, setCreateError] = useState<string | null>(null)
  const [platform, setPlatform] = useState<IPlatform | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const [newPlatformName, setNewPlatformName] = useState<string | null>(null)
  const [newPlatformDescription, setNewPlatformDescription] = useState<string | null>(null)
  const [createPlatform] = platformsAPI.useCreatePlatformMutation()
  const [updatePlatform] = platformsAPI.useUpdatePlatformMutation()
  const [deletePlatform] = platformsAPI.useDeletePlatformMutation()
  const { data: platforms } = platformsAPI.useFetchAllPlatformsQuery()
  const [fetchAllPlatforms] = platformsAPI.useLazyFetchAllPlatformsQuery()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      if (user?.user.userRoles[1].roleName !== 'admin') navigate('/')
    }

  }, [user])

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.currentTarget as HTMLFormElement;
    const data = new FormData(target);
    const platformData = {
      id: platform?.id,
      name: data.get('name')?.toString(),
      description: data.get('description')?.toString(),
    }
    await updatePlatform(platformData)
    setOpenModal(false)
    fetchAllPlatforms()
  }

  const handleDelete = async () => {
    await deletePlatform(platform?.id)
    setOpenModal(false)
    fetchAllPlatforms()
  }

  const handleClose = () => {
    setOpenModal(false)
  }

  const handleCreateReview = async () => {
    if (!newPlatformName) {
      setCreateError('Platform name is required')
    } else if (!newPlatformDescription) {
      setCreateError('Platform description is required')
    } else {
      const platformData = {
        name: newPlatformName,
        description: newPlatformDescription
      }
      const res = await createPlatform(platformData)
      if (res.error.status === 400) {
        if (res.error.data) {
          setCreateError(res.error.data)
        } else {
          setCreateError('Something went wrong')
        }
      }
    }
    fetchAllPlatforms()
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 5
          }}
        >
          <Card variant="outlined" style={{
            padding: 10,
            width: '100%'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="newName"
                name="newName"
                placeholder="Platform name"
                onChange={(event) => setNewPlatformName(event.target.value)}
              />
            </div>
            <TextField
              multiline
              rows={3}
              margin="normal"
              required
              fullWidth
              id="newDescription"
              name="newDescription"
              placeholder="Platform description"
              onChange={(event) => setNewPlatformDescription(event.target.value)}
            />
            {createError && (
              <Typography component="h1" variant="h5" style={{ color: '#d0342c', float: 'left' }}>
                {createError}
              </Typography>
            )}
            <Button
              variant="contained"
              onClick={handleCreateReview}
              style={{
                float: 'right'
              }}
            >
              Create platform
            </Button>
          </Card>
          {platforms && (
            <Box sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              marginTop: 5
            }}>
              {platforms.map((item, index) => (
                <Card
                  variant="outlined"
                  key={item.id}
                  style={{
                    marginTop: 15,
                    padding: 10,
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setPlatform(item)
                    setOpenModal(true)
                  }}
                >
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row'
                    }}>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: 20
                      }}>
                        <Typography variant="h5" style={{ marginTop: -5 }}>
                          {item.name}
                        </Typography>
                        <Typography variant="h6" style={{ marginTop: -5 }}>
                          {item.description}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </Box>
          )}
        </Box>
      </Container>
      {platform && (
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Container component="main" maxWidth="md" style={{ outline: 'none' }}>
            <Box component="form" onSubmit={handleSubmit} noValidate
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'white',
                marginTop: '10%',
                borderRadius: 5,
                paddingTop: 2,
                width: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '80%',
                }}
              >
                <Divider />
                <Box
                  sx={{
                    width: '100%',
                    alignItems: 'center',
                    textAlign: 'flex-start',
                    marginTop: 2
                  }}
                >
                  <InputLabel id="demo-simple-select-label" style={{ marginBottom: -10 }}>Name</InputLabel>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    name="name"
                    defaultValue={platform.name}
                  />
                  <InputLabel id="demo-simple-select-label" style={{ marginBottom: -10 }}>Description</InputLabel>
                  <TextField
                    multiline
                    rows={3}
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    name="description"
                    placeholder="Platform description"
                    defaultValue={platform.description}
                  />
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
                    sx={{ mt: 3, mb: 2, float: 'left', mr: 2 }}
                    onClick={handleDelete}
                  >
                    Remove
                  </Button>
                </Box>
              </Box>
            </Box>
          </Container>
        </Modal>
      )}
    </ThemeProvider>
  )
}

export default PlatformsEdit;
