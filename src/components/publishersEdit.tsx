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
import { publisherAPI } from "../store/api/publisherApi";
import { IPublisher } from "../interfaces/IPublisher";
import { pictureAPI } from "../store/api/pictureApi";

const PublishersEdit = () => {
  const theme = createTheme();
  const { user } = useAppSelector(state => state.userReducer)
  const [createError, setCreateError] = useState<string | null>(null)
  const [publisher, setPublisher] = useState<IPublisher | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const [newPublisherName, setNewPublisherName] = useState<string | null>(null)
  const [newPublisherDescription, setNewPublisherDescription] = useState<string | null>(null)
  const [createPublisher] = publisherAPI.useCreatePublisherMutation()
  const [updatePublisher] = publisherAPI.useUpdatePublisherMutation()
  const [uploadPublisherPicture] = pictureAPI.useUploadPublisherPictureMutation()
  const [uploadPublisherMiniPicture] = pictureAPI.useUploadPublisherMiniPictureMutation()
  const { data: publishers } = publisherAPI.useFetchAllPublishersQuery()
  const [fetchAllPublishers] = publisherAPI.useLazyFetchAllPublishersQuery()
  const [deletePublisher] = publisherAPI.useDeletePublisherMutation()
  const [publisherPicture, setPublisherPicture] = useState<string | null>(null)
  const [publisherMiniPicture, setPublisherMiniPicture] = useState<string | null>(null)
  const [pictureUpdated, setPictureUpdated] = useState<boolean>(false)
  const [miniPictureUpdated, setMiniPictureUpdated] = useState<boolean>(false)
  const reader = new FileReader();
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
    const publisherData = {
      id: publisher?.id,
      name: data.get('name')?.toString(),
      description: data.get('description')?.toString(),
    }
    await updatePublisher(publisherData)

    if (pictureUpdated) {
      let picFormData = new FormData()
      picFormData.append('pic', data.get('publisherPicture'))
      const pictureData = {
        id: publisher?.id,
        data: picFormData,
      }
      await uploadPublisherPicture(pictureData)
    }

    if (miniPictureUpdated) {
      let miniPicFormData = new FormData()
      miniPicFormData.append('pic', data.get('publisherMiniPicture'))
      const miniPictureData = {
        id: publisher?.id,
        data: miniPicFormData,
      }
      await uploadPublisherMiniPicture(miniPictureData)
    }
    setPictureUpdated(false)
    setMiniPictureUpdated(false)
    setOpenModal(false)
    fetchAllPublishers()
  }

  const handleClose = () => {
    setOpenModal(false)
  }

  useEffect(() => {
    setPublisherPicture(import.meta.env.VITE_API + publisher?.picturePath)
    setPublisherMiniPicture(import.meta.env.VITE_API + publisher?.miniPicturePath)
  }, [publisher])

  const handleCreateReview = async () => {
    if (!newPublisherName) {
      setCreateError('Publisher name is required')
    } else if (!newPublisherDescription) {
      setCreateError('Publisher description is required')
    } else {
      const publisherData = {
        name: newPublisherName,
        description: newPublisherDescription
      }
      const res = await createPublisher(publisherData)
      if (res.error.status === 400) {
        if (res.error.data) {
          setCreateError(res.error.data)
        } else {
          setCreateError('Something went wrong')
        }
      }
    }
    fetchAllPublishers()
  }

  const handleDelete = async () => {
    await deletePublisher(publisher?.id)
    setPictureUpdated(false)
    setMiniPictureUpdated(false)
    setOpenModal(false)
    fetchAllPublishers()
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
                placeholder="Publisher name"
                onChange={(event) => setNewPublisherName(event.target.value)}
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
              placeholder="Publisher description"
              onChange={(event) => setNewPublisherDescription(event.target.value)}
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
              Create publisher
            </Button>
          </Card>
          {publishers && (
            <Box sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              marginTop: 5
            }}>
              {publishers.map((item, index) => (
                <Card
                  variant="outlined"
                  key={item.id}
                  style={{
                    marginTop: 15,
                    padding: 10,
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setPublisher(item)
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
      {publisher && (
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
                    defaultValue={publisher.name}
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
                    placeholder="Publisher description"
                    defaultValue={publisher.description}
                  />
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'row'
                  }}>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <img src={publisherPicture} style={{
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
                        New publisher picture
                        <input
                          type="file"
                          accept="image/png, image/webp, image/jpeg, image/jpg"
                          name="publisherPicture"
                          id="publisherPicture"
                          onChange={(e) => {
                            const file = e.target.files![0];
                            reader.readAsDataURL(file)!
                            reader.onloadend = () => {
                              setPictureUpdated(true)
                              setPublisherPicture(reader.result as string)
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
                      <img src={publisherMiniPicture} style={{
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
                        New publisher mini picture
                        <input
                          type="file"
                          accept="image/png, image/webp, image/jpeg, image/jpg"
                          name="publisherMiniPicture"
                          id="publisherMiniPicture"
                          onChange={(e) => {
                            const file = e.target.files![0];
                            reader.readAsDataURL(file)!
                            reader.onloadend = () => {
                              setMiniPictureUpdated(true)
                              setPublisherMiniPicture(reader.result as string)
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

export default PublishersEdit;
