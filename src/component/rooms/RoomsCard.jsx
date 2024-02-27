/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React from 'react'
import { useState,useEffect } from 'react';
import { Button,Select,Space, Modal,Form,Input,Upload,Table,Image,DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Axios from 'axios';
import { NumericFormat } from 'react-number-format';
import { TextField } from '@mui/material';
import moment from 'moment'; 
import swal from 'sweetalert';
import Swal from 'sweetalert2'

const { RangePicker } = DatePicker;

const RoomsCard = () => {

    const [calendarStart,setCalendarStart] = useState('')
    const [calendarEnd,setCalendarEnd] = useState('')
    const [numGuests,setNumGuests] = useState('')

    const token = localStorage.getItem('token');
    
    const [data,setData] = useState([])
    const [userData, setUserData] = useState('');
    const getCard= () =>{
    Axios.get('http://localhost:3000/room')
    .then (res => {
        setData(res.data)
    })
    }
    
   const addReserve = () => {
        Swal.fire({
            title: "ยืนยันการจองห้อง",
            text: "ยืนยันการจองห้อง",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "ยืนยัน!",
            cancelButtonText: 'ยกเลิก'

          }).then((result) => {
            if (result.isConfirmed) {
            Axios.post('http://localhost:3000/reserve',{
                id_room: selectedCard.id,
                id_user: userData.id,
                date_start: calendarStart,
                date_end: calendarEnd,
                num_guests: numGuests
            })
            .then (function(response){
                console.log('Reservation added successfully:', response.data);
            })
            .catch(error => {
                console.error('Error adding reservation:', error);
            });
            Swal.fire({
                title: "จองห้องสำเร็จ!",
                text: "",
                icon: "success"
            })
            .then(function(){
                // location.reload()
            })
        }
    });
   }

    useEffect(() => {
        getCard();
        const fetchUserData = async () => {
            try {
            const response = await Axios.get('http://localhost:3000/userlog', {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            setUserData(response.data);
            } catch (error) {
            console.log('Error:', error);
            }
        };

        if (token) {
            fetchUserData();
        }
        }, [token]);

    const [selectedCard, setSelectedCard] = useState(null);
    const showModal = (card) => {
        setSelectedCard(card);
        };

    const handleCancel = () => {
        setSelectedCard(null);
        };

    const handleRangeChange = (dates, dateStrings) => {
        setCalendarStart(dateStrings[0]);
        setCalendarEnd(dateStrings[1]);
        // ทำสิ่งที่คุณต้องการเมื่อผู้ใช้เลือกช่วง
        console.log('Formatted Range:', dateStrings[0]);
        };
    
    return (
        <div style={{display:"flex",flexWrap: "wrap"}}>
    {data.map((item,index)=>(
        <CardGroup className='mb-3' style={{maxWidth:'100%',boxShadow:' rgba(0, 0, 0, 0.35) 0px 5px 15px',borderRadius:'2%'}}>
            <Card>
                <CardGroup className='row g-0'>
                <CardGroup className='col-md-6'>
                    <Card.Img className=' img-fluid rounded-start'  src={`http://localhost:3000/img/${item.img}`}/>
                 </CardGroup>
                 <CardGroup className='col-md-6'>
                    <Card.Body>
                    <Card.Title style={{fontSize:'1.7rem'}}>{item.room_name}</Card.Title>
                    <Card.Text>
                        <ul style={{listStyle:'none'}}>
                            <li>ขนาดห้อง : {item.detail} ตารางเมตร</li>
                            <li>ลักษณะเตียง : {item.bed_type}</li>
                            <li>จำนวนคน : {item.quantity} คน</li>
                            
                        </ul>
                    </Card.Text>
                    <Card.Title>
                        สิ่งอำนวยความสะดวก
                    </Card.Title>
                    <Card.Text>
                        <ul style={{listStyle:'none'}}>
                            {item.facilities.split(',').map((item, index) => (
                                <li key={index}>- {item}</li>
                            ))}
                        </ul>
                    </Card.Text>
                    <Card.Title>
                        ราคา
                    </Card.Title>
                    <ul>
                        <li>
                            {item.price} บาท / คืน
                        </li>
                    </ul>
                    </Card.Body>
                 </CardGroup>
             
            <Card.Footer className='bg-white w-full mt-1 justify-content-end'>
                <CardGroup className='row'>
                    <CardGroup className='col-10'>
                    </CardGroup>
                    <CardGroup className='col-2'>
                        <Button type='primary' disabled={!token} onClick={() => showModal(item)} >จองห้อง</Button>
                    </CardGroup>
                </CardGroup>
            </Card.Footer>
                </CardGroup>
            </Card>
            
        </CardGroup>
    ))}


{selectedCard && (
                <Modal 
                    title="รายละเอียด" 
                    open={true} 
                    onOk={addReserve}
                    onCancel={handleCancel} 
                    width={1000} >
                    <div className='row mb-4'>
                        <div className='col-6'>
                            <img 
                                src={`http://localhost:3000/img/${selectedCard.img}`} 
                                alt="" 
                                style={{width:'100%',height:'100%',borderRadius:'10px'}}/>
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
                                    <h5>{selectedCard.detail}</h5>
                                </div>
                                <div className='col-5 mb-4'>
                                    <h5>ลักษณะเตียง</h5>
                                </div>
                                <div className='col-1'>
                                    <h5>:</h5>
                                </div>
                                <div className='col-6'>
                                    <h5>{selectedCard.bed_type}</h5>
                                </div>
                                <div className='col-5 mb-4'>
                                    <h5>จำนวนคน</h5>
                                </div>
                                <div className='col-1'>
                                    <h5>:</h5>
                                </div>
                                <div className='col-6'>
                                    <h5>{selectedCard.quantity} คน</h5>
                                </div>
                                <div className='col-5 mb-4'>
                                    <h5>สิ่งอำนวยความสะดวก</h5>
                                </div>
                                <div className='col-1'>
                                    <h5>:</h5>
                                </div>
                                <div className='col-6 mb-4'>
                                    {selectedCard.facilities.split(',').map((item, index) => (
                                        <h5 key={index}>- {item}</h5>
                                    ))}  
                                </div>
                                <div className='col-5 mb-4'>
                                    <h5>ราคา</h5>
                                </div>
                                <div className='col-1'>
                                    <h5>:</h5>
                                </div>
                                <div className='col-6'>
                                    <h5>{selectedCard.price} บาท </h5>                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <Form>
                        <div className='row'>
                            <Form.Item label="ระยะเวลาเข้าพัก" className='col-5'>
                                <RangePicker
                                    onChange={handleRangeChange}
                                    format="DD-MM-YYYY"
                                    disabledDate={(current) => current && current < moment().startOf('day')}
                                    />
                            </Form.Item>
                            <Form.Item
                                className='col-7'
                                name="quantity"
                                label="ชื่อผู้จอง">
                                <Input 
                                    type='text' 
                                    disabled 
                                    defaultValue={userData.firstname + " " + userData.lastname}/>
                            </Form.Item>
                            <Form.Item 
                                label="จำนวนคน" 
                                className='col-5'>
                                <Input 
                                    type='number' 
                                    onChange={(e)=>{setNumGuests(e.target.value)}}
                                    />
                            </Form.Item>
                            <Form.Item
                                className='col-7'
                                name="quantity"
                                label="เบอร์โทรศัพท์">
                                <Input 
                                    type='text' 
                                    disabled 
                                    defaultValue={userData.phone} />
                            </Form.Item>
                        </div>
                    </Form>
                </Modal>
              )}
        
        </div>
        )
    }

export default RoomsCard