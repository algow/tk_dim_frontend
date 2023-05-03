import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { 
  Routes, 
  Route
} from 'react-router-dom';
import Barang from '../views/Barang';
import { isAuthenticated, logout } from '../utils/utils';
import { Grid, IconButton, Menu, MenuItem } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import {useNavigate} from "react-router-dom";


const theme = createTheme();

export default function Album() {
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const routes = [
    {
      path: "/",
      element: <Barang />
    },
    {
      path: "/barang",
      element: <Barang />
    },
  ];
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Grid container spacing={2} direction="row">
            <Grid container xs={7}>
              <Typography variant="h6" color="inherit" noWrap>
                TK DIM
              </Typography>
            </Grid>
            <Grid container xs={5} justifyContent="flex-end">
              <div>
                {/* Jika user login tampilkan notif projects dan profil */}
                {
                  isAuthenticated() ?
                  <>
                    <IconButton 
                      color="inherit" 
                      aria-label="pembelian"
                      // onClick={() => navigate('/projects')}  
                    >
                      <AddCircleIcon />
                    </IconButton>
                    <IconButton 
                      color="inherit" 
                      aria-label="penjualan"
                      // onClick={() => navigate('/projects')}  
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <AccountCircleIcon />
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
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={() => logout(navigate)}>Sign Out</MenuItem>
                    </Menu>
                  </> :
                  <IconButton 
                    color="inherit" 
                    aria-label="login"
                    onClick={() => navigate('/login')}  
                  >
                    <LoginIcon />
                  </IconButton>
                }
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h2"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Tugas Kelompok DIM
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents,
              the creator, etc. Make it short and sweet, but not too short so folks
              don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Mulai</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Routes>
          {
            routes.map( (item, index) => (
              <Route path={item.path} element={item.element} key={index}/>
            ))
          }
          </Routes>
        </Container>
      </main>
    </ThemeProvider>
  );
}
