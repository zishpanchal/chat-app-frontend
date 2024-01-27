import React, { useEffect, useState } from 'react'
import Logout from './Logout';


export default function Contacts({contacts, currentUser, changeChat}) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(()=>{
    if(currentUser){
        setCurrentUserImage(currentUser.avatarImg);
        setCurrentUserName(currentUser.username);
    }
  },[currentUser]);
  
  const changeCurrentChat = (index, contact)=>{
    setCurrentSelected(index);
    changeChat(contact);
  }
    return (<>
{currentUserImage && currentUserName && (
            <div className='grid grid-flow-row content-start justify-start shadow-inner'>
                <div className='flex justify-center items-center gap-2 w-56 py-4 drop-shadow-sm'>
                    <img alt='logo' className='h-10' src='./logo.png'/>
                    <h1 className='text-2xl select-none subpixel-antialiased tracking-tighter text-orange-800'>Whisper</h1>
                </div>
                <div className='bg-orange-200/15 divide-y divide-orange-200 scrollbar-thumb-orange-600/45 scrollbar-thumb-rounded-full  scrollbar scrollbar-w-1 grid h-[64dvh] content-start overflow-hidden scroll-smooth hover:overflow-y-auto overscroll-contain'>
                {
                    contacts.map((contact, index)=>{
                    return   (
                            <div onClick={()=>{changeCurrentChat(index,contact)}} className={`flex items-center py-3 hover:bg-orange-300/70 px-3 gap-3 ${index === currentSelected? "bg-orange-300/70":""}`} key={index}>
                                <img alt='avatar' className=' w-14 h-14' src={`data:image/svg+xml;base64, ${contact.avatarImg}`} />
                                <p className='text-md select-none'>{contact.username}</p>
                            </div>
                        )
                    })
                }
                </div >
                <div className='flex justify-center items-center py-3 px-3 gap-3 drop-shadow-sm'>
                <img alt='avatar' className='w-14 h-14' src={`data:image/svg+xml;base64, ${currentUserImage}`} />
                <p className='text-md font-semibold select-none '>{currentUserName}</p>
                <Logout/>
                </div>
            </div>
    )}
    </>)
}
