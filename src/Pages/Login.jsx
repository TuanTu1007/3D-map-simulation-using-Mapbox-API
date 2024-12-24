import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../Components/CreateUser';
import image_login from '../Components/assets/image_login.png';

const Login = ({ setToken }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Quản lý trạng thái quên mật khẩu
  const [resetEmail, setResetEmail] = useState('');

  function handleChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (isForgotPassword) {
      // Xử lý quên mật khẩu
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
          redirectTo: 'http://localhost:3000/reset-password', // Thay đổi URL theo dự án của bạn
        });
        if (error) throw error;
        alert('Password reset email sent! Check your inbox.');
        setIsForgotPassword(false); // Quay lại trang đăng nhập
      } catch (error) {
        alert(error.message);
      }
    } else {
      // Xử lý đăng nhập
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;

        const user = data.user;
        if (user.user_metadata.role === 'admin') {
          // Điều hướng đến trang Admin
          window.location.href = '/admin';
          console.log(data);
          setToken(data);
        } else {
          console.log('Welcome User!');
          // Điều hướng đến trang Home
          window.location.href = '/home';
          console.log(data);
          setToken(data);
        }
      } catch (error) {
        alert(error.message);
      }
    }
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${image_login})` }}
    >
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 font-serif">
          {isForgotPassword ? 'Reset Password' : 'Login'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isForgotPassword ? (
            <div>
              <label htmlFor="reset-email" className="block text-gray-700">
                Enter your email to reset password
              </label>
              <input
                id="reset-email"
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          ) : (
            <>
              <div>
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition"
          >
            {isForgotPassword ? 'Send Reset Email' : 'Login'}
          </button>
        </form>

        {!isForgotPassword && (
          <p
            className="mt-4 text-sm text-center text-yellow-500 hover:underline cursor-pointer"
            onClick={() => setIsForgotPassword(true)}
          >
            Forgot Password?
          </p>
        )}

        {isForgotPassword && (
          <p
            className="mt-4 text-sm text-center text-gray-600 cursor-pointer"
            onClick={() => setIsForgotPassword(false)}
          >
            Back to Login
          </p>
        )}

        {!isForgotPassword && (
          <p className="mt-4 text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-yellow-500 hover:underline">
              Sign Up
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
