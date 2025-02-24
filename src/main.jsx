import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Root';
import ErrorPage from './components/ErrorPage';
import Login from './Auth/Login';
import Register from './Auth/Register';
import UserDashboard from './dashboard/UserDashboard';
import AgentDashboard from './dashboard/AgentDashboard';
import AdminDashboard from './dashboard/AdminDashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Login/>
      }, 
      {
        path: '/register',
        element: <Register/>
      }, 
      {
        path: '/user',
        element: <UserDashboard/>
      }, 
      {
        path: '/agent',
        element: <AgentDashboard/>
      }, 
      {
        path: '/admin',
        element: <AdminDashboard/>
      }, 
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
