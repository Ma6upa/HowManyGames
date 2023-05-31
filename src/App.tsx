import { Link, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import RegistrationPage from "./pages/RegistrationPage";
import AuthPage from "./pages/AuthPage";
import {
  AppBar,
  IconButton,
  TextField,
  Toolbar,
  Typography,
  InputAdornment
} from "@mui/material";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import GamePage from "./pages/GamePage";

const App = () => {
  return (
    <>
      <AppBar position="static" style={{ backgroundColor: '#1e1e1e' }}>
        <Toolbar variant="dense">
          <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
            <Typography component="h2" variant="h6">
              HowManyGames
            </Typography>
          </Link>
          <IconButton>
            <LeaderboardIcon style={{ color: 'white' }} />
          </IconButton>
          <TextField
            style={{
              backgroundColor: 'white',
              width: '80%'
            }}
            variant="standard"
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={{ paddingLeft: 5 }}>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Link to='/login' style={{ textDecoration: 'none', color: 'white' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              cursor: 'pointer',
              marginLeft: 20
            }}>
              <LoginIcon style={{ marginTop: 3 }} />
              <Typography component="h2" variant="h6" style={{
                marginLeft: 5
              }}>
                Log in
              </Typography>
            </div>
          </Link>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/game/:id" element={<GamePage />} />
      </Routes>
    </>
  )
}

export default App
