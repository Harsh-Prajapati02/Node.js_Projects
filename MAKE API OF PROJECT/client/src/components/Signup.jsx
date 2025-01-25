import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    dateOfBirth: '',
    role: 'Explorer',
    location: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/register', formData);
      console.log(res.data)
      alert(res.data.message);
    } catch (error) {
        console.log(error.message)
      alert(error.response.data.message || 'Registration failed');
    }
  };

  return (
    <div style={{textAlign:"center"}}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} style={{display:"grid",width:"15%",margin:"auto",border:"2px solid black",padding:"30px"}}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="date" name="dateOfBirth" onChange={handleChange} required />
        <select name="role" onChange={handleChange}>
          <option value="Explorer">Explorer</option>
          <option value="Admin">Admin</option>
        </select>
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Signup;
