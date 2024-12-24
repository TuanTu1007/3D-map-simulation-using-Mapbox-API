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
          className="w-full md:max-w-[450px] ml-[100px]"
          src={about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nihil
            consequatur eum similique pariatur nemo est natus animi voluptatibus
            maiores aspernatur, delectus, laboriosam necessitatibus et, magni
            quam. Repudiandae, cum velit!
          </p>
          <p>
            Qui, quaerat animi. Quo animi reprehenderit neque dolorem!
            Consequuntur sit odio nam facere.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            dicta ea pariatur dolore, laboriosam unde reiciendis voluptatum
            voluptas a atque sed, similique aliquid facilis eum fuga amet!
            Voluptatibus, ratione ducimus.
          </p>
        </div>
      </div>
      <div className="text-xl py-4 ml-[100px]">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20 ml-[100px] mr-[100px]">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance: </b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur explicabo modi officiis tenetur labore quas quos ipsa
            quam accusantium repudiandae doloribus illum, consectetur, facilis
            deleniti ipsam culpa assumenda nisi. Fugiat.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience: </b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur explicabo modi officiis tenetur labore quas quos ipsa
            quam accusantium repudiandae doloribus illum, consectetur, facilis
            deleniti ipsam culpa assumenda nisi. Fugiat.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur explicabo modi officiis tenetur labore quas quos ipsa
            quam accusantium repudiandae doloribus illum, consectetur, facilis
            deleniti ipsam culpa assumenda nisi. Fugiat.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
