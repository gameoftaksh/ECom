import React from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { signup } from "../reducer/Actions";

const Signup = ({signup}) => {
  const navigate = useNavigate();

  const [ status, setStatus ] = useState (false);
  const [ formData, setFormData ] = useState ({
      email: "",
      first_name: "",
      last_name: "",
      password1: "",
      password2: ""
  });
  const { email, first_name, last_name, password1, password2 } = formData;
//   const { username, password1, password2 } = formData;

  const handlingInput = (e) => setFormData({...formData, [e.target.name]: e.target.value});

//   console.log(formData)
  const handlingSubmit = (e) => {
      e.preventDefault();
      console.log(e)
      console.log("calling Signup");
      signup( email, first_name, last_name, password1, password2);
      console.log("calling Signup");
      setStatus(true);
  }
  if (status) {
      return <Navigate to={"../"}></Navigate>
  }

  const handleLogin = () => {
    navigate('/login'); 
  };
    return (
        <div className="flex items-center justify-center min-h-screen">
               
        <form className="bg-white shadow-md rounded my-4 px-16 pt-6 pb-8 mb-4" onSubmit={handlingSubmit}>
        <div className="mb-4">
        <p className="text-center text-blue-500 text-xxs">
                Welcome. Please, Sugnup
            </p>
            <br></br>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">
            First Name
            </label>
            <input name="first_name" value={first_name} onChange={e => handlingInput(e)} className="shadow appearance-none border rounded w-full py-2 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="First name" required/>
        </div><div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
            Last Name
            </label>
            <input name="last_name" value={last_name} onChange={e =>handlingInput(e)} className="shadow appearance-none border rounded w-full py-2 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="last Name" required/>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
            </label>
            <input name="email" value={email} onChange={handlingInput} className="shadow appearance-none border rounded w-full py-2 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Email" required/>
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password1">
            Password
            </label>
            <input name="password1" value={password1} onChange={e => handlingInput(e)} className="shadow appearance-none border border-500 rounded w-full py-2 px-8 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password1" type="password" placeholder="******************" required/>
            
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password2">
            Confirm Password
            </label>
            <input name="password2" value={password2} onChange={e => handlingInput(e)} className="shadow appearance-none border border-500 rounded w-full py-2 px-8 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password2" type="password" placeholder="******************"/>
            
        </div>
        <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline" type="submit">
            Sign Up
            </button>
        </div>
        <div className="flex items-center justify-between">
            <button onClick={handleLogin} className="bg-yellow-500 hover:bg-blue-700 my-2 w-full text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline" type="button">
            Sign in
            </button>
        </div>
        
        <p className="text-center text-gray-500 text-xs">
            OR
        </p>
        <div className="flex items-center justify-between">
            <button className="bg-red-500 hover:bg-green-700 text-white font-bold  w-full my-2 py-1 px-8 rounded focus:outline-none focus:shadow-outline" type="button">
            Sign up with Google
            </button>
        </div>
        
        <p className="text-center text-gray-500 text-xs">
            &copy;2024 All rights reserved.
        </p>
        </form>
       
  </div>
 
    )
}

export default connect(null, { signup })(Signup)