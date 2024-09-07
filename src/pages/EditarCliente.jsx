import { Form, useActionData, useLoaderData, useNavigate, redirect } from "react-router-dom";
import { obtenerCliente, actualizarCliente } from "../api/Clientes";
import Error from "../components/Error";
import Formulario from '../components/Formulario'


export async function loader({params}) {
    // console.log(params.clienteId);
    const cliente = await obtenerCliente(params.clienteId)

    // Codigo para crear un mensaje de error en caso que el usuario modifique la url con un id que no existe
    if (Object.values(cliente).length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'No existe el Cliente para el ID ingresado'
        })
    }

    return cliente
}

export async function action({request, params}) {
    const formData = await request.formData()
  
    const datos = Object.fromEntries(formData)
    // console.log(datos);
  
    const email = formData.get('email')
  
    // Validacion 
    const errores = []
    if (Object.values(datos).includes('')) {
      errores.push('Todos los campos son Obligatorios');
    }
  
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if (!regex.test(email)) {
      errores.push('El Email no es Valido')
    }
  
    if (Object.keys(errores).length) {
      // console.log('Si hay errores');
      return errores
    }
  
    await actualizarCliente(datos, params.clienteId)
  
    return redirect('/')
  }

const EditarCliente = () => {
    const navigate = useNavigate()
    const cliente = useLoaderData()
    const errores = useActionData()
    // console.log(cliente);

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
      <p className='mt-3'>A continuación veras la información del cliente para editar</p>

      <div className='mt-2 flex justify-end'>
        <button
          type='button'
          className='bg-blue-600 hover:bg-blue-800 transition-all text-white py-1 px-3 font-bold uppercase text-sm'
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>

      <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-10'>
        <Form
          method='post'
          noValidate
        >
          {errores?.length && errores.map((error, i) => <Error key={i} error='error'>{error}</Error>)}

          <Formulario 
            cliente={cliente}
          />

          <input 
            type="submit" 
            value="Guardar Cambios"
            className='w-full bg-blue-600 hover:bg-blue-800 transition-all uppercase font-bold py-1 text-white cursor-pointer'
          />
        </Form>
      </div>
      
    </>
  )
}

export default EditarCliente