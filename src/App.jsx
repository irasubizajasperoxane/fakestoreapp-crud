import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Homescreens from './assets/screens/Homescreens'
import Pagenotfound from './assets/screens/Pagenotfound'
import Loginscreen from './assets/screens/Loginscreen'
import Signup from './assets/screens/Signup'
import { House, LogIn, ShoppingCart, User } from 'lucide-react'
import ProductScreen from './assets/screens/ProductScreen'
import Singleproduct from './assets/screens/Singleproduct'
import Editscreen from './assets/screens/Editscreen'


function App() {
  return (
    <BrowserRouter>
      <div className='py-5 text-center bg-sky-800 text-white'>Heading</div>
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

          </ul>


        </div>

        <main className='w-full bg-sky-100 p-5'>
          <Routes>
            <Route index element={<Homescreens />} />
            <Route path="*" element={<Pagenotfound />} />
            <Route path="/login" element={<Loginscreen />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/products" element={<ProductScreen />} />
            <Route path="/product/:id" element={<Singleproduct/>} />
            <Route path="/edit/:id"  element={<Editscreen/>}/>


          </Routes>
        </main>
      </div>
    </BrowserRouter>

  )
}

export default App