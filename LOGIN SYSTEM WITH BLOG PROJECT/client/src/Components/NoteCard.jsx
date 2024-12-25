import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

const NoteCard = ({ title, image, id, getAllUserNotes, userId }) => {

    const handleDelete = (id) => {
        axios.delete(`${import.meta.env.VITE_BASEURL}/notes/delete/${id}`, {
            withCredentials: true,
        })
        .then((response) => {
            console.log(response.data);
            getAllUserNotes(userId);
            toast.success(response?.data?.message || 'Note deleted successfully');
        })
        .catch((error) => {
            console.error(error);
            toast.error(error?.response?.data?.message || 'Error deleting note');
        })
    }

    return (
        <div className='col-md-6 col-lg-4 mb-4 p-2'>
            <div className='card border-0 shadow-sm h-100'>
                <Link to={`/singleNote/${id}`}>
                    <img src={image[0] == "h" ? image : `${import.meta.env.VITE_BASEURL}/${image}`} alt="Note Image" className='card-img-top img-fluid' style={{ height: '275px', objectFit: 'contain' }} />
                </Link>

                <div className='card-body d-flex flex-column'>
                    <h5 className='card-title text-truncate pb-1'>{title}</h5>

                    <div className='mb-2 d-flex justify-content-center'>
                        <Link to={`/updateNote/${id}`} className='btn btn-outline-primary w-50 me-1'>Edit</Link>
                        <Link onClick={() => handleDelete(id)} className='btn btn-outline-primary mt-auto w-50 ms-1'>Delete</Link>
                    </div>

                    <Link to={`/singleNote/${id}`} className='btn btn-outline-primary mt-auto'>Read Note</Link>
                </div>
            </div>
        </div>
    )
}

export default NoteCard;