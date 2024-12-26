import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo_cheese from '../assets/cheese.png';
import icon_search from '../assets/search.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../CreateUser';

const Navbar = ({ token, handleLogout }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation(); // Lấy đường dẫn hiện tại
  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (token) {
      const fetchUsername = async () => {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('username')
          .eq('id', token.user.id)
          .single();

        if (error) {
          console.error('Error fetching username:', error.message);
        } else {
          setUsername(data.username);
        }
      };

      fetchUsername();
    }
  }, [token]);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex items-center justify-between bg-gray-800 text-white px-6 py-4">
  {/* Logo */}
  <div className="flex items-center">
    <img src={logo_cheese} alt="Cheese Logo" className="h-10 w-10" />
    <p className="ml-3 text-lg font-semibold">CHEESE</p>
  </div>

  {/* Navigation Links */}
  <ul className="flex items-center space-x-6">
    <li>
      <Link
        to="/home"
        className={`hover:text-yellow-400 ${isActive('/home') ? 'text-yellow-400 font-bold' : ''}`}
      >
        Home
      </Link>
    </li>
    <li>
      <Link
        to="/map"
        className={`hover:text-yellow-400 ${isActive('/map') ? 'text-yellow-400 font-bold' : ''}`}
      >
        Map
      </Link>
    </li>
    <li>
      <Link
        to="/about"
        className={`hover:text-yellow-400 ${isActive('/about') ? 'text-yellow-400 font-bold' : ''}`}
      >
        About
      </Link>
    </li>
    <li>
      <Link
        to="/contactus"
        className={`hover:text-yellow-400 ${isActive('/contactus') ? 'text-yellow-400 font-bold' : ''}`}
      >
        Contact
      </Link>
    </li>
  </ul>

  {/* User Actions */}
  <ul className="flex items-center space-x-4">
  {token ? (
    <li className="relative">
      {token && username ? (
        <span
          onClick={toggleDropdown}
          className="cursor-pointer bg-gray-700 px-3 py-2 rounded-md hover:bg-gray-600"
        >
          Welcome, {username}
        </span>
      ) : (
        <span>Welcome, Guest</span>
      )}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-gray-700 text-white rounded-md shadow-lg">
          <button className="block px-4 py-2 w-full text-left hover:bg-gray-600">
            <Link to="/edit">Personal Info</Link>
          </button>
          <button
            onClick={handleLogout}
            className="block px-4 py-2 w-full text-left hover:bg-gray-600"
          >
            Logout
          </button>
        </div>
      )}
    </li>
  ) : (
    <>
      <li>
        <Link
          to="/login"
          className="text-white hover:text-yellow-400 font-medium"
        >
          Log in
        </Link>
      </li>
      <li>
        <Link
          to="/signup"
          className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-yellow-400"
        >
          Sign up
        </Link>
      </li>
    </>
  )}
</ul>
</div>
  );
};

export default Navbar;
