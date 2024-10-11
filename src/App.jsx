import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './Components/NavBar'
import {Routes, Route, Navigate} from "react-router-dom"
import {HomePage} from './Pages/HomePage'
import { ProductosProvider } from './Context/ProductosProvider'
import { ProductosPage } from './Pages/ProductosPage'
import { AdminPage } from './Pages/AdminPage'
import { Register } from './Pages/Register'
import { Footer } from './Components/Footer'
import RequireAuth from './Components/RequireAuth'
import { AuthProvider } from './Context/AuthProvider'
import {Home} from './Components/Home'


export const App = () => {
  
  return (
    <ProductosProvider>
    <NavBar></NavBar>
    {/* <Buscador></Buscador> */}
    <Home></Home>
    {/* <Recomendaciones></Recomendaciones> */}
    <Footer></Footer>
  </ProductosProvider>
  )

   
}
