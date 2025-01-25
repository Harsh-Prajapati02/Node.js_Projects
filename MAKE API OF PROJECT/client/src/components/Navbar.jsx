import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ username, setUsername, role, setRole }) => {
  const roler=localStorage.getItem("role")
  console.log(roler)
  const navigate = useNavigate();

  const handleLogout = () => {
    setUsername(null);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        {username ? (
          <>
            <li><Link to="/signup">Sign Up</Link></li>
            <li
              style={{
                border: "2px solid white",
                padding: "5px",
                borderRadius: "5px",
                color: "skyblue",
              }}
            >
              USERNAME: "{username}"
            </li>
            <li
              style={{
                border: "2px solid white",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              <button onClick={handleLogout}>Logout</button>
            </li>
            {
              roler === "admin" ? (
                <Link to="/admin">admin</Link>
              ):(
                <Link to="/admin">admin</Link>
              )
            }
            

          </>
        ) : (
          <>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>

          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
