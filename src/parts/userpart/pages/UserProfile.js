import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UserProfile = (props) => {

  const navigate=useNavigate();
  const [userData,setUserData]=useState(JSON.parse(localStorage.getItem('userData')));

  const Logout=(e)=>{
    e.preventDefault();
    localStorage.removeItem('activeUser');
    localStorage.removeItem('userData');
    props.setUserLogin(localStorage.getItem('activeUser'));
    navigate('/');
  }


  return (
    <div className=" bg-slate-100 text-black rounded-md shadow-md py-6 px-2 m-2 xl:m-auto xl:mt-2 sm:mt-2 md:mt-2 lg:mt-2 sm:max-w-sm sm:m-auto md:max-w-md md:m-auto lg:max-w-lg lg:m-auto" style={{ fontFamily: 'Arial, sans-serif' }}>
  <h2 className="text-3xl font-bold mb-6">User Profile</h2>
  <div className="mb-4">
    <div className="flex items-center mb-4 bg-gray-200 rounded-md w-full p-1">
      <span className="text-xl font-bold mr-4">Name:</span>
      <p className="text-lg font-mono">{userData.userName}</p>
    </div>
    <div className="flex items-center bg-gray-200 p-1 rounded-md w-full">
      <span className="text-xl font-bold mr-4">Email:</span>
      <p className="text-lg font-mono">{userData.userEmail}</p>
    </div>
  </div>
  <div className="flex justify-between">
    <button
      className="bg-teal-600 text-white px-6 py-1.5 rounded-lg hover:bg-teal-700 transition duration-300 ease-in-out"
      onClick={Logout}
    >
      Logout
    </button>
  </div>
</div>
  )
}

export default UserProfile