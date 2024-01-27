import React from 'react'
import {v4 as uuidv4} from "uuid";

export default function Messages({messages, scrollRef}) {
  return (
    <div className='h-[69dvh] grid pb-4 gap-2 px-4 overflow-y-auto overscroll-contain scrollbar-thumb-orange-600/45 scrollbar-thumb-rounded-full scroll-smooth scrollbar scrollbar-w-1'>

    {
    messages.map((message)=>{
        return(
            <div ref={scrollRef} key={uuidv4()} className='container'>
                <div className={`${message.fromSelf ? "flex justify-end ": "flex justify-start"}`}>
                        <p className={`${message.fromSelf ?"rounded rounded-br-none bg-orange-400 p-2":"rounded-md rounded-bl-none bg-orange-50/80 p-2"}`}>{message.message}</p>
                </div>
            </div>
        )
    })
    }
    </div>
  )
}
