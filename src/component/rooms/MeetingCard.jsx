/* eslint-disable react/jsx-key */
import React from 'react'
import { useState,useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Axios from 'axios';

const MeetingCard = () => {
    const [data,setData] = useState([])
    const getCard= () =>{
    Axios.get('http://localhost:3000/meeting')
    .then (res => {
        setData(res.data)
    })
}
    
useEffect(() => {
    getCard();
}, []);
    return (

    
    <div style={{display:"flex",flexWrap: "wrap"}}>

{data.map((item,index)=>(
    <CardGroup className='p-3 w-25'>

        <Card className='p-0 w-50'>
        <Card.Img variant="top" src={`http://localhost:3000/img/${item.img}`} style={{maxHeight:'40%',minHeight:'40%'}}/>
        <Card.Body>
            <Card.Title style={{textAlign:'center',fontSize:'1.3rem'}}>{item.room_name}</Card.Title>
            <Card.Text>
                <ul style={{listStyle:'none'}}>
                   
                    <li>ความจุ : {item.capacity} คน</li>
               
                    
                </ul>
            </Card.Text>
            <Card.Title>
                สิ่งอำนวยความสะดวก
            </Card.Title>
            <ul style={{listStyle:'none'}}>
                <li>
                    {item.facilities.split(',').map((item, index) => (
                        <li key={index}>- {item}</li>
                    ))}
                </li>
               
            </ul>
        </Card.Body>
        <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
        </Card>
        
    </CardGroup>
))}
    
    </div>
    )
}

export default MeetingCard