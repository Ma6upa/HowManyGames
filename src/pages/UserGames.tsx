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


const UserListGames = () => {
  const { listType } = useParams();
  const { user } = useAppSelector(state => state.userReducer);
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box sx={{
          marginTop: 8,
          display: 'flex',
          justifyContent: 'flex-start',
          marginBottom: 8,
        }}>
          {!user && (
            <Box>
              <Typography component="h1" variant="h4">
                Происходит загрузка...
              </Typography>
            </Box>
          )}
          {user && (
            <Box>
              <Typography component="h1" variant="h4">
                {user.user.nickname}
              </Typography>
              <Typography component="h1" variant="h5">
                {listType}
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default UserListGames
