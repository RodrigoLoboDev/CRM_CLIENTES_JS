import { useRouteError } from "react-router-dom"

const ErrorPage = () => {

    const error = useRouteError()
    // console.log(error);
    // console.log(error.message);

  return (
    <div className="space-y-8">
        <h1 className="text-center text-6xl font-extrabold mt-20 text-blue-900">CRM - Clientes</h1>
        <p className="text-center">Hubo un error</p>
        <p className="text-center">{error.statusText || error.message}</p>
    </div>
  )
}

export default ErrorPage