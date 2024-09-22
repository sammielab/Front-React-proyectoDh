import React from 'react'

export const Pagination = ({totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
    let pages = [] 

    for( let  i = 1; i<= Math.ceil(totalPosts/postsPerPage); i++){
         pages.push(i); 
    }

  return (
    <> 
        <button 
            onClick={() => setCurrentPage(currentPage--)}
        > Atras {currentPage}</button>
      
      {
      pages.map((page, index) => {
        return  <button key={index} onClick={() => setCurrentPage(page)}>{page}</button>
      })
      }
    </>
  )
}

