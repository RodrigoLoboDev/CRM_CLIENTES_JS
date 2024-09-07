const Error = ({children, error}) => {
  return (
    <div className={`text-white ${error==='error' ?'bg-red-800' : 'bg-lime-600'} py-3 px-5 mb-5 uppercase text-center font-bold`}>
        {children}
    </div>
  )
}

export default Error