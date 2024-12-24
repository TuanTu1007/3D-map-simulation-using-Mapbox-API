import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../Components/CreateUser';
import image_login from '../Components/assets/image_login.png';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
  
    try {
      // Đăng ký người dùng trong auth.users
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
  
      if (error) throw error;
  
      // Lấy ID của người dùng vừa tạo
      const userId = data.user.id;
  
      // Thêm username vào bảng user_profiles
      const { error: profileError } = await supabase.from('user_profiles').insert([
        {
          id: userId, // ID từ auth.users
          username: formData.username,
        },
      ]);
  
      if (profileError) throw profileError;
  
      alert('Sign up successful! Check your email for verification.');
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${image_login})` }}>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 font-serif">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700">Email</label>
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
            <label htmlFor="password" className="block text-gray-700">Password</label>
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

          <button
            type="submit"
            className="w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-yellow-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
