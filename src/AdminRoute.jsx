/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import * as React from 'react'
import {useEffect,useState} from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import Axios from 'axios';

import MainListItems from './component/mainListItems';
import SecondaryListItems from './component/secondaryListItems';

const AdminRoute = ({children}) => {
  const [User,setUser] = useState(null)

  const getUser = () => {
      
      const token = localStorage.getItem('token');
      
        Axios.get("http://localhost:3000/userlog", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            setUser(response.data);
          })
          .catch((error) => {
            console.error('Error', error);
          });
      
    };

    useEffect(() => {
      getUser();
    }, []);


    const drawerWidth = 240;

    const AppBar = styled(MuiAppBar, {
      shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }),
    }));
    
    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
      ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
          position: 'relative',
          whiteSpace: 'nowrap',
          width: drawerWidth,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          boxSizing: 'border-box',
          ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
              width: theme.spacing(9),
            },
          }),
        },
      }),
    );
    
    const mdTheme = createTheme();
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
    };

  return (
    <div>
         <ThemeProvider theme={mdTheme}>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="absolute" open={open}>
            
              <Toolbar
                sx={{
                  pr: '24px',backgroundColor:"#111927" 
                }}
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{
                    marginRight: '36px',
                    ...(open && { display: 'none' }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  
                </Typography>
                {User ? (
                  <a href='/changeAdmin' style={{textDecoration:'none',color:'#ffffff'}}>
                  {User.firstname} {User.lastname}
                  </a>
                ):
                <a href='#'>
                  
                </a>
                }
                
              </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
              <Toolbar
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  px: [1],
                }}
              >
                <h2 style={{width:'100%',margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'center'}}>LOGO</h2>
                {/* <img style={{width:"150px",margin:"5px 5px"}} src={Logo} alt="" /> */}
                <IconButton onClick={toggleDrawer}>
                  <ChevronLeftIcon />
                </IconButton>
              </Toolbar>
              <Divider />
              <List component="nav"
                sx={{
                  backgroundColor:"light" ,
                  
                  height:"100%"
                }}>
                <MainListItems/>
                <Divider sx={{ my: 1 }} />
               <SecondaryListItems/>
              </List>
            </Drawer>
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
              }}
            >
              <Toolbar />

              {children}
            </Box>
          </Box>
        </ThemeProvider>
    </div>
  )
}

export default AdminRoute