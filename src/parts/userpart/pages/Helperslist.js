import React, { useState, useEffect } from 'react';
import { LuSearch } from "react-icons/lu";
import axios from 'axios';
import {Link} from 'react-router-dom'
import { AiOutlineLike } from "react-icons/ai";
import { FcSportsMode } from "react-icons/fc";
import { TbFaceIdError } from "react-icons/tb";

const Helperslist = (props) => {
  const [helperDetails, setHelperDetails] = useState([]);
  const [searchedText, setSearchedText] = useState('');

  useEffect(() => {
    const getHelperDetails = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/helper/getData`);
        setHelperDetails(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getHelperDetails();
  }, []); 

  const getHelpersByRole = async (role) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/helper/getData/${role}`);
      setHelperDetails(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const searchedTextHandler = (event) => {
    setSearchedText(event.target.value);
  };

  const searchButton = () => {
    getHelpersByRole(searchedText.charAt(0).toUpperCase() + searchedText.slice(1));
    setSearchedText('');
  };

  return (
    <div className='w-full relative text-wrap bg-slate-200 min-h-screen'>
      <div className='sticky top-10 bg-slate-100 py-2 flex items-center justify-center gap-3'>
        <input
          type='text'
          value={searchedText}
          onChange={searchedTextHandler}
          placeholder='Search...'
          className='border-0 ring-1 ring-gray-100  ring-inset rounded-md text-md pl-2 py-1 focus:outline-none focus:ring-1 focus:ring-inset focus:shadow-md focus:shadow-gray-100 w-3/4'
        />
        <LuSearch className='text-xl text-gray-600 hover:text-gray-900 hover:cursor-pointer' onClick={searchButton} /> 
      </div>

      {helperDetails.length > 0 ? (
        <div className='grid grid-cols-1 sm:max-w-sm sm:m-auto md:grid-cols-1 md:max-w-md lg:grid-cols-1 lg:max-w-lg  mt-3 p-2'>
          {helperDetails.map(helper => (
            <div key={helper.id} className="bg-cover bg-center rounded-lg shadow-xl text-sm w-full p-1 my-5 bg-white">
              <div className=' flex items-center gap-3'>
                <div className='w-1/4 '> 
                  <img 
                    src={`${helper.helperImageURL}`}
                    alt='photo'
                    className=' w-16 h-16 rounded-full shadow-lg opacity-80 transition duration-300 delay-100 ease-in-out hover:opacity-100 '  
                  />
                </div>
                <div className=' w-3/4 bg-gray-100 p-1 rounded-md'>
                  <p className='text-lg font-medium text-slate-950 antialiased capitalize'>{helper.helperGender === 'Male' ? 'Mr' : 'Ms'}.{helper.helperName}</p>
                  <div className=' flex items-center gap-0.5'>
                    <p className='text-md font-medium text-yellow-500 antialiased capitalize '>{helper.helperRole}</p>
                    <FcSportsMode />
                  </div>
                  <div className=' flex items-center justify-start gap-3'>
                    <p>{helper.helperLikes ? helper.helperLikes : <div className=' text-teal-500 flex items-center ' ><AiOutlineLike className='tracking-widest text-lg text-teal-500' /><span className='tracking-widest'>:{helper.likedID.length}</span></div>}</p>
                    <p className='text-cyan-600 tracking-widest'>{helper.helperRate ? helper.helperRate : <span className='tracking-widest'>Rating:{helper.helperRating}</span>}</p>
                  </div>
                </div>
              </div>
              <div className=' flex justify-end items-center mt-3'>
                <Link to={`/HelperDetails/${helper._id}`}>
                  <button className='bg-teal-500 px-2 text-md font-medium rounded-md py-0.5 text-white transition delay-75 duration-300 ease-in-out hover:-translate-y-1'>VIEW DETAILS</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='text-center text-teal-500 mt-10 text-lg'>
          <div>There are no helpers.</div>
          <div className='text-center'>
            <TbFaceIdError className='text-9xl text-center max-w-lg m-auto' />
          </div>
        </div>
      )}
    </div>
  );
}

export default Helperslist;
