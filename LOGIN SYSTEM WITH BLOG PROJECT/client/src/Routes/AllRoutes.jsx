import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from '../Pages/Homepage';
import Login from '../Pages/Login'
import SignUp from '../Pages/SignUp';
import Notes from '../Pages/Notes';
import CreateNotes from '../Pages/CreateNotes';
import NotesDetail from '../Pages/NotesDetail';
import PrivateRoutes from '../Components/PrivateRoutes';
import UpdateNotes from '../Pages/UpdateNotes'
import AllUserNotes from '../Pages/AllUserNotes';

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Homepage />}></Route>
            <Route path="/sign-in" element={<Login />}></Route>
            <Route path="/sign-up" element={<SignUp />}></Route>
            <Route path="/notes" element={
                <PrivateRoutes>
                    <Notes />
                </PrivateRoutes>
            }></Route>
            <Route path="/create-notes" element={<CreateNotes />}></Route>
            <Route path="/singleNote/:id" element={<NotesDetail />}></Route>
            <Route path="/updateNote/:id" element={<UpdateNotes />}></Route>

            {/* Admin */}
            <Route path="/all-notes" element={<AllUserNotes />}></Route>
        </Routes>
    )
}

export default AllRoutes