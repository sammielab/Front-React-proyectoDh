import { useContext, useEffect, useState } from "react"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
// import { CartContext } from "../context/CartContext"

export const Card = ({product}) => {
  const navigate = useNavigate()
    
  const handleProduct = (product) => {
    navigate(`/productos/${product.id}`)
  }

  return (
    <>
    <div className="card">
        <img src="{image}" alt="imagen" className="card-img" />

        <div className="card-content">
            <h3 className="card-title">{product.titulo}</h3>
            <p className="card-description">{product.descripcion}</p>
            <p className="card-price">{product.precio}</p>
            <Button variant="text" onClick={(() => handleProduct(product))} startIcon={<Add></Add>}>Ver</Button>
        </div>
    </div>
    </>
  )
}
