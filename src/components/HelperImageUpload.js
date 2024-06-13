import React, { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase';
import { CgSpinner } from "react-icons/cg";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const HelperImageUpload = () => {
  const { helperName, helperDOB, helperGender, helperRole, helperExperience, helperWorkTime, helperEmail, helperPassword, helperConfirmPassword, helperPhoneNumber } = useParams();
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const filePickerRef = useRef();
  const navigate = useNavigate();
  
  const handleImageChange = (e) => {
    setError('');
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = () => {
    setImageUrl('');
    setError('');
    setLoading(true);
    if (!image) {
      setError('Please select an image to upload.');
      setLoading(false);
      return;
    }

    const imageRef = ref(storage, `helperImages/${uuidv4()}-${image.name}`);
    const uploadTask = uploadBytesResumable(imageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setUploadProgress(progress);
      },
      (error) => {
        setError('Failed to upload image. Please try again.');
        console.error(error);
        setLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          setImage(null);
          setPreviewUrl('');
          submit(downloadURL);
          toast.success('Successfully uploaded!');
        });
      }
    );
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const submit = async (downloadURL) => {
    const formData = {
      helperName,
      helperDOB,
      helperGender,
      helperRole,
      helperExperience,
      helperWorkTime,
      helperEmail,
      helperPassword,
      helperConfirmPassword,
      helperPhoneNumber,
      helperImageURL: downloadURL
    };

    setLoading(true);
    setError('');
    setSuccessMessage('');
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}api/helper/signup`, formData);
      console.log(res.data);
      toast.success('Successfully created!');
      setImage(null);
      setPreviewUrl('');
      setUploadProgress(0);
      setImageUrl('');
      setError('');
      setLoading(false);
      setTimeout(()=>{
        navigate('/');
      },1000);
    } catch (err) {
      setLoading(false);
      console.log(err);
      setError('Error creating account');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className=" p-4 w-full mx-2 rounded-lg sm:max-w-md bg-white">
    <Toaster toastOptions={{ duration: 4000 }} />
    <div className="mb-4">
      <label className="block text-gray-700 text-xl font-bold py-4">
        Upload Profile Image
      </label>
      <input 
        type="file" 
        id="fileInput"
        ref={filePickerRef}
        className="w-full text-gray-700 p-2 border border-gray-300 rounded-md hidden"
        onChange={handleImageChange} 
      />
    </div>
    <div>
      <button 
        onClick={pickImageHandler}
        className="w-full bg-teal-500 hover:bg-teal-600 my-4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        <span>pick image</span>
      </button>
    </div>
    {previewUrl && (
      <div className="mb-4">
        <p className="text-gray-700 text-sm font-bold mb-2">Image Preview:</p>
        <img 
          src={previewUrl} 
          alt="Preview" 
          className="w-full h-auto rounded-md shadow-md"
        />
      </div>
    )}
    <button 
      onClick={uploadImage} 
      className="w-full mb-4 flex gap-1 justify-center items-center bg-teal-500 hover:bg-teal-600 mt-5 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      {loading && (
        <CgSpinner size={20} className="mt-1 animate-spin" />
      )}
      <span>upload</span>
    </button>
    {uploadProgress > 0 && (
      <div className="my-4 w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-black h-2.5 rounded-full"
          style={{ width: `${uploadProgress}%` }}
        ></div>
      </div>
    )}
    {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
    {imageUrl && (
      <div className="mt-4">
        <p className=" text-green-500 text-center">Image uploaded successfully!</p>
      </div>
    )}
    {successMessage && (
      <div className="mt-4">
        <p className="text-green-500 text-center">{successMessage}</p>
      </div>
    )}
  </div>
</div>
  );
};

export default HelperImageUpload;