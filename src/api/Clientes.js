export async function obtenerClientes() {
    const respuesta = await fetch(import.meta.env.VITE_URL_API)
    const resultado = await respuesta.json()
    // console.log(resultado);
    return resultado
}

export async function obtenerCliente(id) {
    const respuesta = await fetch(`${import.meta.env.VITE_URL_API}/${id}`)
    const resultado = await respuesta.json()
    // console.log(resultado);
    return resultado
}

export async function agregarCliente(datos) {
    // console.log(datos);
    try {
        const respuesta = await fetch(import.meta.env.VITE_URL_API, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        await respuesta.json()
    } catch (error) {
        console.log(error);
    }
}
// body - es lo que enviamos al servidor pero debemos convertirlo primero con JSON.stringify
// headers - especificamos que la petision es de tipo JSON

export async function actualizarCliente(datos, id) {
    // console.log(datos);
    // console.log(id);
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_URL_API}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        await respuesta.json()
    } catch (error) {
        console.log(error);
    }
}

export async function eliminarCliente(id) {
    // console.log(id);
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_URL_API}/${id}`, {
            method: 'DELETE'
        })
        await respuesta.json()
    } catch (error) {
        console.log(error);
    }
}