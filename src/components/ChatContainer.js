import React,{useState, useEffect, useRef} from 'react'
import ChatInput from './ChatInput'
import Messages from './Messages'
import axios from 'axios'
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes'


export default function ChatContainer({currentChat,currentUser, socket}) {
    const [messages, setMessages] = useState([]);
    const [arrivalMsg, setArrivalMsg] = useState(null);
    const scrollRef = useRef();
    useEffect(()=>{(async()=>{
        if(currentChat){
            const response = await axios.post(getAllMessagesRoute, {
                from: currentUser._id,
                to: currentChat._id,
            });
            setMessages(response.data);
        }
    })()
    // eslint-disable-next-line
},[currentChat]);
    
    const handleSendMsg = async(msg)=>{
        await axios.post(sendMessageRoute,{
            from: currentUser._id,
            to:currentChat._id,
            message: msg
        });
        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: currentUser._id,
            message: msg
        });
        const msgs = [...messages];
        msgs.push({fromSelf: true, message:msg});
        setMessages(msgs);
    }
    useEffect(()=>{
        if(socket.current){
            socket.current.on("msg-recieve", (msg)=>{
                setArrivalMsg({fromSelf:false, message: msg})
            })
        }
        // eslint-disable-next-line
    },[]);

    useEffect(()=>{
        arrivalMsg && setMessages((prev)=>[...prev, arrivalMsg])
    }, [arrivalMsg]);
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour:"smooth"});
    }, [messages]);
 
    return (
    <div className='w-[55dvw] rounded-lg bg-white/20 '>
        
        <div className='flex justify-start items-center gap-3 ps-3 py-3 border-b border-orange-200'>
            <img alt='avatar' className=' w-12 h-12' src={`data:image/svg+xml;base64, ${currentChat.avatarImg}`} />
            <p className='text-md select-none'>{currentChat.username}</p>
        </div>
        <Messages scrollRef={scrollRef} messages={messages}/>
        <ChatInput handleSendMsg={handleSendMsg}/>
        </div>
  )
}
