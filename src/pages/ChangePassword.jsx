import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { useState } from "react";
import { changePassword } from "../reducer/Actions";

const ChangePassword =(isAuthenticated, changePassword)=>{

    const [ formData, setFormData ] = useState ({
        new_password1: "",
        new_password2: "",
        old_password: ""
    });
    const { new_password1, new_password2, old_password } = formData;
    const handlingInput = (e) => setFormData({...formData, [e.target.name]: e.target.value});
    const handlingSubmit = (e) => {
        e.preventDefault();
        changePassword( new_password1, new_password2, old_password );
    }
    if ( !isAuthenticated && !localStorage.getItem('access') ) {
        return <Navigate to={"../login"}></Navigate>
    }


    return (
        <div className="flex items-center justify-center min-h-screen">
    
        <form className="bg-white shadow-md rounded my-4 px-16 pt-6 pb-8 mb-4" onSubmit={e => handlingSubmit(e)}>
        
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password1">
            Password
            </label>
            <input className="shadow appearance-none border border-500 rounded w-full py-2 px-8 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password1" value={password1} onChange={e =>handlingInput(e)} id="password1" type="password" placeholder="******************"/>
            
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password2">
            New Password
            </label>
            <input className="shadow appearance-none border border-500 rounded w-full py-2 px-8 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password2" value={password2} onChange={e =>handlingInput(e)} id="password2" type="password" placeholder="******************"/>
            
        </div>
        <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline" type="submit">
            Change Password
            </button>
        </div>
        
        
        <p className="text-center text-gray-500 text-xs">
            &copy;2024 All rights reserved.
        </p>
        </form>
       
  </div>
    )
}

const mapStateToProps = ( state ) => {
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated
    }
}

export default connect(mapStateToProps, { changePassword })(ChangePassword);