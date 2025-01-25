import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Signup from './components/Signup';
import Login from './components/Login';
import './index.css'
import EditUser from './components/Edit';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  const [username, setUsername] = useState(null);
  // const [role,setRole]=useState(null)


  return (
    
    <Router>
      <Navbar username={username} setUsername={setUsername}  />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setUsername={setUsername} />}/>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/edit/:id" element={<EditUser />} />
      </Routes>
    </Router>
  );
};

export default App;
