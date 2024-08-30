import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { resetPasswordConfirm } from "../reducer/Actions";

const ResetPasswordConfirm =()=>{
    const [ status, setStatus ] = useState (false);
    const { uid, token } = useParams();
    const [ formData, setFormData ] = useState ({
        new_password1: "",
        new_password2: ""
    });
    const { new_password1, new_password2 } = formData;
    const handlingInput = (e) => setFormData({...formData, [e.target.name]: e.target.value});
    const handlingSubmit = (e) => {
        e.preventDefault();
        resetPasswordConfirm( uid, token, new_password1, new_password2);
        setStatus(true);
    }
    if (status) {
        return <Navigate to={"../login/"}></Navigate>
    }


    return (
        <div className="flex items-center justify-center min-h-screen">
    
        <form className="bg-white shadow-md rounded my-4 px-16 pt-6 pb-8 mb-4" onSubmit={handlingSubmit}>
        
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password1">
            Password
            </label>
            <input name="new_password1" value={new_password1} onChange={e => handlingInput(e)} className="shadow appearance-none border border-500 rounded w-full py-2 px-8 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password1" type="password" placeholder="******************"/>
            
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password2">
            New Password
            </label>
            <input name="new_password2" value={new_password2} onChange={e => handlingInput(e)} className="shadow appearance-none border border-500 rounded w-full py-2 px-8 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password2" type="password" placeholder="******************"/>
            
        </div>
        
        <div className="flex items-center justify-between">
            <button className="bg-red-500 hover:bg-green-700 text-white font-bold  w-full my-2 py-1 px-8 rounded focus:outline-none focus:shadow-outline" type="submit">
            Reset Password
            </button>
        </div>
        
        
        </form>
       
  </div>
    )
}
export default connect(null, { resetPasswordConfirm })(ResetPasswordConfirm);