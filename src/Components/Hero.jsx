import React, { useState } from 'react';
import lastedUpdate from './assets/lastedUpdate1.jpg';
import hoveredImage from './assets/lastedUpdate.jpg'; // Hình ảnh khi di chuột vào

const Hero = () => {
  // State lưu trữ hình ảnh hiện tại
  const [imageSrc, setImageSrc] = useState(lastedUpdate);

  // Hàm thay đổi hình ảnh khi di chuột vào
  const handleMouseEnter = () => {
    setImageSrc(hoveredImage);
  };

  // Hàm khôi phục hình ảnh ban đầu khi di chuột ra ngoài
  const handleMouseLeave = () => {
    setImageSrc(lastedUpdate);
  };

  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      {/* Hero Left Side */}
      <div
        className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 bg-gray-100"
        style={{
          transform: imageSrc === hoveredImage ? 'translateX(100%)' : 'translateX(0)', // Di chuyển phần văn bản sang phải khi hover
          transition: 'transform 0.3s ease', // Hiệu ứng mượt mà
        }}
      >
        <div className="text-black">
          <div className="flex items-center gap-2 ">
            <div className="w-8 md:w-11 h-[2px] bg-[#414141]"></div>
            <p className="font-medium text-sm md:text-base">OUR MAPS</p>
          </div>
          <h1 className="text-3xl sm:py-3 lg:text-5xl leading-relaxed ">
            Latest Update
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">GO NOW</p>
            <div className="w-8 md:w-11 h-[1px] bg-[#414141]"></div>
          </div>
        </div>
      </div>
      {/* End Hero Left Side */}

      {/* HERO RIGHT SIDE */}
      <div
        className="w-full sm:w-1/2 relative"
        onMouseEnter={handleMouseEnter} // Di chuột vào hình
        onMouseLeave={handleMouseLeave} // Di chuột ra khỏi hình
      >
        <img
          className="w-full h-full object-cover transition-transform duration-300"
          src={imageSrc} // Sử dụng state imageSrc để thay đổi hình ảnh
          alt="Hero Image"
          style={{
            transform: imageSrc === hoveredImage ? 'translateX(-100%)' : 'translateX(0)', // Di chuyển ảnh sang trái khi hover
          }}
        />
      </div>
      {/* END HERO RIGHT SIDE */}
    </div>
  );
};

export default Hero;
