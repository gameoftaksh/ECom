import React from "react";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { resetPassword } from "../reducer/Actions";


const ResetPassword =()=>{
    const [ status, setStatus ] = useState (false);
    const [ formData, setFormData ] = useState ({
        email: ""
    });
    const { email } = formData;
    const handlingInput = (e) => setFormData({...formData, [e.target.name]: e.target.value});
    const handlingSubmit = (e) => {
        e.preventDefault();
        resetPassword( email );
        setStatus(true)
    }
    if (status) {
        return <Navigate to={"../"}></Navigate>
    }


    return (
        <div className="flex items-center justify-center min-h-screen">
    
        <form className="bg-white shadow-md rounded my-4 px-16 pt-6 pb-8 mb-4" onSubmit={handlingSubmit}>
            <p className="text-center text-green-500 text-xxs my-4">
                Please enter your E-mail
            </p>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
            <input name="email" value={email} onChange={e =>handlingInput(e)} className="shadow appearance-none border rounded w-full py-2 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Email"/>
            </div>
            <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Send Link
                </button>
            </div>
        
        </form>
       
  </div>
    )
}

export default connect(null, { resetPassword })(ResetPassword);