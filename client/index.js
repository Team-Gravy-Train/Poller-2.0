import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import styles from './stylesheets/styles.css';

// import Auth from './routes/AuthRoute/AuthRoute.jsx';
import Signin from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link
} from 'react-router-dom';
import { AuthContext } from './context/AuthContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Login />,
//   },
//   {
//     path: '/signup',
//     element: <Signup />
//   }
// ]);

// createRoot(document.getElementById('root')).render(
//   <AuthProvider>
//     <RouterProvider router={router} />
//   </AuthProvider>
// )

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
