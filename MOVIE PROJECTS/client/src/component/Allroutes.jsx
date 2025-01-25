import React from 'react'
import { Routes, Route } from "react-router-dom";
import Createmovie from './Createmovie';
import Login from './Login';
import Registration from './Registration';
import Update from './Update';
import Home from './Home';
const Allroutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/create' element={<Createmovie/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/registration' element={<Registration/>} />
        <Route path='/update/:blogId' element={<Update/>} />
      </Routes>
    </div>
  )
}

export default Allroutes
