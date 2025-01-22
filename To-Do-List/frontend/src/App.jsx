import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [data, setData] = useState([]);
  const [task, setTask] = useState('');
  const [editId, setEditId] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:3500/todo');
      setData(response.data.tasks);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.trim()) {
      if (editId) {

        try {
          await axios.put(`http://localhost:3500/todo/${editId}`, { task });
          setEditId(null);
        } catch (err) {
          console.log(err);
        }
      } else {

        try {
          const newTask = { id: uuidv4(), task };
          await axios.post('http://localhost:3500/todo', newTask);
        } catch (err) {
          console.log(err);
        }
      }
      setTask('');
      getData();
    }
  };

  const handleEdit = (taskId, currentTask) => {
    setTask(currentTask);
    setEditId(taskId);
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3500/todo/${taskId}`);
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container p-5 text-center">
      <h1 className="mb-5">TASK MANAGER</h1>
      <div className='d-flex justify-content-between'>
        <form className='col-5 p-5' onSubmit={handleSubmit}>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            name="task"
            className="w-100 mb-4 ps-2"
            style={{ height: "50px" }}
            placeholder="Enter your task here..."
          />
          <button type="submit" className="p-2 add-button w-100">
            {editId ? 'UPDATE' : 'ADD TASK'}
          </button>
        </form>

        <ul className="list-group col-6">
          {data.map((el) => (
            <li key={el.id} className="d-flex justify-content-between align-items-center p-2 ps-3 pe-3">
              <div>
                <p className="task-text mb-0">{el.task}</p>
              </div>
              <div className="todo-buttons">
                <button
                  className="me-2 edit-btn"
                  onClick={() => handleEdit(el.id, el.task)}
                >
                  EDIT
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(el.id)}
                >
                  DELETE
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;