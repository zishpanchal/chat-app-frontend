import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { allUsersRoute } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import axios from 'axios';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client';
import { host } from '../utils/APIRoutes';

export default function Chat() {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(()=>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser])
  useEffect(()=>{(async()=>{
    if(!localStorage.getItem('chat-app-user')){
        navigate('/login')
      }else{
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
    })();
    // eslint-disable-next-line
  }, []);
  useEffect(()=>{(async()=>{
    if(currentUser){
      if(currentUser.isAvatarImgSet){
        const {data} = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data);
      }else{
        navigate("/setAvatar");
      }
    }
  })();
  // eslint-disable-next-line
  },[currentUser]);
  const handleChangeChat = (chat)=>{
    setCurrentChat(chat)
  }

  return (
    <div className='h-dvh flex items-center justify-center my-auto'>
      <div className='grid grid-flow-col h-[85dvh]  rounded-lg shadow-lg bg-white/35 backdrop-blur '>
      <Contacts changeChat={handleChangeChat} contacts={contacts} currentUser={currentUser} />
      {
        currentChat?(<ChatContainer socket={socket} currentUser={currentUser} currentChat={currentChat}/> ):(<Welcome currentUser={currentUser}/>)
      }
      
      </div>
    </div>
  )
}
