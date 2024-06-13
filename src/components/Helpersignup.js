import React, { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import SpinnerLoader from '../components/SpinnerLoader';
import SuccessMessage from '../components/SuccessMessage';
import ErrorMessage from '../components/ErrorMessage';

const schema = yup.object().shape({
  helperName: yup.string().required('Helper name is required'),
  helperDOB: yup.date().required('Date of birth must be selected'),
  helperGender: yup.string().required('Gender must be selected'),
  helperRole: yup.string().required(),
  helperExperience: yup.string().required(),
  helperWorkTime: yup.string().required('Work time must be selected'),
  helperEmail: yup.string().email('Invalid email format').required('Helper email is required'),
  helperPassword: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  helperConfirmPassword: yup.string().oneOf([yup.ref('helperPassword'), null], 'Passwords must match').required('Confirm password is required'),
});

const HelperSignup = () => {
  const [role, setRole] = useState('Calisthenics');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const roleHandler = (event) => {
    setRole(event.target.value)
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}api/helper/signup/check`, values);
      setError('');
      navigate(`/signup/mobileNumberVerify/${values.helperName}/${values.helperDOB}/${values.helperGender}/${values.helperRole}/${values.helperExperience}/${values.helperWorkTime}/${values.helperEmail}/${values.helperPassword}/${values.helperConfirmPassword}`);
    } catch (error) {
      setError('Email already exists!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mt-3 shadow-lg rounded-lg p-2 sm:w-full sm:max-w-sm sm:mx-auto md:w-full md:max-w-md md:mx-auto'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=''>
          <h1 className='text-center font-bold text-teal-500 text-xl'>
            HELPER SIGNUP
          </h1>
        </div>

        {/* Helper Name */}
        <div>
          <label className='block text-sm font-medium leading-6 text-gray-600'>
            Helper Name
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
          <label className='block text-sm font-medium leading-6 text-gray-600'>
            DOB
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

        {/* Gender */}
        <div>
          <label className='block text-sm font-medium leading-6 text-gray-600'>
            Gender
          </label>
          <div className='mt-1 flex text-gray-600'>
            <input
              type="radio"
              name="helperGender"
              value="Male"
              {...register('helperGender')}
            />
            <label className='mr-2'>Male</label>
            <input
              type="radio"
              name="helperGender"
              value="Female"
              {...register('helperGender')}
            />
            <label>Female</label>
          </div>
          <div className='mt-1'>
            <p className='text-sm text-red-600'>
              {errors.helperGender?.message}
            </p>
          </div>
        </div>

        {/* Role */}
        <div>
          <label className='block text-sm font-medium leading-6 text-gray-600'>
            Role
          </label>
          <div className='mt-1'>
            <select
              name='helperRole'
              {...register('helperRole')}
              value={role}
              onChange={roleHandler}
              className='block w-full rounded-md border-0 py-1.5 pl-1 text-gray-600 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-500 focus:shadow-lg focus:outline-none'
            >
              <option value='Calisthenics'>Calisthenics</option>
              <option value='Gym'>Gym</option>
              <option value='Kabaddi'>Kabaddi</option>
              <option value='Cricket'>Cricket</option>
              <option value='Volleyball'>Volleyball</option>
              <option value='Basketball'>Basketball</option>
              <option value='Badminton'>Badminton</option>
              <option value='Physiotherapist'>Physiotherapist</option>
              <option value='Orthopedic'>Orthopedic</option>
              <option value='Nephrologist'>Nephrologist</option>
              <option value='Neurologist'>Neurologist</option>
              <option value='Phlebologist'>Phlebologist</option>
              <option value='Cardiologist'>Cardiologist</option>
            </select>
          </div>
        </div>

        <div className='mt-2 text-md text-gray-600'>
          Your current role is{' '}
          <span className='font-semibold leading-6 text-teal-500 hover:text-teal-600'>
            {role}.
          </span>
          <span className='text-sm'> You can change the role</span>
        </div>

        {/* Experience */}
        <div>
          <label className='block text-sm font-medium leading-6 text-gray-600'>
            Experience
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
              <option value='above 3 year'>Above 3 year</option>
            </select>
          </div>
        </div>

        {/* Work Time */}
        <div className='mt-1'>
          <label className='block text-sm font-medium leading-6 text-gray-600'>
            Work time
          </label>
          <div className='mt-1 flex text-gray-600'>
            <input
              type="radio"
              name="helperWorkTime"
              value="Part Time"
              {...register('helperWorkTime')}
            />
            <label className='mr-3'>Part Time</label>
            <input
              type="radio"
              name="helperWorkTime"
              value="Full Time"
              {...register('helperWorkTime')}
            />
            <label>Full Time</label>
          </div>
          <div className='mt-1'>
            <p className='text-sm text-red-600'>
              {errors.helperWorkTime?.message}
            </p>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className='block text-sm font-medium leading-6 text-gray-600'>
            Email address
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
          <label className='block text-sm font-medium leading-6 text-gray-600'>
            Password
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
          <label className='block text-sm font-medium leading-6 text-gray-600'>
            Confirm password
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

        <div className='my-3'>
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

      {/* Error Message */}
      {error && <div className='text-center text-red-600 font-semibold animate-bounce'><ErrorMessage message={error} /></div>}

      {/* Success Message */}
      {successMessage && <div className='text-teal-600 text-center font-semibold animate-bounce'><SuccessMessage message={successMessage} /></div>}

      <div className='text-center text-sm text-gray-900'>
        If you already have an account?{' '}
        <Link to='/' className="font-semibold leading-6 text-teal-500 hover:text-teal-600">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default HelperSignup;
