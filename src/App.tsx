import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import RegistrationPage from "./pages/RegistrationPage";
import AuthPage from "./pages/AuthPage";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import LoginIcon from '@mui/icons-material/Login';
import GamePage from "./pages/GamePage";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import CodeIcon from '@mui/icons-material/Code';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import TagIcon from '@mui/icons-material/Tag';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import ComputerIcon from '@mui/icons-material/Computer';
import { userAPI } from "./store/api/userApi";
import { userSlice } from "./store/reducers/UserSlice";
import UserPage from "./pages/UserPage";
import UserSettingsPage from "./pages/UserSetting";
import UserListGames from "./pages/UserGames";
import StatisticsPage from "./pages/StatisticsPage";
import SearchAutocomplete from "./components/searchAutocomplete";
import DeveloperPage from "./pages/DeveloperPage";
import PublisherPage from "./pages/PublisherPage";
import DevelopersPublishersEditPage from "./pages/DevelopersEditPage";
import TagsGenresPlatformsEditPage from "./pages/TagsGenresPlatformsEditPage";

const App = () => {
  const { user } = useAppSelector(state => state.userReducer)
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
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

  useEffect(() => {
    setIsAdmin(user?.user.userRoles[1].roleName === 'admin')
  }, [user])

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: '#1e1e1e' }}>
        <Toolbar variant="dense">
          <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
            <Typography component="h2" variant="h6">
              HowManyGames
            </Typography>
          </Link>
          <Link to='/statistics' style={{ textDecoration: 'none', color: 'white' }}>
            <IconButton>
              <LeaderboardIcon style={{ color: 'white' }} />
            </IconButton>
          </Link>
          <SearchAutocomplete />
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
                  <Link to={'/settings'} style={{ textDecoration: 'none', color: 'black' }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginTop: 2
                    }}>
                      <SettingsIcon />
                      <Typography variant="h6" style={{
                        marginLeft: 5,
                        marginTop: -3
                      }}>
                        Settings
                      </Typography>
                    </div>
                  </Link>
                </MenuItem>
                {isAdmin && (
                  <MenuItem onClick={handleClose}>
                    <Link to={'/edit/developers'} style={{ textDecoration: 'none', color: 'black' }}>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 2
                      }}>
                        <CodeIcon />
                        <Typography variant="h6" style={{
                          marginLeft: 5,
                          marginTop: -3
                        }}>
                          Developers
                        </Typography>
                      </div>
                    </Link>
                  </MenuItem>
                )}
                {isAdmin && (
                  <MenuItem onClick={handleClose}>
                    <Link to={'/edit/publishers'} style={{ textDecoration: 'none', color: 'black' }}>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 2
                      }}>
                        <PublishedWithChangesIcon />
                        <Typography variant="h6" style={{
                          marginLeft: 5,
                          marginTop: -3
                        }}>
                          Publishers
                        </Typography>
                      </div>
                    </Link>
                  </MenuItem>
                )}
                {isAdmin && (
                  <MenuItem onClick={handleClose}>
                    <Link to={'/editCreate/tags'} style={{ textDecoration: 'none', color: 'black' }}>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 2
                      }}>
                        <TagIcon />
                        <Typography variant="h6" style={{
                          marginLeft: 5,
                          marginTop: -3
                        }}>
                          Tags
                        </Typography>
                      </div>
                    </Link>
                  </MenuItem>
                )}
                {isAdmin && (
                  <MenuItem onClick={handleClose}>
                    <Link to={'/editCreate/genres'} style={{ textDecoration: 'none', color: 'black' }}>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 2
                      }}>
                        <VideogameAssetIcon />
                        <Typography variant="h6" style={{
                          marginLeft: 5,
                          marginTop: -3
                        }}>
                          Genres
                        </Typography>
                      </div>
                    </Link>
                  </MenuItem>
                )}
                {isAdmin && (
                  <MenuItem onClick={handleClose}>
                    <Link to={'/editCreate/platforms'} style={{ textDecoration: 'none', color: 'black' }}>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 2
                      }}>
                        <ComputerIcon />
                        <Typography variant="h6" style={{
                          marginLeft: 5,
                          marginTop: -3
                        }}>
                          Platforms
                        </Typography>
                      </div>
                    </Link>
                  </MenuItem>
                )}
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
                      marginTop: -3
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
        <Route path="/settings" element={<UserSettingsPage />} />
        <Route path="/completed/:listType" element={<UserListGames />} />
        <Route path="/developer/:id" element={<DeveloperPage />} />
        <Route path="/publisher/:id" element={<PublisherPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/edit/:entity" element={<DevelopersPublishersEditPage />} />
        <Route path="/editCreate/:entity" element={<TagsGenresPlatformsEditPage />} />
      </Routes>
    </>
  )
}

export default App
