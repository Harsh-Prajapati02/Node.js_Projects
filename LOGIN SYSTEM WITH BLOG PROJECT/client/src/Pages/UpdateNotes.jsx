import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const UpdateNotes = () => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [file, setFile] = useState(null);

    const { id } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();

        let noteData = { title, body, file };

        axios.patch(`${import.meta.env.VITE_BASEURL}/notes/update/${id}`, noteData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                console.log(response.data);
                toast.success(response?.data?.message || "Note updated successfully");
            })
            .catch((error) => {
                console.error(error);
                toast.error(error?.response?.data?.message || "Error updating note");
            })
    };

    return (
        <div className='container my-5' style={{ maxWidth: "50%", height: "80vh" }}>
            <h1 className='text-center'>Update Note</h1>

            <Form className='mt-4' onSubmit={handleSubmit}>
                <Form.Group controlId='title' className='mb-3'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter Title' />
                </Form.Group>

                <Form.Group controlId='file' className='mb-3'>
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control type='file' onChange={(e) => setFile(e.target.files[0])} placeholder='Enter Image' accept='image/*' />
                </Form.Group>

                <Form.Group controlId='body' className='mb-3'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type='text' value={body} onChange={(e) => setBody(e.target.value)} placeholder='Enter Description' />
                </Form.Group>

                <Button variant='primary' className='d-block w-100' type='submit'>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default UpdateNotes
