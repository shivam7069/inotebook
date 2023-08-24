import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  const navigate = useNavigate();
  const { name, email, password } = credentials;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json()
    console.log(json)
    if(json.success){
    localStorage.setItem("token", json.authtoken);
    navigate('/')
    props.showAlert("Account created successfully","success");
  }else{
    props.showAlert("Invalide credetials","danger");
  }


  }
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='mt-3'>
            <h2>Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="htmlForm-label">Name</label>
          <input type="text" onChange={onchange} className="form-control" id="name" name='name' aria-describedby="emailHelp" />

        </div>
        <div className="mb-3">
          <label htmlFor="email" className="htmlForm-label">Email address</label>
          <input type="email" onChange={onchange} className="form-control" id="email" name='email' aria-describedby="emailHelp" />
          <div id="emailHelp" className="htmlForm-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="htmlForm-label">Password</label>
          <input type="password" onChange={onchange} className="form-control" id="password" name='password' minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="htmlForm-label">Confirm Password</label>
          <input type="password" onChange={onchange} className="form-control" id="cpassword" name='cpassword' minLength={5} required />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      
    </div >
  )
}

export default Signup