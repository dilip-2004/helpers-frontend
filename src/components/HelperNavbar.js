import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuMenu } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";

const HelperNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className='bg-slate-900 flex items-center justify-between p-2 text-white sm:px-3'>
      <div className='relative sm:hidden'>
        <div>
          {!showMenu ? (
            <LuMenu className='text-2xl text-white cursor-pointer' onClick={handleShowMenu} />
          ) : (
            <IoMdClose className='text-2xl cursor-pointer text-teal-500' onClick={handleShowMenu} />
          )}
        </div>
        {showMenu && (
          <div className='mt-2 absolute text-black bg-white space-y-2 shadow-2xl'>
            <p className='hover:bg-slate-300 p-1' onClick={handleShowMenu}>
              <Link to='/'>HOME</Link>
            </p>
            <p className='hover:bg-slate-300 p-1' onClick={handleShowMenu}>
              <Link to='/helperProfile'>PROFILE</Link>
            </p>
          </div>
        )}
      </div>

      <div className="hidden sm:flex sm:gap-5 sm:justify-center sm:items-center">
        <p className='bg-gray-800 px-1.5 py-0.5 rounded-md hover:bg-gray-700 transition delay-75 ease-in-out hover:-translate-y-1 duration-300'>
          <Link to='/'>HOME</Link>
        </p>
        <p className='bg-gray-800 px-1.5 py-0.5 rounded-md hover:bg-gray-700 transition delay-75 ease-in-out hover:-translate-y-1 duration-300'>
          <Link to='/helperProfile'>PROFILE</Link>
        </p>
      </div>

      <div className='flex items-center gap-1'>
        {false && (
          <span className='bg-gray-800 rounded-md py-0.5 px-1.5 hover:bg-gray-700 cursor-pointer'>
            LOGOUT
          </span>
        )}
      </div>
    </div>
  );
}

export default HelperNavbar;
