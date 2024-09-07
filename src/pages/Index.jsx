import React, { useMemo, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { obtenerClientes } from '../api/Clientes';
import Cliente from '../components/Cliente';

export function loader() {
    // console.log(import.meta.env);
    const clientes = obtenerClientes()
    return clientes
}

const Index = () => {

    const clientes = useLoaderData()
    // console.log(clientes);
    const [search, setSearch] = useState('')

    const filterClient = useMemo(() => clientes.filter(cliente => cliente.nombre.toUpperCase().includes(search.toUpperCase())), [search, clientes])
    // console.log(isExist);
    

  return (
    <>
        <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
        <p className='mt-3'>Administra tus Clientes</p>

        <div className=' mt-5'>
            <label 
                className=' uppercase font-bold text-gray-500'
                htmlFor="search"
            >Busqueda: </label>
            <input
                type="text"
                placeholder="Buscar cliente por nombre..."
                className="p-2 border rounded mb-4 w-full"
                id='search'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>

        {filterClient.length ? (
            <table className='w-full bg-white shadow mt-5 table-auto'>
                <thead className='bg-blue-800 text-white'>
                    <tr>
                        <th className='p-2'>Cliente</th>
                        <th className='p-2'>Contacto</th>
                        <th className='p-2'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filterClient.map( cliente => (
                        <Cliente 
                            key={cliente.id}
                            cliente={cliente}
                        />
                    ))}
                </tbody>
            </table>
        ) : (
            <p className='text-center mt-10'>No hay Clientes</p>
        )}
    </>
  )
}

export default Index