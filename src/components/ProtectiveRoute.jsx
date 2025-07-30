import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

function ProtectiveRoute({children}) {
    const [verified,setVerified]=useState(false)
    const navigate=useNavigate()
    useEffect(()=>{
        axios.post("http://localhost:5000/Auth",{},{withCredentials:true}).then((res)=>{
            let profile=res.data.loggedIn;
            if (profile ) {
                setVerified(true)
            }else{
                navigate('/')
            }
        }).catch(()=>{
            navigate('/')  
        })
    },[navigate])
  return verified?children:null;
}

export default ProtectiveRoute