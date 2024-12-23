import { useState } from 'react'
import './App.css';
import AllRoutes from './Routes/AllRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <AllRoutes />
      <Footer />
    </>
  )
}

export default App
