import { useNavigate, useLocation } from "react-router-dom";
import { Route, Routes, Link } from "react-router-dom"
import React, { useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreatePoll from './pages/CreatePoll';
import TakePoll from './pages/TakePoll';
import { DisplayPoll, UpdateTable } from "./pages/DisplayPoll";

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
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <ul className="navbar-nav float-end">
        <li className="nav-link"><Link to='/login'>Login</Link></li>
        <li className="nav-link"><Link to='/signup'>Sign-up</Link></li>
        <li className="nav-link"><Link to='/'>Home</Link></li>
        <li className="nav-link"><Link to='/1/display'>Display1</Link></li>
      </ul>
    </nav>

      <Routes>
        <Route path='/' element={<CreatePoll />} />
        <Route path='/:id' element={<TakePoll />} />
        <Route path='/poll/:id' element={<DisplayPoll />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </>

    )
}

export default App;
