import React, { Suspense, lazy } from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
const Register = lazy(()=>import("./pages/Register"))
const Login = lazy(()=>import("./pages/Login"))
const SetAvatar = lazy(()=>import("./pages/SetAvatar"))
const Chat = lazy(()=>import("./pages/Chat"))

export default function App() {
  return (
    <div className='bg-orange-200 '>
    <BrowserRouter >
    <Suspense fallback={<></>}>
    <Routes >
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/setAvatar" element={<SetAvatar/>} />
        <Route path="/" element={<Chat/>} />
      </Routes>
    </Suspense>
    </BrowserRouter>
    </div>
  )
}
