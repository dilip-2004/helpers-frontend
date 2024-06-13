import React, { useState } from 'react'
import { Link, Navigate, json, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios';
import SpinnerLoader from '../../../components/SpinnerLoader'
import ErrorMessage from '../../../components/ErrorMessage'
import SuccessMessage from '../../../components/SuccessMessage'

const schema=yup.object().shape({
  option:yup.string().required('Path is required'),
  email:yup.string().email('Invalid email format').required('Email is required'),
  password:yup.string().min(8,'Password must be atleast 8 character').required('password is required fireld')
});

const Login = (props) => {

  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
  const [successMessage,setSuccessMessage]=useState('');
  const navigate=useNavigate();

  const {register,handleSubmit,formState:{errors},reset}=useForm({
    resolver:yupResolver(schema)
  });

  const onSubmit= async (values)=>{
    setLoading(true);
    if(values.option==='user')
    {
      try{
        setError('');
        setSuccessMessage('');
        const res=await axios.post(`${process.env.REACT_APP_API_URL}api/user/login`,values);
        const userData=res.data;
        userData.id=userData._id;
        setSuccessMessage('Logging in.....');
        setTimeout(()=>{
          localStorage.setItem('activeUser','active');
          localStorage.setItem('userData',JSON.stringify(userData));
          props.setUserLogin(localStorage.getItem('activeUser'));
          navigate('/');
        },1000);
      }catch(err){
        setError('DOES NOT MATCH YOUR DATA!');
      }finally{
        setLoading(false);
      }
    }
    else
    {
      try{
        setError('');
        setSuccessMessage('');
        const res=await axios.post(`${process.env.REACT_APP_API_URL}api/helper/login`,values);
        const helperData=res.data;
        setSuccessMessage('Logging in.....');
        setTimeout(()=>{
          localStorage.setItem('activeHelper','active');
          localStorage.setItem('helperData',JSON.stringify(helperData));
          props.setHelperLogin(localStorage.getItem('activeHelper'));
          navigate('/');
        },1000);
      }catch(error){
        setError("Helper not found!");
      }finally{
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className='text-center text-teal-500 text-7xl italic font-extrabold'>H</h1>
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-600">
            <span className='text-teal-500'>Log in</span> to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm shadow-lg rounded-lg p-2">
          {error!=='' && <div className=' text-center animate-pulse text-lg font-medium'>
            <ErrorMessage message={error} />
          </div>}
          {successMessage!=='' && <div className=' text-teal-600 text-center animate-pulse text-lg font-medium '>
            <SuccessMessage message={successMessage} />
          </div>}
          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <div className=''>
              <label className='block text-sm font-medium leading-6 text-gray-600'>
                Select your path
              </label>

              <div className='flex gap-10 sm:gap-52 justify-start items-center mt-1 ml-1.5'>
                <div className='flex'>
                  <input
                  type="radio"
                  value="user"
                  {...register('option')}
                />
                <p className='text-gray-600 ml-0.5'>USER</p>
                </div>

                <div className='flex'>
                  <input
                  type="radio"
                  value="helper"
                  {...register('option')}
                />
                <p className='text-gray-600 ml-0.5 '>HELPER</p>
                </div>
                
              </div>

              <div className='mt-1'>
                <p className='text-sm text-red-600'>
                  {errors.option?.message}
                </p>
              </div>
            </div>

            <div className=''>
              <label className="block text-sm font-medium leading-6 text-gray-600">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder='you@gmail.com'
                  {...register('email')}
                  className="block w-full rounded-md border-0 py-1.5 pl-1.5 text-gray-600 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:border-0 focus:outline-none focus:shadow-lg focus:ring-inset focus:ring-teal-500 sm:text-sm sm:leading-6"
                />
              </div>

              <div className='mt-1'>
                <p className='text-sm text-red-600'>
                  {errors.email?.message}
                </p>
              </div>
            </div>

            <div className=''>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-600">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-teal-500 hover:text-teal-600">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder='pass****'
                  {...register('password')}
                  className="block w-full rounded-md border-0 py-1.5 pl-1.5 text-gray-600 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:border-0 focus:outline-none focus:shadow-lg focus:ring-inset focus:ring-teal-500 sm:text-sm sm:leading-6"
                />
              </div>

              <div className='mt-1'>
                <p className='text-sm text-red-600'>
                  {errors.password?.message}
                </p>
              </div>
            </div>

            <div className=''>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-teal-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-600"
              >
                {loading ? <SpinnerLoader /> : 'Sign in'}
              </button>
            </div>
          </form>

          <p className="mt-2 text-center text-sm text-gray-900">
            If you don't have account already?{' '}
            <Link to='/signup' href="#" className="font-semibold leading-6 text-teal-500 hover:text-teal-600">
              Sign up
            </Link>
          </p>
        </div>
      </div>
  )
}

export default Login