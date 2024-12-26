import React from "react";
import about_img from "../Components/assets/aboutus.jpg";
import NewsletterBox from "../Components/NewsletterBox";
import Title from "../Components/Title";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t ml-[50px]">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px] ml-[120px]"
          src={about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 text-justify">
          <p>
            Welcome to our website! We are a team of passionate and creative technologists, providing advanced 3D mapping solutions. 
            Combining cutting-edge technology with a deep understanding of geography, we bring you the most intuitive and immersive experiences. 
            From exploring new places to analyzing complex geographic data, we strive to provide powerful and easy-to-use tools.
          </p>
          <p>
            Join us as we explore the world through 3D and open up endless possibilities for the future!
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
          At CHEESE, our mission is to provide the most advanced and intuitive 3D mapping solutions. 
          We believe that understanding the world around us through 3D technology will open up new opportunities 
          and improve the quality of life. We are committed to continuous innovation and development to provide powerful,
           easy-to-use tools that help users explore, analyze and make the most of geographic information. With a team of 
           dedicated and passionate experts, 
          we are always ready to accompany you on your journey of discovery and conquering new limits.
          </p>
        </div>
      </div>
      <div className="text-xl py-4 ml-[100px]">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20 ml-[100px] mr-[100px]">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance: </b>
          <p className="text-gray-600 text-justify">
            <b>Accuracy Guaranteed:</b> We use rigorous testing tools and processes to ensure that all 3D data and simulations are accurate and reliable. <br />
            <b>Stability and Performance:</b> Our products are thoroughly tested to ensure stable operation and high performance, even in complex situations. <br />
            <b>User Experience:</b> We always put the user first, ensuring that the product interface and features are easy to use and friendly.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 text-justify">
          <b>Convenience: </b>
          <p className="text-gray-600">
          <b>User-friendly interface:</b> We design an intuitive and easy-to-use user interface, making it easy for you to access and operate 3D simulation tools. <br />
          <b>Flexible integration:</b> Our products can be easily integrated with other systems and software, saving you time and effort. <br />
          <b>Access anytime, anywhere:</b> With the online platform, you can access and use our 3D simulation tools from anywhere, anytime, as long as you have an internet connection.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 text-justify">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
          <b>Quick Response:</b> We are committed to responding to all customer requests and queries quickly and efficiently. <br />
          <b>Dedicated Support:</b> Our customer support team is always ready to listen and solve all your problems with a dedicated and professional attitude. <br />
          <b>Optimal Solution:</b> We not only provide answers but also offer the most optimal solutions to meet your needs.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
