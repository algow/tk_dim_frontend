import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { 
  Routes, 
  Route
} from 'react-router-dom';
import Barang from '../views/Barang';
import { getUserData, isAuthenticated, logout } from '../utils/utils';
import { Box, Grid, IconButton, Menu, MenuItem } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import {useNavigate} from "react-router-dom";
import Pembelian from '../views/Pembelian';
import Penjualan from '../views/Penjualan';
import Dashboard from '../views/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import AirplayIcon from '@mui/icons-material/Airplay';


const theme = createTheme();

export default function Default() {
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
    {
      path: "/pembelian",
      element: <Pembelian />
    },
    {
      path: "/penjualan",
      element: <Penjualan />
    },
    {
      path: "/dashboard",
      element: <Dashboard />
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
      {/* <div style={{minHeight:'100vh'}}> */}
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar>
            <Grid container direction="row">
              <Grid container xs={7}>
                <Typography variant="h6" color="inherit" noWrap>
                  TK DIM
                </Typography>
              </Grid>
              <Grid container xs={5} justifyContent="flex-end">
                <div>
                  {
                    isAuthenticated() ?
                    <>
                      <IconButton 
                        color="inherit" 
                        aria-label="home"
                        onClick={() => navigate('/')}  
                      >
                        <HomeIcon />
                      </IconButton>
                      <IconButton 
                        color="inherit" 
                        aria-label="dashboard"
                        onClick={() => navigate('/dashboard')}  
                      >
                        <AirplayIcon  />
                      </IconButton>
                      <IconButton 
                        color="inherit" 
                        aria-label="pembelian"
                        onClick={() => navigate('/pembelian')}  
                      >
                        <AddCircleIcon />
                      </IconButton>
                      <IconButton 
                        color="inherit" 
                        aria-label="penjualan"
                        onClick={() => navigate('/penjualan')}  
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
                        <MenuItem onClick={handleClose}>{getUserData()['NamaPengguna']}</MenuItem>
                        <MenuItem onClick={handleClose}>{getUserData()['NamaAkses']}</MenuItem>
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
          <Container sx={{ py: 12 }} maxWidth="xl">
            <Routes>
            {
              routes.map( (item, index) => (
                <Route path={item.path} element={item.element} key={index}/>
              ))
            }
            </Routes>
          </Container>
        </main>
        <Box sx={{ bgcolor: '#f6f6f6', p: 3}} component="footer">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant='h6'>Tugas kelompok week 4</Typography>
              <Typography variant='h6'>Introduction to Data and Information Management</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='subtitle1'>Algo Wijaya (NIM 2602269430) </Typography>
              <Typography variant='subtitle1'>Yohana Miranda Manik (NIM 2602269475) </Typography>
              <Typography variant='subtitle1'>Akhyar Dhifi Reza Pratama Budi (NIM 2602269544) </Typography>
              <Typography variant='subtitle1'>Muhammad Rifqi Saifudin (NIM 2602269336) </Typography>
              <Typography variant='subtitle1'>Azizul Hakim (NIM 2602269405) </Typography>
            </Grid>
          </Grid>
        </Box>
      {/* </div> */}
    </ThemeProvider>
  );
}
