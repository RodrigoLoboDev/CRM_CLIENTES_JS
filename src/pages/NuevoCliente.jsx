import { Form, redirect, useActionData, useNavigate } from 'react-router-dom'
import { agregarCliente } from '../api/Clientes'
import Error from '../components/Error'
import Formulario from '../components/Formulario'


export async function action({request}) {
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

  await agregarCliente(datos)

  return redirect('/')
}

const NuevoCliente = () => {

  const navigate = useNavigate()
  let errores = useActionData()

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Nuevo Cliente</h1>
      <p className='mt-3'>Llena todos los campos para registrar un nuevo cliente</p>

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

          <Formulario />

          <input 
            type="submit" 
            value="Registrar Cliente"
            className='w-full bg-blue-600 hover:bg-blue-800 transition-all uppercase font-bold py-1 text-white cursor-pointer'
          />
        </Form>
      </div>
      
    </>
  )
}

export default NuevoCliente