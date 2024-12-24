import React from 'react';
import { Link } from 'react-router-dom';

const NoteCard = ({ title, body, image, id }) => {
    return (
        <div className='col-md-6 col-lg-4 mb-4 p-2'>
            <div className='card border-0 shadow-sm h-100'>
                <Link to={`/singleNote/${id}`}>
                    <img src={image} alt="Note Image" className='card-img-top img-fluid' style={{ height: '275px', objectFit: 'contain' }} />
                </Link>

                <div className='card-body d-flex flex-column'>
                    <h5 className='card-title text-truncate'>{title}</h5>

                    <Link to={`/singleNote/${id}`} className='btn btn-outline-primary mt-auto'>Read Note</Link>
                </div>
            </div>
        </div>
    )
}

export default NoteCard
