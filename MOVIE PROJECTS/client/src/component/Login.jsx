import axios from 'axios';
import React, { useState } from 'react'

const Login = () => {
    const [message, setMessage] = useState("");
    const [data, setData] = useState({email: "", password: "" });
  
    const handleData = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`http://localhost:1402/user/login`, data,{withCredentials:true});
        console.log(response.data);
        localStorage.setItem("userdata",JSON.stringify(response.data.userdata))
        setMessage(response.data.message);
      } catch (error) {
        console.log(error.response?.data?.message || "Error in Registration. Please try again!");
        setMessage(error.response?.data?.message || "Error in Registration. Please try again!");
      }
    };
  
  return (
    <div>    
      <div className="container mt-5">
        <h2 className="text-center mb-4">User login</h2>
        {message && (
          <div
            className={`alert ${
              message.toLowerCase().includes("error") ? "alert-danger" : "alert-success"
            }`}
            role="alert"
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="border p-4 shadow rounded">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={data.email}
              onChange={handleData}
              placeholder="Enter your email address"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={data.password}
              onChange={handleData}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
