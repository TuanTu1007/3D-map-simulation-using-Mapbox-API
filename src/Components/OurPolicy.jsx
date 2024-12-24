import React from "react";
import exchange_icon from './assets/exchange_icon.png'
import quality_icon from './assets/quality_icon.png'
import support_img from './assets/support_img.png'


const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <img src={exchange_icon} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold"> Free Service Policy</p>
        <p className="text-gray-400"> We offer service free policy</p>
      </div>

      <div>
        <img src={quality_icon} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold"> Constantly Updated</p>
        <p className="text-gray-400"> We are always updating new features</p>
      </div>

      <div>
        <img src={support_img} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold"> Best Customer Support</p>
        <p className="text-gray-400"> We provide 24/7 customer support </p>
      </div>
    </div>
  );
};

export default OurPolicy;
