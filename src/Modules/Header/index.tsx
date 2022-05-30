import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CustomizedSwitches from './Components/Switch';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '../../constants';
import { useState } from 'react';
import { clearStorage } from '../../store/slices/signinSignupSlice';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@mui/material';
import { mainTheme } from '../../mui';
import ModalNewBoard from '../../components/ModalNewBoard/ModalNewBoard';
import './Header.scss';
import { setMode } from '../../store/slices/signinSignupSlice';

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const token = useAppSelector((state) => state.signinSignup.token);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();
  const pages = [translate('create-new-board')];
  const settings = [translate('edit-profile'), translate('sign-out')];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const signOut = () => {
    handleCloseUserMenu();
    navigate(Paths.home);
    dispatch(clearStorage());
    localStorage.removeItem('token');
  };
  const toProfile = () => {
    dispatch(setMode('edit'));
    navigate(Paths.auth);
  };
  const [header, setHeader] = useState(false);
  const changeBackground = () => {
    if (window.scrollY > 80) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };
  window.addEventListener('scroll', changeBackground);
  return (
    <ThemeProvider theme={mainTheme}>
      <AppBar position="sticky" color={header ? 'secondary' : 'primary'} sx={{ height: '64px' }}>
        <ModalNewBoard isOpen={open} onClose={() => setOpen(false)} item="board" />
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
              <Link to={Paths.home} className="logo__link">
                {translate('PMApp')}
              </Link>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 3,
              }}
            >
              {token && (
                <Box
                  sx={{
                    display: { xs: 'flex', md: 'none' },
                    justifyContent: 'space-between',
                    maxWidth: 'md',
                  }}
                >
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                    {pages.map((page) => (
                      <MenuItem
                        key={page}
                        onClick={() => {
                          setOpen(true);
                          handleCloseNavMenu();
                        }}
                      >
                        <Typography textAlign="center">{translate('Create New Board')}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              )}

              <Box sx={{ flexGrow: 2, display: { xs: 'flex', md: 'none' } }}>
                <Link to={Paths.home} className="logo__link">
                  PMApp
                </Link>
              </Box>

              {token && (
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  {pages.map((page) => (
                    <Button
                      key={page}
                      onClick={() => setOpen(true)}
                      sx={{ color: 'white', display: 'block' }}
                    >
                      {translate('Create New Board')}
                    </Button>
                  ))}
                </Box>
              )}
              <CustomizedSwitches />
              {token ? (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton size="large" onClick={handleOpenUserMenu}>
                      <PermIdentityIcon
                        fontSize="inherit"
                        sx={{ color: 'white' }}
                      ></PermIdentityIcon>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting, index) => (
                      <MenuItem key={setting} onClick={index === 1 ? signOut : toProfile}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              ) : (
                <></>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default ResponsiveAppBar;
