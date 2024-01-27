import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoLogOutOutline } from "react-icons/io5"

export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async()=>{
    localStorage.clear();
    navigate("/login");
  }
  
    return (
    <div onClick={handleClick} className="cursor-pointer  p-1 rounded-full" title="Click to logout!" >
        <IoLogOutOutline title="Click to logout!" className='h-5 w-5 font-open'/>
    </div>
  )
}
