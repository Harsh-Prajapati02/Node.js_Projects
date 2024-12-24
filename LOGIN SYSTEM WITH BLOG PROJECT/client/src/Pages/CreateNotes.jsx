import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from 'react-toastify';
import axios from 'axios';

const CreateNotes = () => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        let notesData = { title, body };
       
        axios.post(`${import.meta.env.VITE_BASEURL}/notes/create`, notesData, {
            withCredentials: true,
        }).then((response) => {
            console.log(response);
            toast.success(response.data.message ||"Notes created successfully");
            setTitle("");
            setBody("");
        }).catch((error) => {
            console.log(error);
            toast.error(error.response.data.message || "Error creating notes");
        })
    }

    return (
        <div className='container p-3 max-w-3xl ma-auto min-vh-100' style={{ maxWidth: "60%" }}>
            <h1 className='text-center my-4'>Create a Note</h1>
            <Form className='d-flex flex-column gap-3' onSubmit={handleSubmit}>
                <Form.Group className='d-flex flex-wrap gap-3'>
                    <Form.Control type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' className='flex-fill' />
                    <Form.Control type='text' value={body} onChange={(e) => setBody(e.target.value)} placeholder='Description' className='flex-fill' />
                </Form.Group>

                <Button variant='primary' type='submit'>
                    Create Note
                </Button>
            </Form>
        </div>
    );
}

export default CreateNotes