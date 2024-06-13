import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Usernavbar = (props) => {

  const navigate=useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [isClicked, setIsClicked] = useState(false);

  const handleIsClicked = () => {
    setIsClicked(!isClicked);
  };

  const Logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('activeUser');
    localStorage.removeItem('userData');
    props.setUserLogin(localStorage.getItem('activeUser'));
    navigate('/'); 
  };

  return (
    <div className='flex items-center justify-between px-3 py-1.5 bg-gray-900'>
      <div>
        <h1 className='text-sm font-bold italic text-teal-500 capitalize'>
          <span className='text-white'>WELCOME! </span>
          {userData && userData.userName ? userData.userName : 'Guest'}
        </h1>
      </div>

      <div className='relative'>
        <div className='rounded-full bg-gray-800 w-10 h-10 text-center flex justify-center items-center cursor-pointer' onClick={handleIsClicked}>
          <p className=' text-white font-semibold text-2xl'>{userData.userName.charAt(0).toUpperCase()}</p>
        </div>
        {isClicked && (
          <div className='absolute right-0 top-12 text-black bg-gray-100 z-20 flex-col shadow-lg'>
            <p className='px-4 py-1 hover:bg-gray-200' onClick={handleIsClicked}>
              <Link to='/userProfile'>Profile</Link>
            </p>
            <p className='px-4 py-1 hover:text-white bg-teal-500' onClick={handleIsClicked}>
              <button onClick={Logout}>logout</button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Usernavbar;
