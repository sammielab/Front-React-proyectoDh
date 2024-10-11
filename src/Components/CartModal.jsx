import React from 'react'

export const CartModal = ({handleShowModal}) => {
  return (
    <>
      <button onClick={handleShowModal}></button>
      <table>
        <thead>
            <tr>
                <th>Productos</th>
                <th>Eliminar</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Nombre</td>
                <td>Total: $500</td>
            </tr>
        </tbody>
      </table>
    </>
  )
}

