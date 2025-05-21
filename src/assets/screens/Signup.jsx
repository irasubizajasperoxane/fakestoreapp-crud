import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner';

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  async function handleSubmit() {

    const response = await axios.post("http://localhost:5000/register", formData);

    if (response.data == "user created!") {
      toast.success(response.data);
    } else {
      toast.error(response.data);
    }

  }
  return (
    <div>

      <div className=" min-h-screen flex items-center justify-center">

        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>

          <form onSubmit={function (e) { e.preventDefault() }} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={function (e) {
                  setFormData({ ...formData, name: e.target.value });
                }}
                id="name"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={function (e) {
                  setFormData({ ...formData, email: e.target.value });
                }}
                id="email"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={function (e) {
                  setFormData({
                    ...formData, password: e.target.value
                  });
                }}
                id="password"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account?
            < Link to={"/signup"} className="text-indigo-600 hover:underline">Log in</Link>
          </p>
        </div>

      </div>
    </div>
  )
}
