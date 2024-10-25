import {ProductosContext} from '../../Context/ProductosContext'
import {useContext, useEffect, useState} from 'react'
import {Card} from '../../Components/Productos/Card'
import NavBar from '../../Components/Navegacion/NavBar'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Footer } from '../../Components/Navegacion/Footer';
import { Box, Typography } from '@mui/material';

export const ProductosPage = () => {

  const { products, error, currentPage, setCurrentPage, getTotalPages } = useContext(ProductosContext);



    const handlePageChange = (event, value) => {
      setCurrentPage(value);
    };


    // const currentPosts = products.slice(firstPostIndex, lastPostIndex)
      return (
        <>
        <NavBar></NavBar>
        <Typography variant='h5' className='light-color'>Listado de Productos</Typography>
        <hr />
        <Box>
        <Stack spacing={2}>
          <Pagination count={getTotalPages} page={currentPage +1 }  onChange={(event, value) => setCurrentPage(value - 1)}  />
        </Stack>
       
        {products.map(product => (
            <Card
            product={product}
           
            />
        ))}
        </Box>
       <Footer></Footer>
        </>
      )
    }
    