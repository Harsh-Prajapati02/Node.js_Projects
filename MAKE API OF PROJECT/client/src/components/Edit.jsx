import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:8080/api/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (error) {
      alert(error.response.data.message || 'Failed to fetch user details');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:8080/api/admin/${id}`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('User updated successfully');
      navigate('/admin');
    } catch (error) {
      alert(error.response.data.message || 'Failed to update user');
    }
  };

  return (
    <div>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={user.username || ''}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="email"
          name="email"
          value={user.email || ''}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <select name="role" value={user.role || ''} onChange={handleChange} required>
          <option value="Admin">Admin</option>
          <option value="Explorer">Explorer</option>
        </select>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;
