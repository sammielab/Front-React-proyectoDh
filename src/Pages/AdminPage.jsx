import React from 'react'
import NavBar from '../Components/NavBar'
import MenuAdmin from '../Components/MenuAdmin'

export const AdminPage = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className='container'>
      <MenuAdmin></MenuAdmin>
      </div>
    </div>
  )
}


