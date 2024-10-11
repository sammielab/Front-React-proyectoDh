import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../api/productsManageService';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';

export const Home = () => {
  const [products, setProducts] =  useState([]); 
  const [randomProducts, setProductosRandom] = useState(); 
   

  // Hacer una funcion que muestre math.random 

  //Armar un listado de cards con los nombres de los productos randoms 

  const obtenerProductosRandom = async() => {
    try{
        const data = await getAllProducts(); 
        setProducts(data)
        console.log(data)
    }catch(e){
        console.log(e)
    }
  } 

  useEffect(() => {
    obtenerProductosRandom();
  }, [])

  //Funcion que retorna productos random 
  const productosRandom = () => {
    const p = products
    .sort(() => 0.5 - Math.random()) 
    .slice(0, 10);
    console.log(p)
    return p
  }

  useEffect(() => {
    console.log(products)
        if(products && products.length > 0){
            const productosR = productosRandom(); 
            console.log(productosR)
            setProductosRandom(productosR);
        }
  }, [products])
  
    return (
    <>
    <Box sx={{width: '100%', display: 'flex', justifyContent:'center', justifyItems: 'center', alignItems: 'center'}}>
    {randomProducts ? (
        <Grid container spacing={2} justifyContent="center">
        {randomProducts.map((product) => (
             <Grid item xs={12} sm={6} md={4} >
            <Card sx={{width: '100%'}}>
                 <CardContent>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        {product.id}
                        </Typography>
                    </CardContent>
            </Card>
            </Grid>
        ))}
        </Grid>
    ):(
        <p>No hay productos</p>
    )}
    </Box>
    </>
  )
}
