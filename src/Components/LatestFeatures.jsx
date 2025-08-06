import { useState } from "react";
import Title from "./Title";
import lastedUpdate from './assets/dia_hinh.jpg';
import lastedUpdate1 from './assets/ve_tinh.jpg';
import lastedUpdate2 from './assets/giaothong.jpg';
import lastedUpdate3 from './assets/chi_duong.jpg';
import lastedUpdate4 from './assets/atm.jpg';

import hoverImage3 from './assets/dia_hinh.jpg';
import hoverImage1 from './assets/ve_tinh.jpg';
import hoverImage2 from './assets/giaothong.jpg';
import hoverImage4 from './assets/chi_duong1.jpg';
import hoverImage5 from './assets/toanmanhinh.jpg';




const LatestFeatures = () => {
  // Tạo state để quản lý hình ảnh đang hiển thị
  const [hoveredImage, setHoveredImage] = useState(null);
  const [hoveredImage1, setHoveredImage1] = useState(null);


  // Danh sách hình ảnh và hình ảnh thay thế khi hover
  const images = [
    { default: lastedUpdate, hover: hoverImage1 },
    { default: lastedUpdate1, hover: hoverImage2 },
    { default: lastedUpdate2, hover: hoverImage3 },
  ];

  // Danh sách hình ảnh và hình ảnh thay thế khi hover
  const images1 = [
    { default: lastedUpdate3, hover: hoverImage4 },
    { default: lastedUpdate4, hover: hoverImage5 },
  ];

  return (
    <div className="my-8">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"FEATURES"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
        Normal map, Satellite map, Topographic map, Traffic map, Directions
        </p>
      </div>

      {/* Thêm 3 hình ảnh chữ nhật */}
      <div className="flex justify-between space-x-4">
        {images.map((img, index) => (
          <div 
            key={index} 
            className="relative w-1/3 h-44 overflow-hidden"
          >
            <img
              src={hoveredImage === index ? img.hover : img.default}
              alt={`Feature ${index + 1}`}
              className="w-full h-full object-cover transition-all duration-300"
              onMouseEnter={() => setHoveredImage(index)}
              onMouseLeave={() => setHoveredImage(null)}
            />
          </div>
        ))}
      </div>


      {/* Thêm 3 hình ảnh chữ nhật */}
      <div className="flex justify-between space-x-4 mt-[15px]">
        {images1.map((img, index) => (
          <div 
            key={index} 
            className="relative w-1/2 h-54 overflow-hidden"
          >
            <img
              src={hoveredImage1 === index ? img.hover : img.default}
              alt={`Feature ${index + 1}`}
              className="w-full h-54 object-cover transition-all duration-300"
              onMouseEnter={() => setHoveredImage1(index)}
              onMouseLeave={() => setHoveredImage1(null)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestFeatures;
