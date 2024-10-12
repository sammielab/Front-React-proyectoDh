import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/Navegacion/NavBar'
import { ListProductosFav } from '../../Components/Productos/ListProductosFav'





export const ProductosFavoritos = () => {


    return (
        <>
            <NavBar />
            <ListProductosFav></ListProductosFav>
        </>
    )}
