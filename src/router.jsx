import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import NuevoCliente, {action as nuevoClienteAction} from './pages/NuevoCliente'
import Index, {loader as clientesLoader} from './pages/Index'
import ErrorPage from './components/ErrorPage'
import EditarCliente, {loader as editarClienteLoader, action as editarClienteAction} from './pages/EditarCliente'
import {action as eliminarClienteAction} from './components/Cliente'

export const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Index />,
          loader: clientesLoader,
          errorElement: <ErrorPage />
        },
        {
          path: '/clientes/nuevo',
          element: <NuevoCliente />,
          errorElement: <ErrorPage />,
          action: nuevoClienteAction
        },
        {
          path: '/clientes/:clienteId/editar',
          element: <EditarCliente />,
          errorElement: <ErrorPage />,
          loader: editarClienteLoader,
          action: editarClienteAction
        },
        {
          path: '/clientes/:clienteId/eliminar',
          action: eliminarClienteAction
        }
      ]
    }
    
  ])