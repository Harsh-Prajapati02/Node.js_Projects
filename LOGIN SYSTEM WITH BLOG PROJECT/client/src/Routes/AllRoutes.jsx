import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from '../Pages/Homepage';
import Login from '../Pages/Login'
import SignUp from '../Pages/SignUp';

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Homepage />}></Route>
            <Route path="/sign-in" element={<Login />}></Route>
            <Route path="/sign-up" element={<SignUp />}></Route>
            {/* <Route path="/notes" element={<Notespage />}></Route> */}
        </Routes>
    )
}

export default AllRoutes
