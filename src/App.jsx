import { Route, Routes, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Map from './Pages/Map';
import ContactUs from './Pages/ContactUs'; 
import About from './Pages/About';
import Footer from './Components/Footer/Footer';
import Admin_dashboard from "./Pages/Admin_dashboard";
import SignUp from "./Pages/SignUp";
import { useNavigate } from 'react-router-dom'
import Edit from "./Pages/Edit";
import ResetPassword from "./Pages/ResetPassword";


function App() {
  const location = useLocation(); // Lấy thông tin về đường dẫn hiện tại
  const isAdminDashboard = location.pathname === "/admin"; // Kiểm tra nếu đang ở trang Admin_dashboard
  const [token, setToken] = useState(false)
  let navigate = useNavigate()

  if(token){
    sessionStorage.setItem('token',JSON.stringify(token))
  }

  useEffect(() => {
    if(sessionStorage.getItem('token')){
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
  }, [])

  // Logout function
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setToken(false);
    navigate('/login')
  };

  return (
    <div>
      {!isAdminDashboard && <Navbar token={token} handleLogout={handleLogout}/>} {/* Ẩn Navbar trên trang Admin_dashboard */}
      <Routes>
        {<Route path={'/home'} element={ <Home token={token} setToken={setToken} />} />}
        {<Route path={'/map'} element={ <Map token={token} />} />}
        {<Route path={'/about'} element={ <About token={token} />} />}
        <Route path="/login" element={ <Login setToken={setToken}/>} />
        {<Route path={'/signup'} element={ <SignUp token={token} />} />}
        {<Route path={'/contactus'} element={ <ContactUs token={token} />} />}
        {<Route path={'/edit'} element={ <Edit token={token} />} />}
        {<Route path={'/reset-password'} element={ <ResetPassword token={token} />} />}
        {<Route path={'/admin'} element={ <Admin_dashboard token={token} handleLogout={handleLogout} />} />}
      </Routes>
      {!isAdminDashboard && <Footer />} {/* Ẩn Footer trên trang Admin_dashboard */}
    </div>
  );
}

export default App;
