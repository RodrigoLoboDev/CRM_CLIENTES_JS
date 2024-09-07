import { Link, Outlet, useLocation } from "react-router-dom"
import Footer from "../components/Footer"

const Layout = () => {

    const location = useLocation()
    // console.log(location);

  return (
    <>
        <div className="md:flex md:min-h-screen">
            <aside className="md:w-1/4 bg-blue-900 px-5 py-10">
                <h2 className="text-4xl font-black text-center text-white">CRM - Clientes</h2>

                <nav className="mt-10">
                    <Link 
                        className={`block text-2xl mt-2 hover:text-blue-300 ${location.pathname === "/" ? "text-blue-300" : "text-white"}`} 
                        to="/">Clientes</Link>
                    <Link 
                        className={`block text-2xl mt-2 hover:text-blue-300 ${location.pathname === "/clientes/nuevo" ? "text-blue-300" : "text-white"}`}  
                        to="/clientes/nuevo">Nuevo Cliente</Link>
                </nav>
            </aside>

            <main className="md:w-3/4 p-10 md:h-screen overflow-scroll">
                <Outlet />
            </main>

        </div>
        <Footer />
    </>
  )
}

export default Layout