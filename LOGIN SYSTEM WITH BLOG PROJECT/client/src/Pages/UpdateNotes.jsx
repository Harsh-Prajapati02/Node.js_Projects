import React from 'react';
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateNotes = () => {
    return (
        <div className='container my-5' style={{ maxWidth: "60%" }}>
            <h1 className='text-center'>Update Note</h1>

            <Form className='mt-4'>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type='text' placeholder='Enter Title' />
                </Form.Group>

                <Button variant='primary' type='submit'>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default UpdateNotes
