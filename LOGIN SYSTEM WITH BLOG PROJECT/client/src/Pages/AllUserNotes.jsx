import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AllUserNoteCard from '../Components/AllUserNoteCard';
import { Link } from 'react-router-dom';

const AllUserNotes = () => {

    const [notes, setNotes] = useState([]);

    const getAllNotes = () => {
        axios.get(`${import.meta.env.VITE_BASEURL}/notes/getAllNotes`, {
            withCredentials: true,
        })
            .then((response) => {
                setNotes(response.data.notes);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const handleDelete = () => {
        axios.delete(`${import.meta.env.VITE_BASEURL}/notes/deleteAllNotes`, {
            withCredentials: true,
        })
            .then((response) => {
                console.log(response.data);
                getAllNotes();
                toast.success(response?.data?.message || 'Note deleted successfully');
            })
            .catch((error) => {
                console.error(error);
                toast.error(error?.response?.data?.message || 'Error deleting note');
            })
    }

    useEffect(() => {
        getAllNotes();
    }, [])

    return (
        <div className='d-flex flex-column flex-md-row' style={{ minHeight: "100vh" }}>
            <div className='w-100'>

                <div className='d-flex justify-content-between align-items-center border-bottom border-gray-500 ps-2 pe-4'>
                    <h1 className='text-3xl font-semibold p-3 mt-3'>Notes Results:
                        
                    </h1>
                    <Link onClick={handleDelete} className='btn btn-outline-primary mt-auto mb-4'>Delete all Notes</Link>
                </div>

                <div className='d-flex p-1 flex-wrap'>
                    {notes.length == 0 ? <div className='p-4 d-flex flex-wrap gap-4'>
                        <p className='text-xl text-gray-500'>No Notes Found.</p>
                    </div> :
                        notes.map((el) => {
                            return (
                                <AllUserNoteCard key={el._id} id={el._id} title={el.title} body={el.body} image={el.notesImage} getAllNotes={getAllNotes} />
                            )
                        })}
                </div>
            </div>
        </div>
    );
}

export default AllUserNotes
