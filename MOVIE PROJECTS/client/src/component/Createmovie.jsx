import axios from 'axios'
import React, { useState } from 'react'

const Createmovie = () => {
    const [data,setdata]=useState({Title:"",Genre:"",Director:"",ReleaseYear:"",Description:"" })
  const [Message,setMessage]=useState("")
    const handleData=(e)=>{
    const {name,value}=e.target 
    setdata({...data,[name]:value})
  }
  const handlesubmit=async(e)=>{
  e.preventDefault()
  try {
    const respose=await axios.post(`http://localhost:1402/movie/create`,data,{ withCredentials: true })
    setMessage(respose.data.message)
    console.log(respose.data.message)
  } catch (error) {
    console.log(error.response.data.message)
    setMessage(error.response?.data?.message || "error to posting movie !")
  }
  }
    return (
        <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow border-0">
              <div className="card-header bg-primary text-white text-center">
                <h3>Create Movie</h3>
              </div>
              <div className="card-body">
                {Message && (
                  <div
                    className={`alert ${
                      Message.toLowerCase().includes("error") ? "alert-danger" : "alert-success"
                    }`}
                    role="alert"
                  >
                    {Message}
                  </div>
                )}
                <form onSubmit={handlesubmit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="Title"
                      value={data.Title}
                      onChange={handleData}
                      placeholder="Enter movie title"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="genre" className="form-label">
                      Genre
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="genre"
                      name="Genre"
                      value={data.Genre}
                      onChange={handleData}
                      placeholder="Enter genre"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="director" className="form-label">
                      Director
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="director"
                      name="Director"
                      value={data.Director}
                      onChange={handleData}
                      placeholder="Enter director name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="releaseYear" className="form-label">
                      Release Year
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="releaseYear"
                      name="ReleaseYear"
                      value={data.ReleaseYear}
                      onChange={handleData}
                      placeholder="Enter release year"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="Description"
                      value={data.Description}
                      onChange={handleData}
                      placeholder="Enter movie description"
                      rows="4"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Create Movie
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Createmovie
