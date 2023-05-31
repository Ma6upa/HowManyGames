import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { authRegAPI } from "../store/api/authRegApi";
import { userSlice } from "../store/reducers/UserSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { userAPI } from "../store/api/userApi";

const AuthForm = () => {
  const theme = createTheme();
  const [login, { }] = authRegAPI.useLoginMutation();
  const [fetchUser, { }] = userAPI.useFetchUserMutation();
  const { user } = useAppSelector(state => state.userReducer)
  const { addUser } = userSlice.actions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const parseJwt = (token: string) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.currentTarget as HTMLFormElement;
    const data = new FormData(target);
    const userData = {
      password: data.get('password')?.toString() || null,
      nickname: data.get('nickname')?.toString() || null,
    }
    const res = await login(userData)
    localStorage.setItem('token', res.error.data)
    const userRes = await fetchUser(Number(parseJwt(res.error.data).Id))
    dispatch(addUser(userRes.data))
  }

  useEffect(() => {
    if (user) {
      navigate(`/`)
    }
  }, [user])

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
            Authorization
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nickname"
              label="Login (Nickname)"
              name="nickname"
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
            <Link to={'/registration'}>
              <Button
                variant="outlined"
                sx={{ mt: 3, mb: 2, ml: 2 }}
              >
                Sign In
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default AuthForm;
