import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import SpinnerLoader from '../../../components/SpinnerLoader'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SuccessMessage from '../../../components/SuccessMessage';

const schema=yup.object().shape({
  helperName:yup.string().required('Helper name is required'),
  helperDOB:yup.date().required('Date of birth must be selected'),
  helperRole:yup.string().required(),
  helperExperience:yup.string().required(),
  helperEmail:yup.string().email('Invalid email format').required('Helper email is required'),
  helperPassword:yup.string().min(8,'Password must be atleast 8 character').required('password is required'),
  helperConfirmPassword:yup.string().oneOf([yup.ref('helperPassword'),null],'Passwords must same').required('confirm password is required'),
});

const HelperProfile = (props) => {

  const [helperDetails,setHelperDetails]=useState(JSON.parse(localStorage.getItem('helperData')));
  const [loading, setLoading] = useState(false);
  const [disabled,setDisabled]=useState(true);
  const [successMessage,setSuccessMessage]=useState('');
  const navigate=useNavigate();

  const {register,reset,handleSubmit,formState:{errors}}=useForm({
    resolver:yupResolver(schema)
  });

  const formattedDOB = new Date(helperDetails.helperDOB).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const editBtnHandler=(e)=>{
    e.preventDefault();
    setDisabled(false);
  }

  const OnSubmit=async(values)=>{
    setLoading(true);
    try{
      setSuccessMessage('');
      const res=await axios.put(`${process.env.REACT_APP_API_URL}api/helper/update/${helperDetails.id}`,values);
      localStorage.setItem('helperData',JSON.stringify(res.data));
      setHelperDetails(JSON.parse(localStorage.getItem('helperData')));
      setSuccessMessage('Successfully updated');
      setTimeout(()=>{
        setSuccessMessage('');
        navigate('/');
      },2000)
      reset();
    }catch(error){
      console.log(error.message);
    }finally{
      setLoading(false);
    }
  }

  const logoutHandler=(e)=>{
    e.preventDefault();
    localStorage.removeItem('activeHelper');
    localStorage.removeItem('helperData');
    props.setHelperLogin(localStorage.getItem('activeHelper'));
    navigate('/');
  }

  return (
    <div className='mx-2 shadow-lg rounded-lg p-2 sm:w-full sm:max-w-sm sm:mx-auto md:w-full md:max-w-md md:mx-auto md:mt-24'>
      {disabled ? <div className="mx-auto p-4">
        <div className=" overflow-hidden ">
          <div className="md:flex items-center md:px-2">
            <div className="">
              <img className=" h-60 sm:h-auto w-full object-cover md:w-48 md:rounded-lg" src={`${helperDetails.helperImageURL}`} alt="Helperphoto" />
            </div>
            <div className="p-4 md:p-8">
              <div className="uppercase tracking-wide text-sm text-teal-500 font-semibold mb-2">
                {helperDetails.helperRole}
              </div>
              <p  className="block text-xl font-medium text-black mb-2">{helperDetails.helperName}</p>
              <p className="text-black mb-1 font-medium">{helperDetails.helperEmail}</p>
              <p className="text-black mb-1 font-medium">{helperDetails.helperPhoneNumber}</p>
              <p className="text-gray-500 mb-1">DOB: <span className='text-black text-md font-medium'>{formattedDOB}</span></p>
              <p className="text-gray-500 mb-1">Gender: <span className='text-black text-md font-medium'>{helperDetails.helperGender}</span></p>
              <p className="text-gray-500 mb-1">Experience: <span className='text-black text-md font-medium'>{helperDetails.helperExperience}</span></p>
              <p className="text-gray-500 mb-1">Work Time: <span className='text-black text-md font-medium'>{helperDetails.helperWorkTime}</span></p>
              <p className="text-gray-500 mb-1">Account Status: <span className='text-black text-md uppercase font-medium'>{helperDetails.accountActive}</span></p>
              <button className="flex w-full mt-3 justify-center rounded-md bg-teal-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-600" onClick={editBtnHandler}>EDIT</button>
              <button className="flex w-full mt-4 justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-700" onClick={logoutHandler}>LOGOUT</button>
            </div>
          </div>
        </div>
      </div> :

      <form onSubmit={handleSubmit(OnSubmit)}>
        {/* Helper Name */}
        <div>
          <label className=' block text-sm font-medium leading-6 text-gray-600 my-2'>
            HelperName{' '}
            <span className='text-gray-400 text-xs bg-gray-100 rounded-md p-1'>OLD NAME:{helperDetails.helperName}</span>
          </label>
          <div className='mt-1'>
            <input
              type='text'
              name='helperName' 
              placeholder='Name...'
              {...register('helperName')}
              className='block w-full rounded-md border-0 py-1.5 pl-1.5 text-gray-600 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-500 focus:shadow-lg focus:outline-none'
            />
          </div>

          <div className='mt-1'>
            <p className='text-sm text-red-600'>
              {errors.helperName?.message}
            </p>
          </div>
        </div>

        {/* DOB */}
        <div>
          <label className=' block text-sm font-medium leading-6 text-gray-600 my-2'>
            DOB{' '}
            <span className='text-gray-400 text-xs bg-gray-100 rounded-md p-1'>OLD DOB:{formattedDOB}</span>
          </label>
          <div className='mt-1'>
            <input
              type='date'
              name='helperDOB' 
              placeholder='******'
              {...register('helperDOB')}
              className='block w-full rounded-md border-0 py-1.5 pl-1.5 text-gray-600 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-500 focus:shadow-lg focus:outline-none'
            />
          </div>

          <div className='mt-1'>
            <p className='text-sm text-red-600'>
              {errors.helperDOB?.message}
            </p>
          </div>
        </div>

        {/* Role */}
        <div>
          <label className=' block text-sm font-medium leading-6 text-gray-600 my-2'>
            Role{' '}
            <span className='text-gray-400 text-xs bg-gray-100 rounded-md p-1'>OLD ROLE:{helperDetails.helperRole}</span>
          </label>
          <div className='mt-1'>
          <select
              name='helperRole'
              {...register('helperRole')}
              className='block w-full rounded-md border-0 py-1.5 pl-1 text-gray-600 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-500 focus:shadow-lg focus:outline-none'
            >
              <option value='Calisthenics'>Calisthenics</option>
              <option value='Gym'>Gym</option>
              <option value='Kabaddi'>Kabaddi</option>
              <option value='Cricket'>Cricket</option>
              <option value='Volleyball'>Volleyball</option>
              <option value='Basketball'>Basketball</option>
              <option value='Batminton'>Batminton</option>
              <option value='Physiotherapist'>Physiotherapist</option>
              <option value='Orthopedic'>Orthopedic</option>
              <option value='Nephrologist'>Nephrologist</option>
              <option value='Neurologist'>Neurologist</option>
              <option value='Phlebologist'>Phlebologist</option>
              <option value='Cardiologist'>Cardiologist</option>
            </select>
          </div>
        </div>

        {/* Experience */}
        <div>
          <label className=' block text-sm font-medium leading-6 text-gray-600 my-2'>
            Experience{' '}
            <span className='text-gray-400 text-xs bg-gray-100 rounded-md p-1'>OLD EXPERIENCE:{helperDetails.helperExperience}</span>
          </label>
          <div className='mt-1'>
            <select
              name='helperExperience'
              {...register('helperExperience')}
              className='block w-full rounded-md border-0 py-1.5 pl-1 text-gray-600 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-500 focus:shadow-lg focus:outline-none'
            >
              <option value='fresher'>Fresher</option>
              <option value='1 year'>1 year</option>
              <option value='2 year'>2 year</option>
              <option value='3 year'>3 year</option>
              <option value='above 3 year'>above 3 year</option>
            </select>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className=' block text-sm font-medium leading-6 text-gray-600 my-2'>
            Email address{' '}
            <span className='text-gray-400 text-xs bg-gray-100 rounded-md p-1'>OLD EMAIL:{helperDetails.helperEmail}</span>
          </label>
          <div className='mt-1'>
            <input
              type='email'
              name='helperEmail' 
              placeholder='you@gmail.com'
              {...register('helperEmail')}
              className='block w-full rounded-md border-0 py-1.5 pl-1.5 text-gray-600 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-500 focus:shadow-lg focus:outline-none'
            />
          </div>
          <div className='mt-1'>
              <p className='text-sm text-red-600'>
                {errors.helperEmail?.message}
              </p>
            </div>
        </div>

        {/* Password */}
        <div>
          <label className=' block text-sm font-medium leading-6 text-gray-600 my-2'>
            Password{' '}
            {/* <span className='text-gray-400 text-xs bg-gray-100 rounded-md p-1'>OLD password:{helperDetails.helperPassword}</span> */}
          </label>
          <div className='mt-1'>
            <input
              type='password'
              name='helperPassword' 
              placeholder='******'
              {...register('helperPassword')}
              className='block w-full rounded-md border-0 py-1.5 pl-1.5 text-gray-600 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-500 focus:shadow-lg focus:outline-none'
            />
          </div>
          <div className='mt-1'>
              <p className='text-sm text-red-600'>
                {errors.helperPassword?.message}
              </p>
            </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className=' block text-sm font-medium leading-6 text-gray-600 my-2'>
            Confirm password{' '}
            {/* <span className='text-gray-400 text-xs bg-gray-100 rounded-md p-1'>OLD CP:{helperDetails.helperConfirmPassword}</span> */}
          </label>
          <div className='mt-1'>
            <input
              type='password'
              name='helperConfirmPassword' 
              placeholder='******'
              {...register('helperConfirmPassword')}
              className='block w-full rounded-md border-0 py-1.5 pl-1.5 text-gray-600 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-500 focus:shadow-lg focus:outline-none'
            />
          </div>
          <div className='mt-1'>
              <p className='text-sm text-red-600'>
                {errors.helperConfirmPassword?.message}
              </p>
            </div>
        </div>

        <div className=' my-3'>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-teal-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-600"
          >
            {loading ? (
            <SpinnerLoader />
            ) : (
              'update'
            )}
          </button>
        </div>
      </form>}
      {successMessage!=='' && 
      <div className='text-center text-teal-500 text-lg font-semibold'>
        <SuccessMessage message={successMessage} />
        </div>}
    </div>
  )
}

export default HelperProfile;