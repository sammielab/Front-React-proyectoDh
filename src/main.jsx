import React, { Children } from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from './App.jsx'
import './index.css'
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { HomePage } from './Pages/HomePage.jsx'
import { Register } from './Pages/Register.jsx'
import { Login } from './Pages/Login.jsx'
import { AdminPage } from './Pages/AdminPage.jsx'

const router = createBrowserRouter([
  {
    path: '/', 
    element: <App/>,
    
  }, 
  {
    path: '/register',
    element: <Register></Register>
  },
  {
    path: '/login',
    element:<Login></Login>
  }, 
  {
    path:'/Admin', 
    element: <AdminPage></AdminPage>
  }
])

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* <App /> */}
        <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
)
