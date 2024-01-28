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
    <div onClick={handleClick} className=" cursor-pointer group p-1 rounded-full">
        <IoLogOutOutline className='h-5 w-5 font-open'/>
        <div className="opacity-0 z-10 invisible group-hover:opacity-100 group-hover:visible absolute bg-orange-700 text-white text-xs p-2 rounded mt-2 transition-opacity">
       <p className='w-max'> Click to logout!</p>
      </div>
    </div>
  )
}
