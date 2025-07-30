import { useLocation } from "react-router-dom"
import Navbar from "../components/Navbar"
import SideProfile from "./SideProfile"
import { Outlet} from "react-router-dom"
import { useState,useEffect } from "react"
function HomePage() {
    const location =useLocation()
    const [showProfile,setShowProfile]=useState(true)
useEffect(()=>{
    if (location.pathname=="/home/chat"|| location.pathname== "/home/profile" || location.pathname.startsWith("/home/otherperson/")) {
        setShowProfile(false)
    }else{
        setShowProfile(true)
    }
},[location.pathname])
    return (<>
    {showProfile&&<SideProfile/> }
        <Navbar />
        <Outlet/>
    </>)
}

export default HomePage