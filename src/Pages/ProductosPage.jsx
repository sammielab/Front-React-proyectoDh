import {ProductosContext} from '../Context/ProductosContext'
import {useContext, useState} from 'react'
import {Card} from '../Components/Card'
import { Pagination } from '../Components/Pagination'

export const ProductosPage = () => {

    const {products} = useContext(ProductosContext)
    const [postsPerPage, setPostsPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1); 

    const lastPostIndex = currentPage * postsPerPage; 
    const firstPostIndex = lastPostIndex - postsPerPage;

    const currentPosts = products.slice(firstPostIndex, lastPostIndex)
      return (
        <>
        <div>Productos</div>
        <hr />
        <Pagination
          totalPosts={products.length} 
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
        {currentPosts.map(product => (
            <Card
            id={product.id}
            image={product.image}
            title={product.title}
            description={product.description}
            price={product.price}
            />
        ))}
        </>
      )
    }
    