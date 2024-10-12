import {ProductosContext} from '../../Context/ProductosContext'
import {useContext, useEffect, useState} from 'react'
import {Card} from '../../Components/Productos/Card'
import NavBar from '../../Components/Navegacion/NavBar'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export const ProductosPage = () => {

  const { products, error, currentPage, setCurrentPage, getTotalPages } = useContext(ProductosContext);



    const handlePageChange = (event, value) => {
      setCurrentPage(value);
    };


    // const currentPosts = products.slice(firstPostIndex, lastPostIndex)
      return (
        <>
        <NavBar></NavBar>
        <div>Productos</div>
        <hr />
        <Stack spacing={2}>
          <Pagination count={getTotalPages} page={currentPage +1 }  onChange={(event, value) => setCurrentPage(value - 1)}  />
        </Stack>
        {/* <div>
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage == 0} >Anterior</button>
          <span>{currentPage}</span>
          <button onClick={() => setCurrentPage(currentPage + 1)}>Siguiente</button>
        </div> */}
        {/* <Pagination
          totalPosts={products.length} 
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        /> */}
        {products.map(product => (
            <Card
            product={product}
           
            />
        ))}
       
        </>
      )
    }
    