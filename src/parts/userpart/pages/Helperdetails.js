import React, { useEffect, useState, useRef } from 'react';
import { FiPhone, FiShoppingCart } from 'react-icons/fi';
import { MdFavorite } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

const Helperdetails = (props) => {
  const [helper, setHelper] = useState([]);
  const [ratedValue, setRatedValue] = useState(null);
  const { helperID } = useParams();
  const [checkATC, setCheckATC] = useState(JSON.parse(localStorage.getItem('userData')).addToCart.find(id => id === helperID));
  const [checkLike, setCheckLikes] = useState(JSON.parse(localStorage.getItem('userData')).likes.find(id => id === helperID));
  const userID = JSON.parse(localStorage.getItem('userData')).id;
  const ratedUserIDRef = useRef(null);

  useEffect(() => {
    const getDataByID = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/helper/getDataByID/${helperID}`);
        setHelper(res.data);
        ratedUserIDRef.current = res.data.ratedUserID; 

        const hasUserID = ratedUserIDRef.current.find(data => data.userID === userID);
        if (!hasUserID) {
          setRatedValue(null);
        } else {
          setRatedValue(hasUserID.ratedValue);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getDataByID();
  }, [helperID, userID]);

  const formattedDOB = new Date(helper.helperDOB).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleCall = () => {
    window.location.href = `tel:${helper.helperPhoneNumber}`;
  };

  const handleAddToCart = async () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userID = userData.id;

    if (!checkATC) {
      try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}api/user/addToCart/${userID}`, { helperID });
        localStorage.setItem('userData', JSON.stringify(res.data));
        setCheckATC(JSON.parse(localStorage.getItem('userData')).addToCart.find(id => id === helperID));
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}api/user/removeFromCart/${userID}`, { helperID });
        localStorage.setItem('userData', JSON.stringify(res.data));
        setCheckATC(JSON.parse(localStorage.getItem('userData')).addToCart.find(id => id === helperID));
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleLike = async () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userID = userData.id;

    if (!checkLike) {
      try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}api/user/addLikes/${userID}`, { helperID });
        localStorage.setItem('userData', JSON.stringify(res.data));
        setCheckLikes(JSON.parse(localStorage.getItem('userData')).likes.find(id => id === helperID));
      } catch (error) {
        console.log(error.message);
      }

      // Add liked user id in the helperdb
      try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}api/helper/addLikedID/${helperID}`, { userID });
        console.log(res);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}api/user/removeLikes/${userID}`, { helperID });
        localStorage.setItem('userData', JSON.stringify(res.data));
        setCheckLikes(JSON.parse(localStorage.getItem('userData')).likes.find(id => id === helperID));
      } catch (error) {
        console.log(error.message);
      }

      // Remove liked user id from the helperdb
      try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}api/helper/removeLikedID/${helperID}`, { userID });
        console.log(res);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleHelperRating = async (newValue) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userID = userData.id;
    setRatedValue(newValue);
    const value = !newValue ? 0 : newValue;
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}api/helper/helperRating/${helperID}/${userID}`, { value });
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-gray-100 text-black p-6 rounded-lg shadow-xl m-2 xl:m-auto xl:mt-2 sm:mt-2 md:mt-2 lg:mt-2 sm:max-w-sm sm:m-auto md:max-w-md md:m-auto lg:max-w-lg lg:m-auto">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <div className="flex items-center mb-4 md:mb-0">
          <img src={`${helper.helperImageURL}`} alt="Profile" className="w-16 h-16 rounded-full" />
          <div className="ml-4">
            <h1 className="text-xl font-bold">{helper.helperName}</h1>
            <p className="text-base">{helper.helperRole}</p>
          </div>
        </div>
        <div className="bg-gray-200 rounded-lg px-2 pt-1.5 text-white font-semibold">
          <Box
            sx={{
              '& > legend': { mt: 2 },
            }}
          >
            <Rating
              value={ratedValue}
              onChange={(event, newValue) => {
                handleHelperRating(newValue);
              }}
            />
          </Box>
        </div>
      </div>
      <div className="space-y-3 text-gray-800">
        <p className="text-lg">
          <span className="font-semibold">Gender:</span> {helper.helperGender}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Date of Birth:</span> {formattedDOB}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Experience:</span> {helper.helperExperience}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Work Time:</span> {helper.helperWorkTime}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Email:</span> {helper.helperEmail}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Phone Number:</span> {helper.helperPhoneNumber}
        </p>
      </div>
      <div className="flex justify-between mt-4">
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-300" onClick={handleCall}>
          <FiPhone className="mx-2" />
        </button>
        <button className={`bg-teal-600 hover:bg-teal-700 ${checkATC ? 'text-yellow-400' : 'text-white'} px-4 py-2 rounded-md transition-colors duration-300`} onClick={handleAddToCart}>
          <FiShoppingCart className="mx-2" />
        </button>
        <button className={`bg-teal-600 hover:bg-teal-700 ${checkLike ? 'text-pink-400' : 'text-white'} px-4 py-2 rounded-md transition-colors duration-300`} onClick={handleLike}>
          <MdFavorite className="mx-2" />
        </button>
      </div>
    </div>
  );
};

export default Helperdetails;
