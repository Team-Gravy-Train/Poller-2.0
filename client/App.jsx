import { useNavigate, useLocation } from "react-router-dom";
import { Route, Routes, Link } from "react-router-dom"
import React, { useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreatePoll from './pages/CreatePoll';
import TakePoll from './pages/TakePoll';
import { DisplayPoll, UpdateTable } from "./pages/DisplayPoll";
import NavBar from './pages/NavBar';

{/* <Route path='/' element={<Homepage />} /> */}

function App() {

  // Navigate to requested URL on component mount
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    navigate(location.path);
  }, [])

  return (
    <>
    <div className='navbar'>
        <NavBar />
        
      </div>
  
    
    

      <Routes>
        <Route path='/' element={<CreatePoll />} />
        <Route path='/:id' element={<TakePoll />} />
        <Route path='/:id/display' element={<DisplayPoll />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </>

    )
}

export default App;