import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material"

const RegistrationForm = () => {
  const theme = createTheme();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.currentTarget as HTMLFormElement;
    const data = new FormData(target);
    const userData = {
      email: data.get('email')?.toString() || null,
      password: data.get('password')?.toString() || null,
      nickname: data.get('nickname')?.toString() || null,
    }
    console.log(userData)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography component="h1" variant="h5">
            Registration
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nickname"
              label="Nickname"
              name="nickname"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Enter
            </Button>
            <Link to={'/login'}>
              <Button
                variant="outlined"
                sx={{ mt: 3, mb: 2, ml: 2 }}
              >
                Log in
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default RegistrationForm;
