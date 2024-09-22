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
import { Footer } from './Components/Footer'


export const App = () => {
  return (
    <ProductosProvider>
    <NavBar></NavBar>
   
    <Routes>
         <Route path='/' element={<HomePage/>}></Route>
         <Route path='/productos' element={<ProductosPage/>}></Route>
         <Route path='/admin' element={<AdminPage/>}></Route>
         <Route path='/*' element={<Navigate to='/' />}></Route>
    </Routes>
  </ProductosProvider>
  )

   
}
