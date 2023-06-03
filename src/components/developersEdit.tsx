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
import { developerAPI } from "../store/api/developerApi";
import { IDeveloper } from "../interfaces/IDeveloper";
import { pictureAPI } from "../store/api/pictureApi";

const DevelopersEdit = () => {
  const theme = createTheme();
  const { user } = useAppSelector(state => state.userReducer)
  const [createError, setCreateError] = useState<string | null>(null)
  const [developer, setDeveloper] = useState<IDeveloper | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const [newDeveloperName, setNewDeveloperName] = useState<string | null>(null)
  const [newDeveloperDescription, setNewDeveloperDescription] = useState<string | null>(null)
  const [createDeveloper] = developerAPI.useCreateDeveloperMutation()
  const [updateDeveloper] = developerAPI.useUpdateDeveloperMutation()
  const [uploadDeveloperPicture] = pictureAPI.useUploadDeveloperPictureMutation()
  const [uploadDeveloperMiniPicture] = pictureAPI.useUploadDeveloperMiniPictureMutation()
  const { data: developers } = developerAPI.useFetchAllDevelopersQuery()
  const [fetchAllDevelopers] = developerAPI.useLazyFetchAllDevelopersQuery()
  const [developerPicture, setDeveloperPicture] = useState<string | null>(null)
  const [developerMiniPicture, setDeveloperMiniPicture] = useState<string | null>(null)
  const [pictureUpdated, setPictureUpdated] = useState<boolean>(false)
  const [miniPictureUpdated, setMiniPictureUpdated] = useState<boolean>(false)
  const reader = new FileReader();
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.user.userRoles[1].roleName !== 'admin') navigate('/')
  }, [user])

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.currentTarget as HTMLFormElement;
    const data = new FormData(target);
    const developerData = {
      id: developer?.id,
      name: data.get('name')?.toString(),
      description: data.get('description')?.toString(),
    }
    await updateDeveloper(developerData)

    if (pictureUpdated) {
      let picFormData = new FormData()
      picFormData.append('pic', data.get('developerPicture'))
      const pictureData = {
        id: developer?.id,
        data: picFormData,
      }
      await uploadDeveloperPicture(pictureData)
    }

    if (miniPictureUpdated) {
      let miniPicFormData = new FormData()
      miniPicFormData.append('pic', data.get('developerMiniPicture'))
      const miniPictureData = {
        id: developer?.id,
        data: miniPicFormData,
      }
      await uploadDeveloperMiniPicture(miniPictureData)
    }
    setPictureUpdated(false)
    setMiniPictureUpdated(false)
    setOpenModal(false)
    fetchAllDevelopers()
  }

  const handleClose = () => {
    setOpenModal(false)
  }

  useEffect(() => {
    setDeveloperPicture(import.meta.env.VITE_API + developer?.picturePath)
    setDeveloperMiniPicture(import.meta.env.VITE_API + developer?.miniPicturePath)
  }, [developer])

  const handleCreateReview = async () => {
    if (!newDeveloperName) {
      setCreateError('Developer name is required')
    } else if (!newDeveloperDescription) {
      setCreateError('Developer description is required')
    } else {
      const developerData = {
        name: newDeveloperName,
        description: newDeveloperDescription
      }
      const res = await createDeveloper(developerData)
      if (res.error.status === 400) {
        if (res.error.data) {
          setCreateError(res.error.data)
        } else {
          setCreateError('Something went wrong')
        }
      }
    }
    fetchAllDevelopers()
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
                placeholder="Developer name"
                onChange={(event) => setNewDeveloperName(event.target.value)}
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
              placeholder="Developer description"
              onChange={(event) => setNewDeveloperDescription(event.target.value)}
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
              Create developer
            </Button>
          </Card>
          {developers && (
            <Box sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              marginTop: 5
            }}>
              {developers.map((item, index) => (
                <Card
                  variant="outlined"
                  key={item.id}
                  style={{
                    marginTop: 15,
                    padding: 10,
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setDeveloper(item)
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
                      <img src={import.meta.env.VITE_API + `/${item.picturePath}`} style={{
                        width: 100,
                        height: 100,
                        borderRadius: 25
                      }} alt="No picture" />
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
      {developer && (
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
                    defaultValue={developer.name}
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
                    placeholder="Developer description"
                    defaultValue={developer.description}
                  />
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'row'
                  }}>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <img src={developerPicture} style={{
                        width: 200,
                        height: 200,
                        marginTop: 20
                      }} alt="No picture" />
                      <Button
                        variant="contained"
                        component="label"
                        style={{
                          float: 'right',
                          width: 200,
                          marginTop: 10
                        }}
                      >
                        New developer picture
                        <input
                          type="file"
                          accept="image/png, image/webp, image/jpeg, image/jpg"
                          name="developerPicture"
                          id="developerPicture"
                          onChange={(e) => {
                            const file = e.target.files![0];
                            reader.readAsDataURL(file)!
                            reader.onloadend = () => {
                              setPictureUpdated(true)
                              setDeveloperPicture(reader.result as string)
                            };
                          }}
                          hidden
                        />
                      </Button>
                    </Box>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginLeft: 5
                    }}>
                      <img src={developerMiniPicture} style={{
                        width: 200,
                        height: 200,
                        marginTop: 20
                      }} alt="No picture" />
                      <Button
                        variant="contained"
                        component="label"
                        style={{
                          float: 'right',
                          width: 200,
                          marginTop: 10
                        }}
                      >
                        New developer mini picture
                        <input
                          type="file"
                          accept="image/png, image/webp, image/jpeg, image/jpg"
                          name="developerMiniPicture"
                          id="developerMiniPicture"
                          onChange={(e) => {
                            const file = e.target.files![0];
                            reader.readAsDataURL(file)!
                            reader.onloadend = () => {
                              setMiniPictureUpdated(true)
                              setDeveloperMiniPicture(reader.result as string)
                            };
                          }}
                          hidden
                        />
                      </Button>
                    </Box>
                  </Box>
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
      )}
    </ThemeProvider>
  )
}

export default DevelopersEdit;
