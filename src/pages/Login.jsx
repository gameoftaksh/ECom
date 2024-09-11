import React from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { login } from "../reducer/Actions";

const Login = ({login, isAuthenticated}) => {
    const navigate = useNavigate();

    const [ formData, setFormData ] = useState ({
        email: "",
        password: ""
    });
    const { email, password } = formData;
    const handlingInput = (e) => setFormData({...formData, [e.target.name]: e.target.value});
    
    const reachGoogle = () => {
        const clientID = "";
        const callBackURI = "http://localhost:3000/";
        window.location.replace(`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${callBackURI}&prompt=consent&response_type=code&client_id=${clientID}&scope=openid%20email%20profile&access_type=offline`)
        
    }
    const handlingSubmit = (e) => {
        e.preventDefault();
        login( email, password );
    }

    if (isAuthenticated) {
        return <Navigate to={"../"}></Navigate>
    }

    const handleSignUp = () => {
        navigate('/signup'); 
    };

    const handleResetPass = () =>{
        navigate('/reset-password')
  }

    return (
        <div className="flex items-center justify-center min-h-screen">
     
            <form className="bg-white shadow-md rounded my-4 px-16 pt-6 pb-8 mb-4" onSubmit={handlingSubmit}>
            
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Email
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" value={email} onChange={handlingInput} id="username" type="text" placeholder="Username" required/>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
                </label>
                <input className="shadow appearance-none border border-500 rounded w-full py-2 px-8 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password" value={password} onChange={handlingInput} id="password" type="password" placeholder="******************" required/>
                
            </div>
            <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline" type="submit">
                Sign In
                </button>
                <a onClick={handleResetPass} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                Forgot Password?
                </a>

            </div>
            <div className="flex items-center justify-between">
                <button onClick={handleSignUp} className="bg-yellow-500 hover:bg-blue-700 text-white font-bold w-full my-2 py-1 px-8 rounded focus:outline-none focus:shadow-outline" type="button" href='/signup'>
                SignUp
                </button>
            </div>
            <p className="text-center text-gray-500 text-xs">
                OR
            </p>
            <div className="flex items-center justify-between">
                <button onClick={reachGoogle} className="bg-red-500 hover:bg-green-700 text-white font-bold  w-full my-2 py-1 px-8 rounded focus:outline-none focus:shadow-outline" type="button">
                Sign In with Google
                </button>
            </div>
            
            <p className="text-center text-gray-500 text-xs">
                &copy;2024 Acme Corp. All rights reserved.
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

export default connect(mapStateToProps, { login })(Login)