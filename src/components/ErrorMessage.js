import React from 'react'

const ErrorMessage = (prop) => {
  return (
    <div className='text-red-500'>{prop.message}</div>
  )
}

export default ErrorMessage;
