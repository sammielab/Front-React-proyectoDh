import { useContext, useEffect, useState } from "react"
// import { CartContext } from "../context/CartContext"

export const Card = ({id, image, title, description, price}) => {
    
    // const {shoppingList} = useContext(CartContext)
    // const [added,setAdded] = useState(false)

    // const addProduct = () => {
    //     handlerAdd()
    //     setAdded(true)
    // }
    // const removeProduct = () => {
    //     handlerRemove()
    //     setAdded(false)
    // }

    // useEffect(() => {
    //     checkAdded()
    // }, [])

    // const checkAdded = () => { 
    //   const productoAgregado =  shoppingList.some(product => product.id == id)
    //   setAdded(productoAgregado)
    // }


  return (
    <>
    <div className="card">
        <img src="{image}" alt="imagen" className="card-img" />

        <div className="card-content">
            <h3 className="card-title">{title}</h3>
            <p className="card-description">{description}</p>
            <p className="card-price">{price}</p>
        </div>
    </div>
    </>
  )
}
