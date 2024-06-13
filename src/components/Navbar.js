import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {

  return (
    <nav className='w-full py-1 px-3 flex justify-between items-center gap-5 bg-gray-900 text-white sticky top-0'>
      <div>
        <Link to='/'>
          <h1 className='text-center text-teal-500 text-6xl italic font-extrabold font-sans'>H</h1>
        </Link>
      </div>
      <div className='flex flex-row space-x-3 justify-center items-center '>
        <Link to='/signup' className='bg-slate-800 px-3 text-white py-0.5 rounded-md hover:bg-slate-700 transition ease-in-out hover:-translate-y-0.5 duration-300'>signup</Link>
        <Link to='/' className='bg-slate-800 px-3 text-white py-0.5 rounded-md hover:bg-slate-700 transition ease-in-out hover:-translate-y-0.5 duration-300'>login</Link>
      </div>
    </nav>
  )
}

export default Navbar