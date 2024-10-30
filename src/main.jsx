import React, { Children } from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from './App.jsx'
import './index.css'
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { HomePage } from './Pages/HomePage.jsx'
import { Register } from './Pages/session/Register.jsx'
import { Login } from './Pages/session/Login.jsx'
import { AdminPage } from './Pages/admin/AdminPage.jsx'
import {AuthProvider} from './Context/AuthProvider.jsx';
import RequireAuth from './Components/RequireAuth.jsx'; 
import UserManagement from './Pages/admin/Edit/UserManagement.jsx'; 
import {ProductsManagement} from './Pages/admin/Edit/ProductsManagement.jsx'
import { ProductosPage } from './Pages/productos/ProductosPage.jsx'
import { ProductosProvider } from './Context/ProductosProvider.jsx'
import { ProductosManageProvider } from './Context/ProductosManageProvider.jsx'
import { QueryClient,QueryClientProvider} from 'react-query'
import { AgregarProductos } from './Pages/admin/Add/AgregarProductos.jsx'
import {UsuariosProvider} from './Context/UsuariosProvider.jsx'
import {EditUser} from './Pages/admin/Edit/EditUser.jsx'
import {CatalogoPage} from './Pages/admin/CatalogoPage.jsx'
import {AddCategoria} from './Pages/admin/Add/AddCategoria.jsx'
import { CaracteristicasPage } from './Pages/admin/CaracteristicasPage.jsx'
import {AddCaracteristicasPage} from './Pages/admin/Add/AddCaracteristicasPage.jsx'
import {CategoriasPage} from './Pages/admin/Edit/CategoriasPage.jsx'
import {CategoriaAdd} from './Pages/admin/Add/CategoriaAdd.jsx'
import EditCategoriasPage from './Pages/admin/Edit/EditCategoriasPage.jsx'
import {PerfilUsuario} from './Pages/usuario/PerfilUsuario.jsx'
import {AddCategoriaToProduct} from './Pages/admin/Add/AddCategoriaToProduct.jsx'
import {VerProductoPage} from './Pages/productos/VerProductoPage.jsx'
import {ProductosFavoritos} from './Pages/usuario/ProductosFavoritos.jsx'
import {ReservaPage} from './Pages/reservas/ReservaPage.jsx'
import {ConfirmacionReservaPage} from './Pages/reservas/ConfirmacionReservaPage.jsx'
import {ReservasUsuario} from './Pages/reservas/ReservasUsuario.jsx'
import {PuntuarReserva} from './Pages/reservas/PuntuarReserva.jsx'
import {ProductGallery} from './Pages/productos/ProductGallery.jsx';
import {BusquedaResultados} from './Pages/BusquedaRespuesta.jsx'
import {BusquedaResultadosUbicacion} from './Pages/productos/BusquedaResultadosUbicacion.jsx'

const query = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/', 
    element: <App/>,
    
  }, 
  {
    path: '/register',
    element: <Register></Register>
  },
  {
    path: '/login',
    element:<Login></Login>
  }, 
  {
    path:'/admin', 
    element: <RequireAuth><AdminPage></AdminPage></RequireAuth>
  }, 
  {
    path:'/usuarios', 
    element: <RequireAuth><UsuariosProvider><UserManagement></UserManagement></UsuariosProvider></RequireAuth>
  },
  {
    path:'/usuarios/edit/:id',
    element:<RequireAuth><UsuariosProvider><EditUser></EditUser></UsuariosProvider></RequireAuth>
  },
  {
    path:'/products', 
    element: <ProductosManageProvider> <ProductsManagement></ProductsManagement> </ProductosManageProvider>,
  },
  {
    path:'/products/results',
    element:<ProductosManageProvider><BusquedaResultados></BusquedaResultados></ProductosManageProvider>
  },
  {
    path:'/search/results', 
    element:<ProductosManageProvider><BusquedaResultadosUbicacion></BusquedaResultadosUbicacion></ProductosManageProvider>
  },
  {
    path:'/products/add',
    element: <AgregarProductos></AgregarProductos>
  },
  {
    path: '/productos', 
    element: <ProductosProvider> <ProductosPage></ProductosPage></ProductosProvider>,
   
  }, 
  {
    path:'/productos/:id', 
    element: <VerProductoPage></VerProductoPage>
  },
  {
    path:'/product/gallery/:id', 
    element: <ProductGallery></ProductGallery>
  },
  {
    path:'/productos/:id/reserva', 
    element: <ReservaPage></ReservaPage>
  },
  {
    path: '/reserva/confirmacion', 
    element: <ConfirmacionReservaPage></ConfirmacionReservaPage>
  },
  {
    path: '/reservas/usuario', 
    element: <ReservasUsuario></ReservasUsuario>
  },
  {
    path: '/puntuar/reserva/:id', 
    element: <PuntuarReserva></PuntuarReserva>
  },
  {
    path: '/products/categoria/add/:id', 
    element: <ProductosProvider><AddCategoria></AddCategoria></ProductosProvider>,
   
  },
  {
    path:'/products/categorias/add/:id', 
    element: <AddCategoriaToProduct></AddCategoriaToProduct>
  },
  {
    path: '/catalogos', 
    element: <CatalogoPage></CatalogoPage>,
   
  },
  {
    path: '/caracteristicas', 
    element: <CaracteristicasPage></CaracteristicasPage>,
   
  },
  {
    path: '/caracteristicas/add', 
    element: <AddCaracteristicasPage></AddCaracteristicasPage>,
   
  },
  {
    path: '/categorias', 
    element: <CategoriasPage></CategoriasPage>,
   
  },{
    path: 'categorias/add', 
    element: <CategoriaAdd></CategoriaAdd>
  },
  {
    path:'categorias/edit/:id', 
    element: <EditCategoriasPage></EditCategoriasPage>
  },
  {
    path:'usuario/perfil', 
    element:<RequireAuth><PerfilUsuario></PerfilUsuario></RequireAuth>
  },
  {path: 'usuario/favoritos', 
  element: <ProductosFavoritos></ProductosFavoritos>
  }, 
    {
    path: '/*', 
    element:<App/>

  }
])

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <AuthProvider>
        <QueryClientProvider client={query}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
      </AuthProvider>
    </React.StrictMode>
)
