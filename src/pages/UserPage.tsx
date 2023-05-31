import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  Card,
  Divider,
} from "@mui/material"
import { useAppSelector } from "../hooks/redux";


const UserPage = () => {
  const { id } = useParams();
  const theme = createTheme();
  const { user } = useAppSelector(state => state.userReducer);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        {user && (
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row'
            }}>
              <Box sx={{
                width: '20%'
              }}>
                <img src={import.meta.env.VITE_API + `/${user.user.picturePath}`} style={{
                  width: '100%',
                }} alt="No picture" />
              </Box>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: 7
              }}>
                <Typography component="h1" variant="h4">
                  {user.user.nickname}
                </Typography>
                <Typography variant="h6">
                  {user.user.gender} / {user.user.age} / on this site from {user.user.registrationdDate}
                </Typography>
                <Typography variant="h5">
                  Game Lists
                </Typography>
                <Link style={{ textDecoration: 'none', color: 'black' }}>
                  <Typography variant="h6">
                    Planed / Playing / Completed / Dropped / On hold
                  </Typography>
                </Link>
              </Box>
            </Box>
            <Card variant="outlined" style={{
              width: '100%',
              marginTop: 10,
              padding: '10px 10px 0px 10px'
            }}>
              <Typography variant="h5">
                FAVOURITE GAMES
              </Typography>
              <Divider />
              <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                padding: '10px 10px 0px 10px'
              }}>
                {user.favouriteGames?.map((item, index) => (
                  <div
                    style={{
                      marginLeft: 10,
                      width: 150,
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                    key={item.id}
                  >
                    <img src={import.meta.env.VITE_API + `/${item.picturePath}`} style={{
                      width: 150,
                      height: 200
                    }} alt="No picture" />
                    <Typography variant="h6">
                      {item.name}
                    </Typography>
                  </div>
                ))}
              </div>
            </Card>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  )
}

export default UserPage
