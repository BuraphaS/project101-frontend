/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useState,useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Space,Form,Input,Upload,Table,Image,Select,Tag,Modal } from 'antd';
import Axios from 'axios';
const report = () => {

  const [Reserve,setReserve] = useState([])
  const [User,setUser] = useState(null)

  const deleteCReserve = (id) => {
    Axios.delete(`http://localhost:3000/delete/reserve/${id}`)
      
    swal({
      title:"ลบสำเร็จ",
      icon:"success",
      button:'OK'
    }).then(function(){
      location.reload();})
       
      .catch((error) => {
        console.error(error);
      });
  };
  
  const getReserve = () =>{
    Axios.get('http://localhost:3000/reserve')
    .then (res => {
      setReserve(res.data)
    })
  }
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
  
  useEffect(()=>{
    getUser();
    getReserve();
  },[]);

const [selectedCard, setSelectedCard] = useState(null);
const showModal = (card) => {
    setSelectedCard(card);
    };

const handleCancel = () => {
    setSelectedCard(null);
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

const columns = [
{
  title: 'Room',
  dataIndex: 'id_room',
  align:'center',

},
{
  title: 'id_user',
  dataIndex: 'id_user',
  align:'center',

},
{
  title: 'ชื่อ',
  dataIndex: 'firstname',
  align:'center',
  width:'35%'
},
{
  title: 'นามสกุล',
  dataIndex: 'lastname',
  align:'center',
  width:'35%'
},
{
  title: 'เช็คอิน',
  dataIndex: 'date_start',
  align:'center',
  width:'15%'
},
{
  title: 'เช็คเอาท์',
  dataIndex: 'date_end',
  align:'center',
  width:'15%'
},

{
  title: 'สถานะ',
  dataIndex: 'status',
  width:'100%',
  render: (text) => <h5>{text}</h5>,
},

{
  title: 'แก้ไข / ลบ',
  dataIndex: 'edit',
  align:'center',

},
];
const data = Reserve.map((val, index) => ({
  key: index.toString(),
  id_room:val.id_room,
  id_user:val.id_user,
  firstname:val.firstname,
  lastname:val.lastname,
  date_start: val.date_start,
  date_end: val.date_end,
  status: val.status,
  edit: <div style={{width:'100%',display:'flex',textAlign:'center'}}>  
        <Button style={{marginRight:'0.5rem'}} type="primary" onClick={() => showModal(val)}>Edit</Button>
        <Button type="primary" danger  onClick={() => deleteCReserve(val.id)}>Delete</Button> 
        </div>,
}));

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
          การรายงาน
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

    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>

        <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} style={{boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',margin:'3rem 0rem',height:'90%'}}>
            
          <Table style={{height:'100%',marginBottom:'5.5rem',paddingBottom:'3.5rem'}} columns={columns} dataSource={data} size="small" />

        </Paper>
        </Grid>
    </Grid>

    </Container>

              <Modal 
                    title="รายละเอียด" 
                    open={false} 
                    onOk={{}}
                    onCancel={handleCancel} 
                    width={1000} >
                    <div className='row mb-4'>
                        <div className='col-6'>
                            {/* <img 
                                src={`http://localhost:3000/img/${selectedCard.img}`} 
                                alt="" 
                                style={{width:'100%',height:'100%',borderRadius:'10px'}}/> */}
                        </div>
                        <div className='col-6'>
                            <div className='row'>
                                <div className='col-5 mb-4'>
                                    <h5>ขนาดห้อง</h5>
                                </div>
                                <div className='col-1'>
                                    <h5>:</h5>
                                </div>
                                <div className='col-6'>
                                    {/* <h5>{selectedCard.detail}</h5> */}
                                </div>
                                <div className='col-5 mb-4'>
                                    <h5>ลักษณะเตียง</h5>
                                </div>
                                <div className='col-1'>
                                    <h5>:</h5>
                                </div>
                                <div className='col-6'>
                                    {/* <h5>{selectedCard.bed_type}</h5> */}
                                </div>
                                <div className='col-5 mb-4'>
                                    <h5>จำนวนคน</h5>
                                </div>
                                <div className='col-1'>
                                    <h5>:</h5>
                                </div>
                                <div className='col-6'>
                                    {/* <h5>{selectedCard.quantity} คน</h5> */}
                                </div>
                                <div className='col-5 mb-4'>
                                    <h5>สิ่งอำนวยความสะดวก</h5>
                                </div>
                                <div className='col-1'>
                                    <h5>:</h5>
                                </div>
                                <div className='col-6 mb-4'>
                                    {/* {selectedCard.facilities.split(',').map((item, index) => (
                                        <h5 key={index}>- {item}</h5>
                                    ))}   */}
                                </div>
                                <div className='col-5 mb-4'>
                                    <h5>ราคา</h5>
                                </div>
                                <div className='col-1'>
                                    <h5>:</h5>
                                </div>
                                <div className='col-6'>
                                    {/* <h5>{selectedCard.price} บาท </h5>                                     */}
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
    </div>
  )
}

export default report