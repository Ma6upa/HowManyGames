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
import { tagsAPI } from "../store/api/tagsApi";
import { ITag } from "../interfaces/IFiltersConsts";

const TagsEdit = () => {
  const theme = createTheme();
  const { user } = useAppSelector(state => state.userReducer)
  const [createError, setCreateError] = useState<string | null>(null)
  const [tag, setTag] = useState<ITag | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const [newTagName, setNewTagName] = useState<string | null>(null)
  const [newTagDescription, setNewTagDescription] = useState<string | null>(null)
  const [createTag] = tagsAPI.useCreateTagMutation()
  const [updateTag] = tagsAPI.useUpdateTagMutation()
  const [deleteTag] = tagsAPI.useDeleteTagMutation()
  const { data: tags } = tagsAPI.useFetchAllTagsQuery()
  const [fetchAllTags] = tagsAPI.useLazyFetchAllTagsQuery()
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
    const tagData = {
      id: tag?.id,
      name: data.get('name')?.toString(),
      description: data.get('description')?.toString(),
    }
    await updateTag(tagData)
    setOpenModal(false)
    fetchAllTags()
  }

  const handleDelete = async () => {
    await deleteTag(tag?.id)
    setOpenModal(false)
    fetchAllTags()
  }

  const handleClose = () => {
    setOpenModal(false)
  }

  const handleCreateReview = async () => {
    if (!newTagName) {
      setCreateError('Tag name is required')
    } else if (!newTagDescription) {
      setCreateError('Tag description is required')
    } else {
      const tagData = {
        name: newTagName,
        description: newTagDescription
      }
      const res = await createTag(tagData)
      if (res.error.status === 400) {
        if (res.error.data) {
          setCreateError(res.error.data)
        } else {
          setCreateError('Something went wrong')
        }
      }
    }
    fetchAllTags()
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
                placeholder="Tag name"
                onChange={(event) => setNewTagName(event.target.value)}
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
              placeholder="Tag description"
              onChange={(event) => setNewTagDescription(event.target.value)}
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
              Create tag
            </Button>
          </Card>
          {tags && (
            <Box sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              marginTop: 5
            }}>
              {tags.map((item, index) => (
                <Card
                  variant="outlined"
                  key={item.id}
                  style={{
                    marginTop: 15,
                    padding: 10,
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setTag(item)
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
      {tag && (
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
                    defaultValue={tag.name}
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
                    placeholder="Tag description"
                    defaultValue={tag.description}
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

export default TagsEdit;
