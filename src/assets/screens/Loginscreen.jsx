import axios from 'axios';
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Loginscreen({onLogin,isLoggedIn}) {

const [formData,setFormData]=useState({
  email:"",
  password:"",
});

 async function handleSubmit(){
  const response= await axios.post("http://localhost:5000/login",formData);

  if(response.data=="you have successfully logged in!"){
  toast.success(response.data);
  onLogin(true);
  }else{
    toast.error("Incorrect, please try again!");
    onLogin(false);
  }
}

if(isLoggedIn){
  return <Navigate to={"/books"}/>
}
  return (
    <div>
      <div className=" min-h-screen flex items-center justify-center">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">Login to Your Account</h2>

          <form onSubmit={function(e){e.preventDefault()}} className="space-y-5">
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={function(event){
                  setFormData({...formData,email:event.target.value});
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={function(event){
                  setFormData({...formData,password:event.target.value});
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm">
                <input type="checkbox" className="form-checkbox text-blue-700 mr-2" />
                Remember me
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
            </div>

            <button
            onClick={handleSubmit}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Don’t have an account?
            <a href="#" className="text-blue-600 hover:underline">Sign up</a>
          </p>
        </div>

      </div>
    </div>
  )
}
