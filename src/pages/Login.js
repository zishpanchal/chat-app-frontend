import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { loginRoute } from '../utils/APIRoutes';

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password:"",
  });
  
  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){
      navigate('/')
    }
    // eslint-disable-next-line
  }, []);
  
  const handleSubmit = async (event)=>{
      event.preventDefault();
      if(handleValidation()){
        const {password, username} = values;
        const {data} = await axios.post(loginRoute, {
          username,
          password
        });
        if(data.status === false){
          toast.error(data.msg, toastOptions);
        }
        if(data.status === true){
          localStorage.setItem('chat-app-user', JSON.stringify(data.user));
          navigate("/")
        }
      } 
  }
  const handleChange = (e)=>{
        setValues({...values, [e.target.name]:e.target.value});
  }

  const toastOptions = {
    position: "bottom-right",
    autoClose: 7000,
    pauseOnHover: true,
    draggable: true,
  }
  const handleValidation = ()=>{
    const {password, username} = values;
    if(password === ""){
      toast.error("Password is required!", toastOptions);
      return false;
    }else if(username === ""){
      toast.error("Username is required!", toastOptions);
      return false;
    }
    return true;
  }

  return (
    <>
    <ToastContainer  />
    <div className='h-dvh flex items-center justify-center'>
      <form className='grid bg-white/45 shadow-lg p-8 rounded-lg  gap-y-7' onSubmit={(event)=>{handleSubmit(event)}}>
        <div className="flex mx-auto gap-3 drop-shadow-sm">
          <img alt='logo' className='h-10' src="/logo.png"/>
          <p className='text-4xl subpixel-antialiased tracking-tighter text-orange-800'>Whisper</p>
        </div>
        <input className='ring-1 rounded-sm ring-orange-500 p-1 focus:outline-none focus:ring-1 focus:ring-orange-500' type='text' placeholder='Username' name='username' min={3} onChange={(e)=>{handleChange(e)}}></input>
        <input className='ring-1 rounded-sm ring-orange-500 p-1 focus:outline-none focus:ring-1 focus:ring-orange-500' type='password' placeholder='Password' name='password'  onChange={(e)=>{handleChange(e)}}></input>
        <button className=' bg-orange-700 hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-600 active:bg-orange-800 rounded-md py-1' type='submit' >Login</button>
        <span>Do not have an account? <Link className='italic hover:underline' to="/register">Signup</Link></span>
      </form>

    </div>
  </>
  )
}
