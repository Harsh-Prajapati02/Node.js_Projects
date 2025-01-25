import React from 'react';

const About = () => {
  return (
    <div style={{width:"100%",textAlign:"center"}}>
      <h1>About This Project</h1>
      <p>This project is a full-stack website with the following features:</p>
      <ul style={{listStyle:"none"}}>
        <li>User registration and login</li>
        <li>Role-based access control</li>
        <li>Backend APIs using Node.js and MongoDB</li>
        <li>Frontend built with React.js</li>
      </ul>
      <p>Packages used: React, Axios, React Router, Node.js, Express, MongoDB, etc.</p>
    </div>
  );
};

export default About;
