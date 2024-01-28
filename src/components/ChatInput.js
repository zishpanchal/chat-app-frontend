import React, {useState} from 'react'
import Picker from 'emoji-picker-react';
import { IoChevronForwardOutline } from "react-icons/io5";

export default function ChatInput({handleSendMsg}) {
  const [showEmojiPicker, setShowEmojiPicker]= useState(false);
  const [msg, setMsg] = useState("");
  const handleShowEmojiPicker = ()=>{
    setShowEmojiPicker(!showEmojiPicker);
  }
  const handleEmojiClick = (emoji)=>{ 
    let message = msg;
        message +=emoji.emoji;
        setMsg(message);
  }
  const sendChat = (event)=>{
        event.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg('');
        }
  }
    return (
    <div className='flex ms-2 justify-start items-center bg-white/50 border border-slate-300 rounded-full w-[54dvw]'>   
    
    <form className='flex' onSubmit={(e)=>{sendChat(e)}}>
        <div>
        <input placeholder='Type your message here' value={msg} onChange={(e)=>{setMsg(e.target.value)}} type='text' className='text-md placeholder:italic placeholder:text-slate-400 block bg-transparent w-[48dvw] pr-3 rounded-full py-2 pl-9 shadow-sm focus:outline-none focus:border-orange-500 focus:ring-orange-500 focus:ring-1' />
        </div>
        <div className='flex items-center'>
          <div className='group'>
            <div onClick={handleShowEmojiPicker} className='ps-3 cursor-pointer'><span className='text-2xl subpixel-antialiased'>😊</span></div>
            <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute bottom-10 bg-orange-700 text-white text-xs p-2 rounded mt-2 transition-opacity">
            <p className='w-max'> Emojis</p>
            </div>
            </div>
            {showEmojiPicker && <Picker width={290} skinTonePickerLocation='PREVIEW' className='bg-orange-200 top-[-455px] right-1' style={{position: "absolute"}} onEmojiClick={handleEmojiClick}/>}
        <div className='flex group'>
        <button type='submit' className='ps-2'><IoChevronForwardOutline className='size-6 subpixel-antialiased' /></button>
        <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute bottom-10 bg-orange-700 text-white text-xs p-2 rounded mt-2 transition-opacity">
            <p className='w-max'>Click to send</p>
            </div>
            </div>
        </div>
    </form>
    </div>
  )
}
