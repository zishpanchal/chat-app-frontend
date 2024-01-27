import React, {useState, useEffect} from 'react'
import {  useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { setAvatarRoute } from '../utils/APIRoutes';
import { Buffer } from 'buffer';

export default function SetAvatar() {
    useEffect(()=>{
        if(!localStorage.getItem('chat-app-user')){
            navigate('/login')
          }
          // eslint-disable-next-line
    }, [])

    const apiKey = process.env.REACT_APP_MA_API_KEY;
    const api ="https://api.multiavatar.com";
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 7000,
        pauseOnHover: true,
        draggable: true,
      }
    const setProfilePicture = async ()=>{
        if(selectedAvatar===undefined){
            toast.error("Please select an Avatar", toastOptions);
        }else{
            const user = await JSON.parse(localStorage.getItem('chat-app-user'));
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
                image: avatars[selectedAvatar]
            });
            if(data.isSet){
                user.isAvatarImgSet = true;
                user.avatarImg = data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user));
                navigate("/")
            }else{
                toast.error("Error setting up Avatar, please try again!", toastOptions);
            }
        }
    }
    useEffect(()=>{(async ()=>{
        const data = [];
        for(let i=0;i<4;i++){
            const image = await axios.get(
            `${api}/${Math.round(Math.random()*1000)}?apikey=${apiKey}`
            );
            const buffer = Buffer.from(image.data);
        data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setIsLoading(false);
        })();
        // eslint-disable-next-line
    }, [])

    return (
    <>
    <ToastContainer/>
    
    <div className='h-dvh flex items-center justify-center my-auto'>
       <div className={`grid gap-6 text-center rounded-lg shadow-lg bg-white/45 p-8 ${isLoading?'animate-bounce cursor-not-allowed':''}`}>
        <div>
        <h1 className='text-xl subpixel-antialiased'>Pick your Avatar as your profile</h1>
        </div>
        <div className='grid md:grid-cols-4 mx-auto gap-3'>
        { isLoading?(""):  avatars.map((avatar, index)=>{
                return (
                    <div key={index} className={`cursor-pointer hover:drop-shadow-md hover:ring-2 hover:ring-orange-800 active:drop-shadow-md active:opacity-80 rounded-full w-20 h-20 ${selectedAvatar === index?"ring-2 ring-orange-800 drop-shadow-md":""}`}>
                        <img onClick={()=>{setSelectedAvatar(index)}} alt='avatar' src={`data:image/svg+xml;base64, ${avatar}`}/>
                    </div>
                )
        })
        }
        </div>
        <button disabled={isLoading?true:false} onClick={()=>{setProfilePicture()}} className={` bg-orange-700 hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-600 active:bg-orange-800 rounded-md py-1 ${isLoading?"cursor-not-allowed":""}`}>Set as Avatar</button>
        </div>
    </div>
    </>
  )
}
