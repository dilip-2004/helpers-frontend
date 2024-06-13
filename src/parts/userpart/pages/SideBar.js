import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const SideBar = () => {

  const [showMenu,setShowMenu]=useState(false);

  const handleMenuButton=(e)=>{
    setShowMenu(!showMenu ? true : false);
  }

  return (
    <div className='py-2 sticky top-0 z-10 text-md flex sm:justify-center items-center bg-slate-100'>
    <div className='sm:hidden relative'>
      <div >
      {!showMenu && <div  className='sm:hidden bg-gray-100 rounded-sm ml-1'>
        <HiMenu className=' text-2xl cursor-pointer' onClick={handleMenuButton} />
      </div>}

      {showMenu && <div  className='sm:hidden bg-gray-100 rounded-sm ml-1'>
        <IoClose className=' text-2xl cursor-pointer' onClick={handleMenuButton} />
      </div>}
      </div>

      {showMenu && <div className='absolute bg-white ml-1 mt-1 flex-col gap-3 border border-gray-100 shadow-2xl rounded-md text-teal-500'>
        <p className='px-3 py-2 text-sm ' onClick={handleMenuButton}><Link to='/'>HelperList</Link></p>
        <p className='px-3 py-2 text-sm ' onClick={handleMenuButton}><Link to='/addedList'>AddedList</Link></p>
      </div>}
    </div>

    <div className='hidden sm:block sm:flex sm:justify-center sm:items-center sm:gap-4 text-teal-500 text-md'>
      <Link to='/' className='py-0.5 px-1.5 rounded-md bg-gray-100 transition delay-75 ease-in-out hover:-translate-y-1  hover:bg-gray-200'>HelperList</Link>
      <Link to='/addedList' className='py-0.5 px-1.5 rounded-md bg-gray-100 transition delay-75 ease-in-out hover:-translate-y-1 hover:bg-gray-200'>AddedList</Link>
    </div>
    </div>
  )
}

export default SideBar