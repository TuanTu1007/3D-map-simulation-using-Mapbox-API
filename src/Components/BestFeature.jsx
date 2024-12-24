import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";

const BestFeature = () => {

  return (
    <div>
      <div className="my-10">
        <div className="text-center text-3xl py-8">
          <Title text1={"BEST"} text2={"FEATURE"} />
          <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum
            commodi facilis error ab neque quos, ea quis quod tempora vero
            consequatur atque, officiis quia placeat recusandae numquam quam
            nihil in?
          </p>
        </div>
      </div>
    </div>
  );
};

export default BestFeature;
