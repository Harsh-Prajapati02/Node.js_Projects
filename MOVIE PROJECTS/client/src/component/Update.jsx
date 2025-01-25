import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Update = () => {
 const [data,setdata]=useState({Title:"",Genre:"",Director:"",ReleaseYear:"",Description:"" })
    const {blogId}=useParams()
    console.log(blogId)

    const handleData=(e)=>{
        const {name,value}=e.target
        setdata({...data,[name]:value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.put(`http://localhost:1402/movie/update/${blogId}`,data,{withCredentials:true})
        .then((res)=>console.log(res.data.data))
        .catch((err)=>console.log(err))        
    }
     useEffect(()=>{
        axios.get(`http://localhost:1402/movie/shingldata/${blogId}`,{withCredentials:true})
        .then((res)=>setdata(res.data.data))
        .catch((err)=>console.log(err))
     },[blogId])
    return (
        <div className="container">
        <h2>Update Movie</h2>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label htmlFor="Title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="Title"
              name="Title"
              value={data.Title}
              onChange={handleData}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="Genre" className="form-label">
              Genre
            </label>
            <input
              type="text"
              className="form-control"
              id="Genre"
              name="Genre"
              value={data.Genre}
              onChange={handleData}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="Director" className="form-label">
              Director
            </label>
            <input
              type="text"
              className="form-control"
              id="Director"
              name="Director"
              value={data.Director}
              onChange={handleData}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="ReleaseYear" className="form-label">
              Release Year
            </label>
            <input
              type="number"
              className="form-control"
              id="ReleaseYear"
              name="ReleaseYear"
              value={data.ReleaseYear}
              onChange={handleData}
              required
            />
          </div>
          <div className="col-12">
            <label htmlFor="Description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="Description"
              name="Description"
              value={data.Description}
              onChange={handleData}
              rows="3"
              required
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Update Movie
            </button>
          </div>
        </form>
      </div>
  )
}

export default Update
