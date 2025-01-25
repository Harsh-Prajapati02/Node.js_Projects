import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Allroutes from './component/Allroutes'
import Navbar from './component/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
     <Allroutes/>
    </>
  )
}

export default App
