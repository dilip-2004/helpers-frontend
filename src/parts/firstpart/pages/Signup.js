import React from 'react'
import { Link,Outlet } from 'react-router-dom';

const Signup = () => {

  return (
    <div className=' flex min-h-full flex-col justify-center py-12 px-6'>
      <div className=' sm:w-full sm:max-w-sm sm:mx-auto'>
        <h1 className='text-center text-teal-500 text-7xl italic font-extrabold'>H</h1>
        <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-600">
        <span className='text-teal-500'>Register</span> a new account
        </h2>
      </div>

      <div 
        className=' mt-10 shadow-lg rounded-lg p-2 sm:w-full sm:max-w-sm       sm:mx-auto md:w-full md:max-w-md md:mx-auto'>
        <div className=''>
          <p className="block text-sm font-medium leading-6 text-gray-600">
            Select your option
          </p>
          <div className=' mt-2 w-full flex items-center gap-1'>
            <Link to='/signup/userSignup'
              className={`w-2/4 text-center border-0 text-black bg-gray-300 rounded-md hover:bg-teal-500 hover:text-white`}
            >
              User
            </Link>
            <Link to='/signup/helperSignup'
              className={`w-2/4 text-center border-0 text-black bg-gray-300 rounded-md hover:bg-teal-500 hover:text-white`}
            >
              Helper
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default Signup