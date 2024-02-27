/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Tab1 } from './styled';
import { Button,Select,Space, Modal,Form,Input,Upload,Table,Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import swal from 'sweetalert';
import Axios from 'axios'

const listMeeting = () => {

    const [Meeting,setMeeting] = useState([])

    const [img,setFile] = useState("")
    const [room_name,setRoom_name] = useState("")
    const [capacity,setCapacity] = useState("")
    const [facilities, setSelectedFacilities] = useState([]);

    const [facilities1,getFacilities] = useState([])
    
    const handleChange = (selectedValues) => {
      setSelectedFacilities(selectedValues);
    console.log(`selected ${selectedValues}`);
  };

  const getFacilities1 = () =>{
    Axios.get('http://localhost:3000/facilities_meeting')
    .then (res => {
      getFacilities(res.data)
    })
    }
    
  const editRoom = (id) =>{

    Axios.put(`http://localhost:3000/Edit/meeting_room/${id}`,{
      room_name:room_name || selectedCard.room_name,
      capacity:capacity || selectedCard.capacity,
      facilities:facilities||selectedCard.facilities,
    })
    .then(function (response) {
        console.log(response);
        swal({
          title:"Changed Success",
          icon:"success",
          button:'OK'
        })
        .then(function(){
          location.reload();})
        })
    .catch(er => console.log(er))

    const formData = new FormData()
    formData.append('file',img)
    Axios.put(`http://localhost:3000/ImgEdit/meeting_room/${id}`,formData
     
    )
    .then(function (response) {
          console.log(response);
        })
    .catch(er => console.log(er))
  }


    const deleteRoom = (id) => {
        Axios.delete(`http://localhost:3000/delete/meeting_room/${id}`)
          
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

    const getMeeting = () =>{
        Axios.get('http://localhost:3000/meeting')
        .then (res => {
          setMeeting(res.data)
        })
        }

        useEffect(() => {
            getMeeting();
            getFacilities1();
          }, []);

    const [selectedCard, setSelectedCard] = useState(null);
    const showModal = (card) => {
        setSelectedCard(card);
      };
    
      const handleOk = () => {
        setSelectedCard(null); 
      };
    
      const handleCancel = () => {
        setSelectedCard(null);
      };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            align:'center',
            
        },
    {
        title: 'รูปภาพ',
        dataIndex: 'picture',
        align:'center',
        width:'45%',
    },
    {
        title: 'ชื่อ',
        dataIndex: 'name',
        width:'100%',
        render: (text) => <h5>{text}</h5>,
    },

    {
        title: 'แก้ไข / ลบ',
        dataIndex: 'edit',
        align:'center',
    
    },
    ];
    const data = Meeting.map((val, index) => ({
        key: index.toString(),
        id: val.id,
        picture: <Image width={"50%"} src={`http://localhost:3000/img/${val.img}`} rounded/>,
        name: val.room_name,
        // detail: <p style={{width:'5%'}}>{val.detail}</p>,
        edit: <div style={{width:'100%',display:'flex',textAlign:'center'}}>  
              <Button style={{marginRight:'0.5rem'}} type="primary" onClick={() => showModal(val)}>แก้ไข</Button>
              <Button type="primary" danger  onClick={() => deleteRoom(val.id)}>ลบ</Button> 
              </div>,
      }));
  return (
    <div>
         <Table style={{height:'100%',marginBottom:'5.5rem',paddingBottom:'3.5rem'}} columns={columns} dataSource={data} size="small" />
        
            {selectedCard && (
               <Modal title="แก้ไข" open={true} onOk={() => { editRoom(selectedCard.id); handleOk(); }} onCancel={handleCancel}>
                    <Form
                        labelCol={{
                        span: 8,
                        }}
                        wrapperCol={{
                        span: 14,
                        }}
                        layout="horizontal"
                        style={{
                        maxWidth:"100%",
                        width:'100%'
                        }}
                    >   
                        <Form.Item label="ชื่อ">
                        <Input defaultValue={selectedCard.room_name} onChange={(event)=>{setRoom_name(event.target.value)}}/>
                        </Form.Item>         

                        <Form.Item label="ความจุ">
                        <Input defaultValue={selectedCard.capacity} onChange={(event)=>{setCapacity(event.target.value)}}/>
                        </Form.Item>
                        
                        <Form.Item label="สิ่งอำนวยความสะดวก">
 
                           <Select
                           mode="multiple"
                           style={{
                             width: '100%',
                           }}
                           placeholder="เลือกสิ่งอำนวยความสะดวก"
                           defaultValue={selectedCard.facilities}
                           onChange={handleChange}
                           optionLabelProp="label"
                         >
                         {facilities1.map((item,index)=>( 
                           <Option key={item.facilities} value={item.facilities} label={item.facilities}>
                             <Space>
                               <span role="img" aria-label={item.facilities}>
                                 
                               </span>
                               {item.facilities}
                             </Space>
                           </Option>
                         ))}
                         </Select>
                         
                           </Form.Item>  
                         
               
                           <Form.Item label="รูปภาพ" valuePropName="fileList"  onChange={(e)=>setFile(e.target.files[0])}>
                           <Upload listType="picture-card" >
                               <div>
                               <PlusOutlined />
                               <div
                                   style={{
                                   marginTop: 8,
                                   }}
                               >
                                   Upload
                               </div>
                               </div>
                           </Upload>
                           
                           </Form.Item>                         
                       </Form>
               </Modal>
             )}
    </div>
  )
}

export default listMeeting