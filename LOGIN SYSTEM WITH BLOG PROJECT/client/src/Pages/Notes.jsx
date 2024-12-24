import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoteCard from '../Components/NoteCard';

const Notes = () => {

    const userData = JSON.parse(localStorage.getItem('userData'));
    const [notes, setNotes] = useState([]);

    const getAllUserNotes = () => {
        axios.get(`${import.meta.env.VITE_BASEURL}/notes/get/${userData._id}`, {
            withCredentials: true,
        })
            .then((response) => {
                setNotes(response.data.notes);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    useEffect(() => {
        getAllUserNotes();
    }, [])

    return (
        <div className='d-flex flex-column flex-md-row' style={{ minHeight: "100vh" }}>
            <div className='w-100'>
                <h1 className='text-3xl font-semibold border-bottom border-gray-500 p-3 mt-5'>Notes Results:</h1>

                <div className='d-flex p-1 flex-wrap'>
                    {notes.length == 0 ? <div className='p-4 d-flex flex-wrap gap-4'>
                        <p className='text-xl text-gray-500'>No Notes Found.</p>
                    </div> :
                        notes.map((el) => {
                            return (
                                <NoteCard key={el._id} id={el._id} title={el.title} body={el.body} image={el.notesImage} />
                            )
                        })}
                </div>
            </div>
        </div>
    );
}

export default Notes
