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
  MenuItem,
  Select,
  Modal,
  Divider
} from "@mui/material"
import { useAppSelector } from "../hooks/redux";
import { userAPI } from "../store/api/userApi";
import { useState } from "react";

const UserSettingsPage = () => {
  const { user } = useAppSelector(state => state.userReducer);
  const [success, setSuccess] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [updateUser] = userAPI.useUpdateUserMutation()
  const [deleteUser] = userAPI.useDeleteUserMutation()
  const theme = createTheme();

  const handleClose = () => {
    setOpenModal(false)
  }

  const handleDelete = async () => {
    await deleteUser(user.user.id)
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.currentTarget as HTMLFormElement;
    const data = new FormData(target);
    const userData = {
      id: user?.user.id,
      nickname: data.get('nickname')?.toString(),
      password: data.get('password')?.toString() || null,
      email: data.get('email')?.toString(),
      age: Number(data.get('age')),
      gender: data.get('gender')?.toString(),
    }
    const res = await updateUser(userData)
    if (res.error) {
      setSuccess(res.error.data)
      setTimeout(() => {
        setSuccess(null)
      }, 4000)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />

        <Box sx={{
          marginTop: 8,
          display: 'flex',
          justifyContent: 'flex-start'
        }}>
          <Typography component="h1" variant="h4">
            Settings
          </Typography>
        </Box>
        {user && (
          <Box
            component="form" onSubmit={handleSubmit} noValidate
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{
              width: '40%',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <InputLabel id="demo-simple-select-label" style={{ marginBottom: -10 }}>Login (Nickname)</InputLabel>
              <TextField
                margin="normal"
                required
                fullWidth
                id="nickname"
                name="nickname"
                defaultValue={user?.user.nickname}
                autoFocus
              />
              <InputLabel id="demo-simple-select-label" style={{ marginBottom: -10 }}>E-mail</InputLabel>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                defaultValue={user?.user.email}
              />
              <InputLabel id="demo-simple-select-label" style={{ marginBottom: -10 }}>Password</InputLabel>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                type="password"
                id="password"
              />
              <Button
                variant="contained"
                color="error"
                sx={{ marginTop: 2 }}
                onClick={() => setOpenModal(true)}
              >
                <Typography component="h1" variant="h6">
                  DELETE USER
                </Typography>
              </Button>
            </Box>
            <Box sx={{
              width: '40%',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <InputLabel id="demo-simple-select-label" style={{ marginBottom: -10 }}>Age</InputLabel>
              <TextField
                margin="normal"
                required
                fullWidth
                type="number"
                name="age"
                id="age"
                defaultValue={user?.user.age}
              />
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                required
                fullWidth
                name="gender"
                id="gender"
                defaultValue={user ? user.user.gender : "male"}
              >
                <MenuItem value="male">
                  male
                </MenuItem>
                <MenuItem value="female">
                  female
                </MenuItem>
              </Select>
              <Box sx={{
                display: 'flex',
                flexDirection: 'row'
              }}>
                <img src={import.meta.env.VITE_API + `/${user.user.picturePath}`} style={{
                  width: 150,
                  height: 150,
                  marginTop: 20
                }} alt="No picture" />
                <Box sx={{
                  marginLeft: 5,
                  marginTop: 5
                }}>
                  <Button
                    variant="contained"
                    style={{
                      float: 'right',
                      width: 250,
                      marginTop: -20
                    }}
                  >
                    Choose new avatar
                  </Button>
                  <Box style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 80,
                    float: 'right'
                  }}>
                    <Button
                      variant="outlined"
                      style={{
                        marginRight: 10
                      }}
                    >
                      Undo
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
        {success && (
          <Box sx={{
            marginTop: 8,
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Typography component="h1" variant="h5" style={{ color: '#198754' }}>
              {success}
            </Typography>
          </Box>
        )}
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
            marginTop: '30%',
            borderRadius: 5,
            padding: 5
          }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">
                Are you sure you want to delete your account?
              </Typography>
              <Typography variant="h6">
                (this can not be undone)
              </Typography>
              <Divider />
              <Box
                sx={{
                  alignItems: 'center',
                  textAlign: 'center',
                  marginTop: 2,

                }}
              >
                <Button
                  variant="contained"
                  onClick={handleDelete}
                >
                  OK
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Modal>
    </ThemeProvider>
  )
}

export default UserSettingsPage
