import React, { useState } from 'react'
import { AiOutlineLike } from "react-icons/ai";
import axios from 'axios'
import SuccessMessage from '../../../components/SuccessMessage'

const DashBoard = () => {

  const [helperDetails,setHelperDetails]=useState(JSON.parse(localStorage.getItem('helperData')));
  const [successMessage,setSuccessMessage]=useState('');

  const accountHandler=async()=>{

    const accountActive=helperDetails.accountActive==='Active' ? 'unActive' : 'Active';

    try{
      setSuccessMessage('');
      const res=await axios.put(`${process.env.REACT_APP_API_URL}api/helper/activeStatus/${helperDetails.id}`, {accountActive});
      localStorage.setItem('helperData',JSON.stringify(res.data));
      setHelperDetails(JSON.parse(localStorage.getItem('helperData')));
      setSuccessMessage('Successfully Updated');
      setTimeout(()=>{
        setSuccessMessage('');
      },2000);
    }catch(error){
      console.log(error.message);
    }
  }

  const workTimeHandler=async(newWorkTime)=>{
    try{
      setSuccessMessage('');
      const res=await axios.put(`${process.env.REACT_APP_API_URL}api/helper/WorkTimeUpdate/${helperDetails.id}`,{newWorkTime});
      localStorage.setItem('helperData',JSON.stringify(res.data));
      setHelperDetails(JSON.parse(localStorage.getItem('helperData')));
      setSuccessMessage('Successfully Updated Your WorkTime!');
      setTimeout(()=>{
        setSuccessMessage('');
      },2000);
    } catch(error){
      console.log(error.message);
    }
  }

  return (
    <div className=' max-w-sm m-auto sm:max-w-sm sm:m-auto sm:mt-32 mt-32'>
      <div className='border border-gray-100 bg-gray-100 m-2 p-2 py-8 rounded-lg shadow-2xl'>
        <div className='  flex justify-around items-center'>
          <div className=''><img src={`${helperDetails.helperImageURL}`} alt='photo' className=' w-24 h-24 rounded-full' /></div>
          <div className=' text-center font-semibold uppercase '>
            <p className='text-xl font-semibold'>{helperDetails.helperName}</p>
            <div className=' flex items-center justify-center text-gray-600 md:font-extrabold'>
              <AiOutlineLike className='md:font-extrabold text-xl font-semibold'/>:
              <p className='text-lg'>{helperDetails.likedID.length}</p>
            </div>
          </div>
        </div>

        <div className='mt-8 text-lx'>
          <h1 className='text-xl font-medium'>Basic Details</h1>
        </div>

        <div className='mt-1 bg-slate-200 rounded-md shadow-lg flex items-center justify-center gap-2 py-8'>
          <div className=' bg-gray-300 rounded-md p-3'>
            <p className='font-medium md:text-xl'>{helperDetails.helperRole}</p>
            <p className='text-xs text-teal-600 md:text-md'>Role</p>
          </div>
          <div className='bg-gray-300 rounded-md p-3'>
            <p className='font-medium md:text-xl'>{helperDetails.helperWorkTime}</p>
            <p className='text-xs md:text-md text-teal-600'>Work Time</p>
          </div>
          <div className='bg-gray-300 rounded-md p-3'>
            <p className='font-medium md:text-xl'>{helperDetails.helperExperience}</p>
            <p className='text-xs md:text-md text-teal-600'>Experience</p>
          </div>
        </div>
        <div className='flex items-center justify-end w-full mt-5'>
          <button className={` w-full  ${helperDetails.accountActive==='Active' ? 'bg-red-700' :'bg-teal-500'} transition delay-75 ease-in-out hover:-translate-y-1 py-1 px-3 text-white text-md font-semibold rounded-md uppercase`} onClick={accountHandler}>{helperDetails.accountActive==='Active' ? 'unActive' : 'Active' }</button>
        </div>
        <div className='mt-5 flex gap-10 items-center'>
          <button className={`w-2/4 ${helperDetails.helperWorkTime==='Full Time' ? 'bg-teal-500 text-white' : 'bg-gray-100 text-black' } transition delay-75 ease-in-out hover:-translate-y-1 py-1 px-3 text-md font-semibold rounded-md uppercase`} onClick={(e)=>{e.preventDefault();workTimeHandler('Full Time')}}>Full Time</button>
          <button className={`w-2/4 ${helperDetails.helperWorkTime==='Part Time' ? 'bg-teal-500 text-white' : ' bg-gray-300 text-black' } transition delay-75 ease-in-out hover:-translate-y-1 py-1 px-3 text-md font-semibold rounded-md uppercase`} onClick={(e)=>{e.preventDefault();workTimeHandler('Part Time')}}>Part Time</button>
        </div>
      </div>
      {successMessage && <div className=' text-center text-teal-500 text-lg font-semibold mt-5'>
        <SuccessMessage message={successMessage} />
        </div>}
    </div>
  )
}

export default DashBoard