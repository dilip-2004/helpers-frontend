import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FaRegTrashCan } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const AddedList = () => {

  const [userData,setUserData]=useState(JSON.parse(localStorage.getItem('userData')));
  const [helperDetails, setHelpersDetails] = useState([]);
  const [showMessage,setShowMessage]=useState(false);
  const userID=userData.id;

  const fetchHelperDetails = async () => {
    try {
      let params = {};
      if (userData.addToCart.length > 1) {
        params = { helperIDs: JSON.parse(localStorage.getItem('userData')).addToCart.join(',') };
      } else {
        params = { helperIDs: JSON.parse(localStorage.getItem('userData')).addToCart[0] };
      }

      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/helper/getCartData/${userID}`, {
        params: params
      });
      setHelpersDetails(res.data);
    } catch (error) {
      console.error('Error fetching cart items:', error.message);
    }
  };
  
  useEffect(() => {
    fetchHelperDetails();
  }, []);
  
  const deleteFromList = async (helperID) => {
    console.log(helperID);
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}api/user/deleteFromCart/${userID}`, { helperID });
      localStorage.setItem('userData', JSON.stringify(res.data));
      setUserData(JSON.parse(localStorage.getItem('userData')));
      showMessage(true);
      setTimeout(()=>{
        setShowMessage(false);
      },2000);
    } catch (error) {
      console.log(error.message);
    }finally{
      fetchHelperDetails();
      window.location.reload();
    }
  }

  return (
    <div className=" sm:max-w-sm sm:m-auto md:max-w-lg md:m-auto lg:max-w-xl lg:m-auto xl:max-w-2xl xl:m-auto">
  {helperDetails.length === 0 ? (
    <p className="text-lg text-gray-600 text-center">Your list is empty.</p>
  ) : (
    <div className=" m-2">
      {helperDetails.map((item) => (
        <div key={item._id} className="py-4 bg-slate-200 mt-2 rounded-lg px-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold uppercase">{item.helperName}</p>
              <p className="text-md text-gray-500">{item.helperRole}</p>
            </div>
            <div className=' flex items-center gap-2'>
              <Link to={`/HelperDetails/${item._id}`}>
                <button className=" text-white focus:outline-none bg-teal-500 px-4 rounded-2xl py-1 cursor-pointer" >
                <FaArrowRight className='text-md' />
              </button>
              </Link>
              <button className="text-gray-500 focus:outline-none bg-black px-4 rounded-2xl py-1 cursor-pointer" key={item._id}  onClick={(e) => { e.preventDefault(); deleteFromList(item._id) }}>
                <FaRegTrashCan className='text-md' />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
  <div className='text-center bg-yellow-400 text-white text-lg rounded-lg mx-2 uppercase'>
    {showMessage ? 'removed' : ''}
  </div>
</div>
  )
}

export default AddedList