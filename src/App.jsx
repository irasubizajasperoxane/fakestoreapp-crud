import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Homescreens from './assets/screens/Homescreens'
import Pagenotfound from './assets/screens/Pagenotfound'
import Loginscreen from './assets/screens/Loginscreen'
import Signup from './assets/screens/Signup'
import { Book, House, LogIn, LogOut, ShoppingCart, User } from 'lucide-react'
import ProductScreen from './assets/screens/ProductScreen'
import Singleproduct from './assets/screens/Singleproduct'
import Editscreen from './assets/screens/Editscreen'
import AllBooks from './books/allbooks'
import InsertBook from './books/InsertBook'
import EditBook from './books/Editbook'
import Middleware from './assets/screens/middleware'
import { toast } from 'sonner'
import axios from 'axios'

function App() {

  const [isLoggedIn,setLoggedIn]=useState(false);

  async function handleLogout(){
   const response= await axios.post("http://localhost:5000/logout")
    setLoggedIn(false);
    toast.success(response.data);
  }

  return (
    <BrowserRouter>
      <div className='py-5 px-10  flex  justify-between text-center bg-sky-800 text-white'>
        <p>Heading</p>
        {isLoggedIn &&(
        <button onClick={handleLogout} className='flex gap-3'><LogOut/> LOGOUT</button>
        )}
        </div>
      <div className='flex min-h-screen'>
        <div className='py-5 text-center bg-sky-600 text-white w-50'>
          <ul className='space-y-3'>
            <li>
              <Link to="/" className='flex gap-3'  > <House />Home</Link>
            </li>
            <li>
              <Link to="/login" className='flex gap-3'><LogIn />Login</Link>
            </li>

            <li>
              <Link to="/signup" className='flex gap-3'><User />Signup</Link>
            </li>
            <li>
              <Link to="/products" className='flex gap-3'><ShoppingCart />Products</Link>
            </li>
            <li>
              <Link to={"/books"} className='flex gap-3'><Book />Books</Link>
            </li>


          </ul>
        </div>
        <main className='w-full bg-sky-100 p-5'>
          <Routes>
            <Route path="/login" element={<Loginscreen  isLoggedIn={isLoggedIn} onLogin={setLoggedIn}/>} />
            <Route path="/signup" element={<Signup />} />

            {/* private routes */}
            <Route element={< Middleware  isAuthenticated={isLoggedIn} />}>
              <Route index element={<Homescreens />} />
              <Route path="/products" element={<ProductScreen />} />
              <Route path="/product/:id" element={<Singleproduct />} />
              <Route path="/edit/:id" element={<Editscreen />} />
              <Route path="/books" element={<AllBooks />} />
              <Route path="/book/create" element={<InsertBook />} />
              <Route path="/book/:id/edit" element={<EditBook />} />
            </Route>
            <Route path="*" element={<Pagenotfound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>

  )
}

export default App