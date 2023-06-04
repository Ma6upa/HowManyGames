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
import { genresAPI } from "../store/api/genresApi";
import { IGenre } from "../interfaces/IFiltersConsts";

const GenresEdit = () => {
  const theme = createTheme();
  const { user } = useAppSelector(state => state.userReducer)
  const [createError, setCreateError] = useState<string | null>(null)
  const [genre, setGenre] = useState<IGenre | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const [newGenreName, setNewGenreName] = useState<string | null>(null)
  const [newGenreDescription, setNewGenreDescription] = useState<string | null>(null)
  const [createGenre] = genresAPI.useCreateGenreMutation()
  const [updateGenre] = genresAPI.useUpdateGenreMutation()
  const [deleteGenre] = genresAPI.useDeleteGenreMutation()
  const { data: genres } = genresAPI.useFetchAllGenresQuery()
  const [fetchAllGenres] = genresAPI.useLazyFetchAllGenresQuery()
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
    const genreData = {
      id: genre?.id,
      name: data.get('name')?.toString(),
      description: data.get('description')?.toString(),
    }
    await updateGenre(genreData)
    setOpenModal(false)
    fetchAllGenres()
  }

  const handleDelete = async () => {
    await deleteGenre(genre?.id)
    setOpenModal(false)
    fetchAllGenres()
  }

  const handleClose = () => {
    setOpenModal(false)
  }

  const handleCreateReview = async () => {
    if (!newGenreName) {
      setCreateError('Genre name is required')
    } else if (!newGenreDescription) {
      setCreateError('Genre description is required')
    } else {
      const genreData = {
        name: newGenreName,
        description: newGenreDescription
      }
      const res = await createGenre(genreData)
      if (res.error.status === 400) {
        if (res.error.data) {
          setCreateError(res.error.data)
        } else {
          setCreateError('Something went wrong')
        }
      }
    }
    fetchAllGenres()
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
                placeholder="Genre name"
                onChange={(event) => setNewGenreName(event.target.value)}
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
              placeholder="Genre description"
              onChange={(event) => setNewGenreDescription(event.target.value)}
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
              Create genre
            </Button>
          </Card>
          {genres && (
            <Box sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              marginTop: 5
            }}>
              {genres.map((item, index) => (
                <Card
                  variant="outlined"
                  key={item.id}
                  style={{
                    marginTop: 15,
                    padding: 10,
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setGenre(item)
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
      {genre && (
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
                    defaultValue={genre.name}
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
                    placeholder="Genre description"
                    defaultValue={genre.description}
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

export default GenresEdit;
