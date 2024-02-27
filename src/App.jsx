/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Axios from 'axios';
import Navbar1 from './component/Navbar'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pageUser/homePage';
import Dashboard from './pageAdmin/dashboard';
import Edit_home from './pageAdmin/edit_home';
import Edit_payment from './pageAdmin/edit_payment';
import Edit_rooms from './pageAdmin/edit_rooms';
import Edit_meeting from './pageAdmin/edit_meeting';
import Edit_Gym from './pageAdmin/edit_gym';
import Edit_Spa from './pageAdmin/edit_spa';
import Edit_users from './pageAdmin/info_user';
import Report from './pageAdmin/report';

import RoomPage from './pageUser/roomPage'
import AdminRoute from './AdminRoute';
import UserRoute from './UserRoute';
import User2 from './User2'
import ChangeInfo from './pageUser/ChangeInfo';
import ChangeInfoAdmin from './pageAdmin/ChangeInfoAdmin';
import ReserveReport from './pageUser/ReserveReport';
function App() {


  const token = localStorage.getItem('token');
  const isAuthenticated = token;
  const [userData, setUserData] = useState(null);
  const role = userData?.role;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await Axios.get('http://localhost:3000/userlog', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    if (token) {
      fetchUserData(userData);
    }
  }, [token]);
  console.log(role);
  return (
    <>
    <Routes>  
              <Route path="/" element={
                <UserRoute>
                  <HomePage />
                </UserRoute>
              } />
              <Route path="/roomPage" element={
                <UserRoute>
                  <RoomPage />
                </UserRoute>
              } />
               <Route path="/report" element={
                        <AdminRoute>
                          <Report />
                        </AdminRoute>
                      } />
              {isAuthenticated && role && (
                <>
                 {!isAuthenticated && (
                <>
                    <Route path="/1" element={<Navigate to="/" />} />
                    <Route path="/roomPage1" element={<Navigate to="/" />} />
                    <Route path="/change" element={<Navigate to="/" />} />
                    <Route path="/reserve" element={<Navigate to="/" />} />
                    <Route path="/dashboard" element={<Navigate to="/" />} />
                    <Route path="/edit_home" element={<Navigate to="/" />} />
                    <Route path="/edit_payment" element={<Navigate to="/" />} />
                    <Route path="/edit_rooms" element={<Navigate to="/" />} />
                    <Route path="/edit_meeting" element={<Navigate to="/" />} />
                    <Route path="/edit_gym" element={<Navigate to="/" />} />
                    <Route path="/edit_Spa" element={<Navigate to="/" />} />
                    <Route path="/edit_users" element={<Navigate to="/" />} />
                    <Route path="/report" element={<Navigate to="/" />} />
                    <Route path="/ChangeAdmin" element={<Navigate to="/" />} />
                  </>
                 )}
                  {role === '2' && (
                    <>
                      <Route path="/dashboard" element={<Navigate to="/1" />} />
                      <Route path="/edit_home" element={<Navigate to="/1" />} />
                      <Route path="/edit_payment" element={<Navigate to="/1" />} />
                      <Route path="/edit_rooms" element={<Navigate to="/1" />} />
                      <Route path="/edit_meeting" element={<Navigate to="/1" />} />
                      <Route path="/edit_gym" element={<Navigate to="/1" />} />
                      <Route path="/edit_Spa" element={<Navigate to="/1" />} />
                      <Route path="/edit_users" element={<Navigate to="/1" />} />
                      <Route path="/report" element={<Navigate to="/1" />} />
                      <Route path="/ChangeAdmin" element={<Navigate to="/1" />} />     
                      <Route path="/" element={<Navigate to="/1" />} />
                      <Route path="/roomPage" element={<Navigate to="/roomPage1" />} />

                      <Route path="/1" element={
                        <User2>
                         <HomePage />
                       </User2>
                      } />
                      <Route path="/roomPage1" element={
                        <User2>
                          <RoomPage />
                        </User2>
                      } />
                      <Route path="/change" element={
                        <User2>
                          <ChangeInfo />
                        </User2>
                      } />
                      <Route path="/reserve" element={
                        <User2>
                          <ReserveReport />
                        </User2>
                      } />
                    </>
                  )}
        
                  {role === '1' && (
                    <>
                  <Route path="/1" element={<Navigate to="/dashboard" />} />

                      <Route path="/dashboard" element={
                        <AdminRoute>
                          <Dashboard />
                        </AdminRoute>
                      } />
                      <Route path="/edit_home" element={
                        <AdminRoute>
                          <Edit_home />
                        </AdminRoute>
                      } />
                      <Route path="/edit_payment" element={
                        <AdminRoute>
                          <Edit_payment />
                        </AdminRoute>      
                      } />
                      <Route path="/edit_rooms" element={
                        <AdminRoute>
                          <Edit_rooms />
                        </AdminRoute>
                      } />
                      
                      <Route path="/edit_meeting" element={
                        <AdminRoute>
                          <Edit_meeting/>
                        </AdminRoute>
                      } />
        
                      <Route path="/edit_gym" element={
                        <AdminRoute>
                          <Edit_Gym/>
                        </AdminRoute>
                      } />
        
                      <Route path="/edit_Spa" element={
                        <AdminRoute>
                          <Edit_Spa/>
                        </AdminRoute>
                      } />
                      <Route path="/edit_users" element={
                        <AdminRoute>
                          <Edit_users />
                        </AdminRoute>
                      } />
                      {/* <Route path="/report" element={
                        <AdminRoute>
                          <Report />
                        </AdminRoute>
                      } /> */}
                      <Route path="/ChangeAdmin" element={
                        <AdminRoute>
                          <ChangeInfoAdmin />
                        </AdminRoute>
                      } />
                    </>
                  )}
                </>
              )}
            </Routes>
  
    
    </>
  )
}

export default App
