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
  Select
} from "@mui/material"
import { useAppSelector } from "../hooks/redux";
import { userAPI } from "../store/api/userApi";
import { useState } from "react";

const UserSettingsPage = () => {
  const { user } = useAppSelector(state => state.userReducer);
  const [success, setSuccess] = useState(null)
  const [updateUser, { isLoading }] = userAPI.useUpdateUserMutation()
  const theme = createTheme();

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
    </ThemeProvider>
  )
}

export default UserSettingsPage
