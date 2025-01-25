import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link, useParams } from 'react-router-dom'
const Home = () => {
    const [data,setdata]=useState([])
   const {_id}=JSON.parse(localStorage.getItem("userdata"))
   
   const getdata=async()=>{
    try {
     const respose=await axios.get(`http://localhost:1402/movie/movies/${_id}`,{withCredentials: true  })
        setdata(respose.data.data)
    console.log(respose.data.data)
    } catch (error) {
        console.log(error.response.data.message)
    }
   }
   const handledelete=async(_id)=>{
    try {
     const respose=await axios.delete(`http://localhost:1402/movie/delete/${_id}`,{withCredentials: true  })
     alert("delete")
     console.log(respose.data.data)
     getdata()
    } catch (error) {
        console.log(error.response.data.message)
    }
   }
  useEffect(()=>{
   getdata()
  },[_id])
  return (
    <div className="container my-5">
    <div className="row">
        {data.map((el) => (
            <div className="col-md-4 mb-4" key={el._id}>
                <div className="card shadow-sm h-100">
                    <div className="card-body">
                        <h5 className="card-title">{el.Description}</h5>
                        <p className="card-text"><strong>Title:</strong> {el.Title}</p>
                        <p className="card-text"><strong>Genre:</strong> {el.Genre}</p>
                        <p className="card-text"><strong>Director:</strong> {el.Director}</p>
                        <p className="card-text"><strong>Release Year:</strong> {el.ReleaseYear}</p>
                        <Link to={`/update/${el._id}`}>Edit</Link>
                        <Link onClick={()=>handledelete(el._id)} className='ms-5'>Delete </Link>
                    </div>
                </div>
            </div>
        ))}
    </div>
</div>
  )
}

export default Home
