import { useState, useEffect } from "react";
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
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { userAPI } from "./store/api/userApi";
import { userSlice } from "./store/reducers/UserSlice";
import UserPage from "./pages/UserPage";
import UserSettingsPage from "./pages/UserSetting";
import UserListGames from "./pages/UserGames";

const App = () => {
  const { user } = useAppSelector(state => state.userReducer)
  const [anchorEl, setAnchorEl] = useState(null);
  const [fetchUser, { }] = userAPI.useFetchUserMutation();
  const { addUser } = userSlice.actions;
  const dispatch = useAppDispatch();

  const parseJwt = (token: string) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  const logOut = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  const handleMenu = (event: React.SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const autoLogin = async (token: string) => {
    const userRes = await fetchUser(Number(parseJwt(token).Id))
    dispatch(addUser(userRes.data))
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      autoLogin(localStorage.getItem('token')!)
    }
  }, [])

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
                  <Link to={'/user/' + user.user.id} style={{ textDecoration: 'none', color: 'black' }}>
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
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to={'/userSettings/' + user.user.id} style={{ textDecoration: 'none', color: 'black' }}>
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
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginTop: 2
                    }}
                    onClick={() => logOut()}
                  >
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
      </AppBar >
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/game/:id" element={<GamePage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/userSettings/:id" element={<UserSettingsPage />} />
        <Route path="/completed/:id" element={<UserListGames />} />
      </Routes>
    </>
  )
}

export default App
