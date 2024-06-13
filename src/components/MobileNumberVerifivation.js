import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { CgSpinner } from "react-icons/cg";
import { toast, Toaster } from "react-hot-toast";

const MobileNumberVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    helperName,
    helperDOB,
    helperGender,
    helperRole,
    helperExperience,
    helperWorkTime,
    helperEmail,
    helperPassword,
    helperConfirmPassword
  } = useParams();

  const helperDetails = {
    helperName,
    helperDOB,
    helperGender,
    helperRole,
    helperExperience,
    helperWorkTime,
    helperEmail,
    helperPassword,
    helperConfirmPassword
  };

  const sendOtp = async() => {

    setMessage("");
    setLoading(true);
    if(phoneNumber === "" || phoneNumber === undefined || phoneNumber.length !== 12) {
      setLoading(false);
      setMessage('Invalid Phone Number!');
      return;
    } 
    try {
      const res=await axios.post(`${process.env.REACT_APP_API_URL}api/send-otp`,{helperEmail,phoneNumber});
      console.log(res.data);
      toast.success("OTP sended successfully!");
      setMessage('check your mail. code expire in 5 minutes!');
      setIsOtpSent(true);
      setLoading(false);
    } catch (err) {
      setMessage('Failed to send OTP!');
      console.log(err.message);
    }
  }

  const verifyOtp = async() => {

    setLoading(true);
    setMessage("");
    if(otp === '' || otp === undefined || otp.length !== 6) {
      setLoading(false);
      setMessage('invalid otp code!');
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}api/verify-otp`, { helperEmail, phoneNumber, otp });
      console.log(res.data);
      setLoading(false);
      toast.success("successfully verified your number!");
      setMessage('');
      helperDetails.helperPhoneNumber=phoneNumber;
      next(helperDetails);
    } catch (error) {
      setMessage('Invalid OTP');
    }
  }

  const next = (values) => {
    navigate(`/signup/helperImageUpload/${values.helperName}/${values.helperDOB}/${values.helperGender}/${values.helperRole}/${values.helperExperience}/${values.helperWorkTime}/${values.helperEmail}/${values.helperPassword}/${values.helperConfirmPassword}/${values.helperPhoneNumber}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
  <div className="max-w-md mx-auto py-20 px-8 rounded shadow-lg">
    <Toaster toastOptions={{ duration: 4000 }} />
    <h2 className="text-xl font-bold text-teal-500 mb-4">Phone Number Verification</h2>
    {!isOtpSent ? (
      <>
        <PhoneInput
          country={'in'}
          value={phoneNumber}
          onChange={setPhoneNumber}
          inputClass="w-full p-2 mb-4 rounded"
        />
        <button onClick={sendOtp} className="bg-teal-500 hover:bg-teal-700 flex gap-1 items-center justify-center my-8 py-1.5 px-1 text-white rounded w-full">
          {loading && (
            <CgSpinner size={20} className="animate-spin" />
          )}
          <span>send otp</span>
        </button>
      </>
    ) : (
      <>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border border-gray-300 outline-none w-full p-2 mb-4 rounded"
        />
        <button onClick={verifyOtp} className="bg-teal-500 hover:bg-teal-700 flex gap-1 items-center justify-center my-4 py-1.5 px-1 text-white rounded w-full">
          {loading && (
            <CgSpinner size={20} className="mt-1 animate-spin" />
          )}
          <span>verify otp</span>
        </button>
      </>
    )}
    {message && <p className="text-red-500 capitalize text-center font-medium animate-pulse">{message}</p>}
  </div>
</div>

  );
};

export default MobileNumberVerification;
