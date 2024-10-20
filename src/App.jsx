import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './Components/Navegacion/NavBar'
import {Routes, Route, Navigate} from "react-router-dom"
import {HomePage} from './Pages/HomePage'
import { ProductosProvider } from './Context/ProductosProvider'
import { ProductosPage } from './Pages/productos/ProductosPage'
import { AdminPage } from './Pages/admin/AdminPage'
import { Register } from './Pages/session/Register'
import { Footer } from './Components/Navegacion/Footer'
import RequireAuth from './Components/RequireAuth'
import { AuthProvider } from './Context/AuthProvider'
import {Home} from './Components/Home'
import { Buscador } from './Components/Navegacion/Buscador'


export const App = () => {
  
  return (
    <ProductosProvider>
    <NavBar></NavBar>
      <Buscador></Buscador>
      <Home></Home>
    <Footer></Footer>
  </ProductosProvider>
  )

   
}
