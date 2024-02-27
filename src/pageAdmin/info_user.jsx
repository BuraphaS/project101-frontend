/* eslint-disable no-dupe-keys */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React from 'react'
import {useState,useEffect} from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Select,Table,Button,Space } from 'antd';
import MenuItem from '@mui/material/MenuItem';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import emailjs from '@emailjs/browser'
import Axios from 'axios'
const info_user = () => {

  const [User,setUser] = useState([]);
  const [newRole,setNewRole] = useState('');

  const [newPassword, setNewPassword] = useState(null);

  const sendEmail = (e) => {
    emailjs.sendForm('service_ad3cdc5','template_cbaahir',e.target,'O_92cZxzgnDy0-iQJ')
  }
  const handleChange = (value) => {
    setNewRole(value);
    console.log(`selected ${value}`);
  };
  const generateRandomNumber = () => {
    const newRandomNumber = Math.floor(Math.random() * 100000) + 1;
    setNewPassword(newRandomNumber);
  };

    const getUser = () =>{
        Axios.get('http://localhost:3000/user')
        .then ((response) => {
            setUser(response.data)
        })
    }
    useEffect(() => {
        getUser();
        getUser2();

      }, []);
    const editRole = (id) =>{
      Axios.put(`http://localhost:3000/Edit/role/${id}`,{
        
      role: newRole || User.role,
        
      })
        .then(function (response) {
        console.log(response);
        swal({
          title:"เปลี่ยนบทบาท สำเร็จ",
          icon:"success",
          button:'OK'
        }).then(function(){
          location.reload();})
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    const resetPass = async (id) => {
      try {
        // Generate a new random password
        generateRandomNumber();
        console.log(newPassword);
    
        // Update the user's password
        await Axios.put(`http://localhost:3000/reset/password/${id}`, {
          password: newPassword,
        });
    
        // Send an email
        const fakeEvent = { target: document.querySelector('form') };
        await sendEmail(fakeEvent);
    
        // Display success message
        await swal({
          title: "รีเซ็ตรหัสผ่าน",
          icon: "success",
          button: 'OK',
        })
        .then(function () {
        
        });
      } catch (error) {
        console.error("Password reset failed:", error);
        // Display an error message to the user
        swal({
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถรีเซ็ตรหัสผ่านได้",
          icon: "error",
          button: 'OK',
        });
      }
    };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'อีเมล',
      dataIndex: 'email',
    },
    {
      title: 'ชื่อผู้ใช้',
      dataIndex: 'username',
    },
    {
      title: 'ชื่อจริง',
      dataIndex: 'firstname',
    },
    {
      title: 'นามสกุล',
      dataIndex: 'lastname',
    },
    {
      title: 'โทรศัพท์',
      dataIndex: 'phone',
    },
    {
      title: 'บทบาท',
      dataIndex: 'role',
    },
    {
      title: 'แก้ไข',
      dataIndex: 'edit',
      align:"center"
    },
    {
      title: 'รีเซ็ตรหัสผ่าน',
      dataIndex: 'reset',
      align:"center"
      
    },
  ];
  const data = User.map((val, index) => ({
    key: index,
    id: val.id,
    email: val.email,
    username:val.username,
    firstname:val.firstname,
    lastname:val.lastname,
    phone:val.phone,
    role:val.role,
    edit: 
      <>
      <Select
        id="role"
        defaultValue={val.role}
        style={{
          width: "45%",
          display:'flex',
          margin:'1rem',
          display: "inline-block",
          border: "1px solid #ccc",
          borderRadius: "4px",
          height: '35px',
          color: '#ffffff',                      
        }}
        onChange={handleChange}
        options={[
          {
            value: 'Admin',
            label: 'Admin',
          },
          {
            value: 'User',
            label: 'User',
          }
        ]}
      >
      </Select>
      <Button type='primary' onClick={() => editRole(val.id)}>ยืนยัน</Button>
      </>,
      reset:<form onSubmit={sendEmail}>
              <input type='hidden' id='email' name='email' defaultValue={val.email} ></input>
              <input type='hidden' id='new_password' name='newPassword' defaultValue={newPassword}></input>
              <Button type='submit' danger onClick={() => resetPass(val.id)}>รีเซ็ต</Button>
            </form>
  }));

  const [User2,setUser2] = useState(null)

      const getUser2 = () => {
          
          const token = localStorage.getItem('token');
          
            Axios.get("http://localhost:3000/userlog", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((response) => {
                setUser2(response.data);
              })
              .catch((error) => {
                console.error('Error', error);
              });
          
        };

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
              ข้อมูลผู้ใช้
            </Typography>

            {User2 ? (
              <a href='/changeAdmin' style={{textDecoration:'none',color:'#ffffff'}}>
              {User2.firstname} {User2.lastname}
              </a>
            ):
            <a href='#'>
              
            </a>
            }
            
          </Toolbar>
        </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>

                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} style={{boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',margin:'3rem 0rem',height:'90%'}}>
                      <Table style={{height:'100%',marginBottom:'5.5rem',paddingBottom:'3.5rem'}} columns={columns} dataSource={data} size=" " />
                    </Paper>
                  </Grid>
                </Grid>
       
              </Container>
    </div>
  )
}

export default info_user