import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Signup from './parts/firstpart/pages/Signup'
import Login from './parts/firstpart/pages/Login'
import Usersignup from './components/Usersignup'
import Helpersignup from './components/Helpersignup'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AddedList from './parts/userpart/pages/AddedList'
import Usernavbar from './components/Usernavbar'
import HelperNavbar from './components/HelperNavbar'
import UserProfile from './parts/userpart/pages/UserProfile'
import SideBar from './parts/userpart/pages/SideBar'
import Helperslist from './parts/userpart/pages/Helperslist'
import Helperdetails from './parts/userpart/pages/Helperdetails'
import MarkedLists from './parts/userpart/pages/AddedList'
import DashBoard from './parts/helperpart/pages/HelperHome'
import HelperProfile from './parts/helperpart/pages/HelperProfile'
import MobileNumberVerifivation from './components/MobileNumberVerifivation'
import HelperImageUpload from './components/HelperImageUpload'

const App = () => {

  const [userLogin,setUserLogin]=useState(localStorage.getItem('activeUser'));
  const [helperLogin,setHelperLogin]=useState(localStorage.getItem('activeHelper'));

  return (
    <main>
      {(userLogin===null && helperLogin===null) && <Router>
       <Navbar />
        <Routes>
          <Route path='/'  element={<Login userLogin={userLogin} setUserLogin={setUserLogin} helperLogin={helperLogin} setHelperLogin={setHelperLogin} />}/>
          <Route path='/signup'  element={<Signup />}>
            <Route path='/signup/userSignup' element={<Usersignup />} />
            <Route path='/signup/helperSignup' element={<Helpersignup />} />
          </Route>
          <Route path='/signup/mobileNumberVerify/:helperName/:helperDOB/:helperGender/:helperRole/:helperExperience/:helperWorkTime/:helperEmail/:helperPassword/:helperConfirmPassword' element={<MobileNumberVerifivation setHelperLogin={setHelperLogin} />} />
          <Route path='/signup/helperImageUpload/:helperName/:helperDOB/:helperGender/:helperRole/:helperExperience/:helperWorkTime/:helperEmail/:helperPassword/:helperConfirmPassword/:helperPhoneNumber' element={<HelperImageUpload />} />
        </Routes>
      </Router>}
      
      {/* user app.js */}
      {userLogin!==null && <>
      <Router>
      <Usernavbar setUserLogin={setUserLogin} />
      <SideBar />
        <Routes>
          <Route path='/' element={<Helperslist />} />
          <Route path='/addedList' element={<AddedList />} />
          <Route path='/markedLists' element={<MarkedLists />} />
          <Route path='/userProfile' element={<UserProfile userLogin={userLogin} setUserLogin={setUserLogin} />} />
          <Route path='/HelperDetails/:helperID' element={<Helperdetails />} />
        </Routes>
      </Router>
      </>}

      {/* helper app.js   */}
      {helperLogin!==null && 
      <Router>
      <HelperNavbar />
        <Routes>
          <Route path='/' element={<DashBoard />} />
          <Route path='/helperProfile' element={<HelperProfile helperLogin={helperLogin} setHelperLogin={setHelperLogin} />} />
        </Routes>
      </Router>}
    </main>
  )
}

export default App