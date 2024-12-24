import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from '../Pages/Homepage';
import Login from '../Pages/Login'
import SignUp from '../Pages/SignUp';
import Notes from '../Pages/Notes';
import CreateNotes from '../Pages/CreateNotes';
import NotesDetail from '../Pages/NotesDetail';

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Homepage />}></Route>
            <Route path="/sign-in" element={<Login />}></Route>
            <Route path="/sign-up" element={<SignUp />}></Route>
            <Route path="/notes" element={<Notes />}></Route>
            <Route path="/create-notes" element={<CreateNotes />}></Route>
            <Route path="/singleNote/:id" element={<NotesDetail />}></Route>
        </Routes>
    )
}

export default AllRoutes