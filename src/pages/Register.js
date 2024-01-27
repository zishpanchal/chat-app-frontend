import React, {useState, useEffect} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { registerRoute } from '../utils/APIRoutes';

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email:"",
    password:"",
    confirmPassword:""
  });
  
  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){
      navigate('/')
    }
  }, []);

  const handleSubmit = async (event)=>{
      event.preventDefault();
      if(handleValidation()){
        const {password, email, username} = values;
        const {data} = await axios.post(registerRoute, {
          username,
          email,
          password
        });
        if(data.status === false){
          toast.error(data.msg, toastOptions);
        }else if(data.status === true){
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
    const {password, confirmPassword, email, username} = values;
    if(password !== confirmPassword){
      toast.error("Password and Confirm Password should be same!", toastOptions);
      return false;
    }else if(username.length < 3){
      toast.error("Username should be longer than 3 characters!", toastOptions);
      return false;
    }else if(password.length < 5){
      toast.error("Password should be longer than 5 characters!", toastOptions);
      return false;
    }else if(email === ""){
      toast.error("Email is required!", toastOptions);
      return false;
    }
    return true;
  }

  return (
    <>
    <ToastContainer  />
    <div className='font-mono h-dvh flex items-center justify-center'>
      <form className='grid  backdrop-blur-sm bg-white/45 shadow-lg p-8 rounded-lg  gap-y-7' onSubmit={(event)=>{handleSubmit(event)}}>
        <div className="flex mx-auto gap-3 drop-shadow-sm">
          <img alt='logo' className='h-10' src="/logo.png"/>
          <p className='text-4xl antialiased text-orange-800'>Whisper</p>
        </div>
        <input className='ring-1 rounded-sm ring-orange-500 p-1 focus:outline-none focus:ring-1 focus:ring-orange-500' type='text' placeholder='Username' name='username' onChange={(e)=>{handleChange(e)}}></input>
        <input className='ring-1 rounded-sm ring-orange-500 p-1 focus:outline-none focus:ring-1 focus:ring-orange-500' type='email' placeholder='Email' name='email' onChange={(e)=>{handleChange(e)}}></input>
        <input className='ring-1 rounded-sm ring-orange-500 p-1 focus:outline-none focus:ring-1 focus:ring-orange-500' type='password' placeholder='Password' name='password' onChange={(e)=>{handleChange(e)}}></input>
        <input className='ring-1 rounded-sm ring-orange-500 p-1 focus:outline-none focus:ring-1 focus:ring-orange-500' type='password' placeholder='Consfirm Password' name='confirmPassword' onChange={(e)=>{handleChange(e)}}></input>
        <button className='bg-orange-700 hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-600 active:bg-orange-800 rounded-md py-1' type='submit' >Create User</button>
        <span>Already have an account? <Link className='italic hover:underline' to="/login">Login</Link></span>
      </form>

    </div>
  </>
  )
}
