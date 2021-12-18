import React, {useState, useEffect }from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';
import { Outlet } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {useNavigate} from 'react-router-dom'
import Navbar from './Navbar';
import { REFRESH_TOKEN } from '../graphql/auth/mutations';
import 'react-toastify/dist/ReactToastify.css';

const PrivateLayout = ({children}) => {
    const {setToken}=useAuth();
    const [loadingAuth,setLoadingAuth] =  useState(true)
    const [refreshToken, { data: dataMutation, loading: loadingMutation }] = useMutation(REFRESH_TOKEN);
    const navigate=useNavigate();

    

   useEffect(() => {
        refreshToken();
      }, [refreshToken]);
 
    useEffect(()=>{
        console.log('DM',dataMutation);
        if(dataMutation){
            if(dataMutation.refreshToken.token){
                setToken(dataMutation.refreshToken.token)
            }else{
                setToken(null);
                navigate('/auth/login');
            }
            setLoadingAuth(false);
        }
    },[dataMutation,setToken,loadingAuth,navigate])

   

    if(loadingMutation || loadingAuth) return <div>Loading...</div>
    
    return (
        <div>
            <Navbar/>
            {children}
            <Outlet />
            <ToastContainer
                
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                
            />
        </div>
    )
}

export default PrivateLayout
