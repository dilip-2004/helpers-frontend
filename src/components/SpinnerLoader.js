import React from 'react'
import { ClipLoader } from 'react-spinners';

const loading = () => {
  return (
    <div className=' flex items-center justify-center text-center'>
      <ClipLoader color={'#ffffff'} loading={loading} size={25} />
    </div>
  )
}

export default loading