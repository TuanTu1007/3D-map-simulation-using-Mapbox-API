import React from "react";
import Title from "./Title";
import best from './assets/best_feature.jpg';
import best1 from './assets/best_feature1.jpg';
import { useState } from "react";

const BestFeature = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div>
      <div className="my-10">
        <div className="text-center text-3xl py-8">
          <Title text1={"BEST"} text2={"FEATURE"} />
          <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            Mode 3D
          </p>
        </div>
        <div className="ml-[240px] group" 
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img src={hovered ? best : best1} alt="Image 1" className="absolute w-2/4 transition-transform duration-500 group-hover:translate-x-[300px] mt-[150px]" />
          <img
            src={hovered ? best1 : best}
            alt="Image 2"
            className="absolute w-2/4 ml-[300px] transition-transform duration-500 group-hover:-translate-x-[300px]"
          />
        </div>
      </div>
    </div>
  );
};

export default BestFeature;