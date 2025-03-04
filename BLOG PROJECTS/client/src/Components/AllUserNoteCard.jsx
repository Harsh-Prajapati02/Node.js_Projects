import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

const AllUserNoteCard = ({ title, body, image, id, getAllNotes, userId }) => {

    return (
        <div className='col-md-6 col-lg-4 mb-4 p-2'>
            <div className='card border-0 shadow-sm h-100'>

                <img src={image[0] == "h" ? image : `${import.meta.env.VITE_BASEURL}/${image}`} alt="Note Image" className='card-img-top img-fluid' style={{ height: '275px', objectFit: 'contain' }} />

                <div className='card-body d-flex flex-column'>
                    <h5 className='card-title text-truncate pb-1'>{title}</h5>
                    <div className="blog-content">{body}</div>

                    <div className='mb-2 d-flex justify-content-center'>
                        
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AllUserNoteCard
