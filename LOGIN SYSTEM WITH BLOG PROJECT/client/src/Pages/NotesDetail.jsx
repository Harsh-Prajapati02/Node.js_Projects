import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function NotesDetail() {

    const [note, setNote] = useState({});
    const { id } = useParams();

    const getSingleNote = () => {
        axios.get(`${import.meta.env.VITE_BASEURL}/notes/getSingleNote/${id}`, {
            withCredentials: true,
        })
            .then((response) => {
                setNote(response.data.note);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    useEffect(() => {
        getSingleNote();
    }, [])

    return (
        <div className="container my-4" style={{height: "80vh"}}>
            {/* Blog Post Section */}
            <div className="container" >
                <div className="row justify-content-center mb-4">
                    <div className="col-md-8">
                        <div className="text-center">
                            <img src={note.notesImage} alt="Note Image" className="rounded mb-3" height={400} />

                            {/* Placeholder for blog title */}
                            <h2>{note.title}</h2>
                            <div className="blog-content">{note.body}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};