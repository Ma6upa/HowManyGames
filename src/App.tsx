import { useState } from "react";
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
  InputAdornment,
  Menu,
  MenuItem,
} from "@mui/material";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import GamePage from "./pages/GamePage";
import { useAppSelector } from "./hooks/redux";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const App = () => {
  const { user } = useAppSelector(state => state.userReducer)
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event: React.SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          {!user && (
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
          )}
          {user && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: 2
                }}>
                  <img src={import.meta.env.VITE_API + `/${user.user.picturePath}`} style={{
                    width: 35,
                    height: 35,
                  }} alt="No picture" />
                  <Typography variant="h6" style={{
                    marginLeft: 5
                  }}>
                    {user.user.nickname}
                  </Typography>
                </div>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 2
                  }}>
                    <img src={import.meta.env.VITE_API + `/${user.user.picturePath}`} style={{
                      width: 30,
                      height: 30,
                    }} alt="No picture" />
                    <Typography variant="h6" style={{
                      marginLeft: 5
                    }}>
                      {user.user.nickname}
                    </Typography>
                  </div>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 2
                  }}>
                    <SettingsIcon />
                    <Typography variant="h6" style={{
                      marginLeft: 5,
                      marginTop: -2
                    }}>
                      Settings
                    </Typography>
                  </div>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 2
                  }}>
                    <LogoutIcon />
                    <Typography variant="h6" style={{
                      marginLeft: 5,
                      marginTop: -2
                    }}>
                      Log out
                    </Typography>
                  </div>
                </MenuItem>
              </Menu>
            </div>
          )}
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
