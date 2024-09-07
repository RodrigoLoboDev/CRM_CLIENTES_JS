import React from 'react'
import { Form, useNavigate, redirect } from 'react-router-dom'
import { eliminarCliente } from '../api/Clientes'

export async function action({params}) {
    const confirmar = confirm('¿Estas seguro de eliminar el Cliente?')
    if (confirmar) {
        eliminarCliente(params.clienteId)
    }

    return redirect('/')
}


const Cliente = ({cliente}) => {
    const nativage = useNavigate()
    const {id, nombre, telefono, email, empresa} = cliente

  return (
    <tr className='border-b'>

        <td className='p-6 space-y-2'>
            <p className='text-2xl text-gray-800'>{nombre}</p>
            <p>{empresa}</p>
        </td>

        <td className='p-6'>
            <p className='text-gray-800 uppercase font-bold'>Email: <span className='font-normal text-gray-600'>{email}</span></p>
            <p className='text-gray-800 uppercase font-bold'>Telefono: <span className='font-normal text-gray-600'>{telefono}</span></p>
        </td>
        
        <td className='flex justify-around p-6'>
            <button
                type='button'
                className='text-blue-600 hover:text-blue-800 font-bold'
                onClick={() => nativage(`clientes/${id}/editar`)}
            >
                Editar
            </button>
            <Form
                method='post'
                action={`/clientes/${id}/eliminar`}
            >
                <button
                    type='submit'
                    className='text-red-600 hover:text-red-800 font-bold'
                >
                    Eliminar
                </button>
            </Form>
        </td>
    </tr>
  )
}

export default Cliente