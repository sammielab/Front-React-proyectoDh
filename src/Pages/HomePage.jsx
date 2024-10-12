import {Recomendaciones} from '../Components/Recomendaciones'
import {Buscador} from '../Components/Buscador'
import { ProductosPage } from './productos/ProductosPage'
import {Footer} from '../Components/Navegacion/Footer'

export const HomePage = () => {
  return (
      <>
      <Buscador></Buscador>
      <Recomendaciones></Recomendaciones>
      <Footer></Footer>
      {/* <ProductosPage></ProductosPage> */}
    </>
  )
}
