import React, { Children } from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from './App.jsx'
import './index.css'
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { HomePage } from './Pages/HomePage.jsx'
import { Register } from './Pages/Register.jsx'
import { Login } from './Pages/Login.jsx'
import { AdminPage } from './Pages/AdminPage.jsx'
import {AuthProvider} from './Context/AuthProvider.jsx';
import RequireAuth from './Components/RequireAuth.jsx'; 
import UserManagement from './Pages/UserManagement.jsx'; 
import {ProductsManagement} from './Pages/ProductsManagement.jsx'
import { ProductosPage } from './Pages/ProductosPage.jsx'
import { ProductosProvider } from './Context/ProductosProvider.jsx'
import { ProductosManageProvider } from './Context/ProductosManageProvider.jsx'
import { QueryClient,QueryClientProvider} from 'react-query'
import { AgregarProductos } from './Pages/AgregarProductos.jsx'
import {UsuariosProvider} from './Context/UsuariosProvider.jsx'
import {EditUser} from './Pages/EditUser.jsx'
import {CatalogoPage} from './Pages/CatalogoPage.jsx'
import {AddCategoria} from './Pages/AddCategoria.jsx'
import { CaracteristicasPage } from './Pages/CaracteristicasPage.jsx'
import {AddCaracteristicasPage} from './Pages/AddCaracteristicasPage.jsx'
import {CategoriasPage} from './Pages/CategoriasPage.jsx'
import {CategoriaAdd} from './Pages/CategoriaAdd.jsx'
import EditCategoriasPage from './Pages/EditCategoriasPage.jsx'
import {PerfilUsuario} from './Pages/usuario/PerfilUsuario.jsx'
import {AddCategoriaToProduct} from './Pages/AddCategoriaToProduct.jsx'
import {VerProductoPage} from './Pages/VerProductoPage.jsx'
import {ProductosFavoritos} from './Pages/usuario/ProductosFavoritos.jsx'
import {ReservaPage} from './Pages/reservas/ReservaPage.jsx'
import {ConfirmacionReservaPage} from './Pages/reservas/ConfirmacionReservaPage.jsx'



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
  },{
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
    path:'/productos/:id/reserva', 
    element: <ReservaPage></ReservaPage>
  },
  {
    path: '/reserva/confirmacion', 
    element: <ConfirmacionReservaPage></ConfirmacionReservaPage>
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
