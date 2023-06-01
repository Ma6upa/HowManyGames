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
  MenuItem,
  Select
} from "@mui/material"
import { useAppSelector } from "../hooks/redux";


const UserSettingsPage = () => {
  const { id } = useParams();
  const { user } = useAppSelector(state => state.userReducer);
  const theme = createTheme();

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
                value={user?.user.nickname}
                autoFocus
              />
              <InputLabel id="demo-simple-select-label" style={{ marginBottom: -10 }}>E-mail</InputLabel>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                value={user?.user.email}
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
              >
                DELETE USER
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
                id="age"
                value={user?.user.age}
              />
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                required
                fullWidth
                name="gender"
                id="gender"
                defaultValue={user ? user.user.gender : "Male"}
              >
                <MenuItem value="Male">
                  Male
                </MenuItem>
                <MenuItem value="Female">
                  Female
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
                      width: 250
                    }}
                  >
                    Choose new avatar
                  </Button>
                  <Box style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 55,
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
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  )
}

export default UserSettingsPage
