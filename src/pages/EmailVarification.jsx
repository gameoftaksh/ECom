import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { emailVerification } from "../reducer/Actions";

const EmailVarification =()=>{
    const [ status, setStatus ] = useState (false);
    const { key } = useParams();
    const handlingSubmit = (e) => {
        e.preventDefault();
        emailVerification( key );
        setStatus(true)
    }
    if (status) {
        return <Navigate to={"../login/"}></Navigate>
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
    
        <form onSubmit={e => handlingSubmit(e)} className="bg-white shadow-md rounded my-4 px-16 pt-6 pb-8 mb-4">
        
            <p className="text-center text-blue-500 text-xxs">
                Click on activate account button to activate your account
            </p>
            <div className="flex items-center justify-between">
                <button className="bg-red-500 hover:bg-green-700 text-white font-bold  w-full my-2 py-1 px-8 rounded focus:outline-none focus:shadow-outline" type="button">
                    Activate Account
                </button>
            </div>

        </form>
       
  </div>
    )
}

export default connect(null, { emailVerification })(EmailVerification);