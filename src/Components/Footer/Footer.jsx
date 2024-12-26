import React from 'react';
import logo_cheese from '../assets/cheese.png';
import { FaGithub, FaDiscord, FaLinkedin, FaInstagram, FaXTwitter, FaTiktok } from 'react-icons/fa6';

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-2">
        {/* Phần chứa các thẻ <p> */}
        <div className="flex flex-wrap justify-start items-start space-x-14">
          {/* Logo và mô tả */}
          <div className="flex flex-col items-center sm:items-start w-1/5">
            <img src={logo_cheese} alt="Logo" className="h-12" />
            <h2 className="text-xl font-semibold mb-2">CHEESE</h2>
            <p className="text-sm text-gray-400">Explore Modern 3D Technology</p>
          </div>

          {/* Các thẻ <p> nằm ngang, căn chỉnh và cách đều */}
          <div className="flex flex-wrap justify-start w-full sm:w-4/6">
          <p className="font-semibold text-lg mb-4 text-left w-1/6">
              <ul className="space-y-2 mt-0">
                <li><a href="#" className="text-gray-300 hover:text-yellow-500">Home</a></li>
                <li><a href="#" className="text-gray-300 hover:text-yellow-500">About us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-yellow-500">Contact us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-yellow-500">Privacy policy</a></li>
              </ul>
            </p>
            <p className="font-semibold text-lg mb-4 text-left w-1/6">
              Company
              <ul className="space-y-2 mt-2">
                <li><a href="#" className="text-gray-300 hover:text-yellow-500">Who we are</a></li>
                <li><a href="#" className="text-gray-300 hover:text-yellow-500">What we do</a></li>
                <li><a href="#" className="text-gray-300 hover:text-yellow-500">What we value</a></li>
              </ul>
            </p>
            
            

            <p className="font-semibold text-lg mb-4 text-left w-1/5 ml-5">
              Products
              <ul className="space-y-2 mt-2">
                <li><a href="#" className="text-gray-300 hover:text-yellow-500">Map Overview</a></li>
                <li><a href="#" className="text-gray-300 hover:text-yellow-500">Map Transportation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-yellow-500">Map Satellites</a></li>
              </ul>
            </p>

            <p className="font-semibold text-lg mb-4 text-left w-1/5 ml-8">
              Solutions
              <ul className="space-y-2 mt-2">
                <li><a href="#" className="text-gray-300 hover:text-yellow-500">Map Overview</a></li>
                <li><a href="#" className="text-gray-300 hover:text-yellow-500">Map Transportation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-yellow-500">Map Satellites</a></li>
              </ul>
            </p>

            <p className="font-semibold text-lg mb-4 text-left w-1/6 ml-8">
              Get in touch
              <ul className="space-y-2 mt-2">
                <li className="text-gray-300">+84 962920750</li>
                <li className="text-gray-300">21522747@gm.uit.edu.vn</li>
              </ul>
            </p>
          </div>
        </div>

        {/* Các liên kết và thông tin footer */}
        <div className="bg-gray-700 py-4">
          <div className="container mx-auto flex justify-between items-center px-6">
            {/* Thông tin bản quyền và các liên kết */}
            <div className="text-sm text-white">
              <div className="flex gap-4">
                <a href="#" className="hover:underline">Copyright 2022 Trịnh Tuấn Tú. All rights reserved.</a>
                <a href="#" className="hover:underline">Terms</a>
                <span>|</span>
                <a href="#" className="hover:underline">Privacy</a>
                <span>|</span>
                <a href="#" className="hover:underline">Security</a>
                <span>|</span>
                <a href="#" className="hover:underline">Your California Privacy Choices</a>
              </div>
            </div>

            {/* Các icon mạng xã hội */}
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-yellow-500"><FaGithub size={20} /></a>
              <a href="#" className="text-white hover:text-yellow-500"><FaDiscord size={20} /></a>
              <a href="#" className="text-white hover:text-yellow-500"><FaXTwitter size={20} /></a>
              <a href="#" className="text-white hover:text-yellow-500"><FaLinkedin size={20} /></a>
              <a href="#" className="text-white hover:text-yellow-500"><FaTiktok size={20} /></a>
              <a href="#" className="text-white hover:text-yellow-500"><FaInstagram size={20} /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

