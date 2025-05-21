import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'sonner';

function Middleware({isAuthenticated}){
    // const [isLoggedIn, setLoggedIn] = useState(false);
    //check if there is a logged in user

    // async function checkAuth() {
    //     const response = await axios.get("http://localhost:5000/user");
    //     if (response.status == 200) {
    //         setLoggedIn(true);
    //     } else {
    //         setLoggedIn(false);
    //     }
    // }
    // useEffect(function () {
    //     checkAuth();
    // }, [])

    if (isAuthenticated) {
        return <Outlet />
    } else {
        toast.info("please login!");
        return <Navigate to={"/login"} />
    }
}

export default Middleware