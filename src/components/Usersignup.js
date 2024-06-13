import React, { useState } from 'react'
import { Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import axios from 'axios';
import SpinnerLoader from '../components/SpinnerLoader'
import SuccessMessage from '../components/SuccessMessage'
import ErrorMessage from '../components/ErrorMessage'

const schema=yup.object().shape({
    userName:yup.string().min(3, 'Username must be at least 3 characters').max(30, 'Username must be at most 30 characters').matches(/^[a-zA-Z0-9_]+$/, 'Username must contain only alphanumeric characters and underscores').required('Username is required'),
    userEmail:yup.string().email('Invalid email format').required('Email is a required field'),
    userPassword:yup.string().min(8, 'Password must be at least 8 characters').max(20, 'Password must be at most 20 characters').required('Password is required'),
  });
  
const Usersignup = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {register,handleSubmit,formState:{errors},reset}=useForm({
    resolver:yupResolver(schema)
  });

  const OnSubmit=async values=>{

    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}api/user/signup`, values);
      console.log(res);
      setTimeout(() => {
        setSuccessMessage('Account Created!');
        reset();
        setLoading(false);
      }, 0);
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      setError('email already exist..'); 
    }
  };

  return (
    <div className='mt-4 shadow-lg rounded-lg relative p-2 sm:w-full sm:max-w-sm sm:mx-auto md:w-full md:max-w-md md:mx-auto'>
      <form onSubmit={handleSubmit(OnSubmit)}>
        <div className=''>
          <h1 className='text-center font-bold text-teal-500 text-xl'>
            USER SIGNUP
          </h1>
        </div>

        <div className='mt-2'>
          <label className="block text-sm font-medium leading-6 text-gray-600">
            User name
          </label>
          <div className="mt-1">
            <input
              id="userName"
              name="userName"
              type="text"
              placeholder='username..'
              {...register('userName')}
              className="block w-full rounded-md border-0 py-1.5 pl-1.5 text-gray-600 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:border-0 focus:outline-none focus:shadow-lg focus:ring-inset focus:ring-teal-500"
            />
          </div>
          <div className='mt-1'>
            <p className='text-sm text-red-600'>
              {errors.userName?.message}
            </p>
          </div>
        </div>

        <div className='mt-2'>
          <label className="block text-sm font-medium leading-6 text-gray-600">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="userEmail"
              name="userEmail"
              type="email"
              autoComplete="email"
              placeholder='you@gmail.com'
              {...register('userEmail')}
              className="block w-full rounded-md border-0 py-1.5 pl-1.5 text-gray-600 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:border-0 focus:outline-none focus:shadow-lg focus:ring-inset focus:ring-teal-500"
            />
          </div>
          <div className='mt-1'>
            <p className='text-sm text-red-600' id='userEmailErr'>
              {errors.userEmail?.message}
            </p>
          </div>
        </div>

        <div className='mt-2'>
          <label className="block text-sm font-medium leading-6 text-gray-600">
            Password
          </label>
          <div className="mt-1">
            <input
              id="userPassword"
              name="userPassword"
              type="password"
              autoComplete="email"
              placeholder='pass****'
              {...register('userPassword')}
              className="block w-full rounded-md border-0 py-1.5 pl-1.5 text-gray-600 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:border-0 focus:outline-none focus:shadow-lg focus:ring-inset focus:ring-teal-500"
            />
          </div>
          <div className='mt-1'>
            <p className='text-sm text-red-600'>
              {errors.userPassword?.message}
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
              'Signup'
            )}
          </button>
        </div>
      </form>

      {successMessage && <div className=' text-teal-600 text-center font-semibold animate-bounce'><SuccessMessage message={successMessage} /></div>}
      {error && <div className=' text-center text-red-600 font-semibold animate-bounce'><ErrorMessage message={error} /></div>}

      <div className=' mt-3 text-center text-sm text-gray-900'>
        If you already have account?{' '}
        <Link to='/' href="#" className="font-semibold leading-6 text-teal-500 hover:text-teal-600">
          Log in
        </Link>
      </div>
    </div>
  )
}

export default Usersignup