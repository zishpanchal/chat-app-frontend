import React, { useEffect, useState } from 'react'

export default function Welcome({currentUser}) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    useEffect(()=>{
        if(currentUser){
            setCurrentUserName(currentUser.username);
        }
      },[currentUser]);
  
    return (
    <div className='w-[55dvw] flex items-center justify-center bg-white/20 rounded-lg'>
        <div className='grid grid-flow-row text-center justify-items-center text-orange-800'>
        <img alt='bubble' title='bubble' className='w-60' src='./bubble.svg' />
        <p className='text-2xl subpixel-antialiased font-semibold'>Welcome, {currentUserName}!</p>
        <p className='text-xl italic  font-thin'>Please select a chat to start messaging </p>
        </div>
    </div>
  )
}
