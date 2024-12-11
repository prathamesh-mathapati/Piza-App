import React from "react";
import Image from "next/image";

const Card = (props) => {
  const {foodData}=props

  
  return (
    <div className="box">
      <div className="w-80 rounded-lg bg-white overflow-hidden dark:bg-black border-gradient">
        <div className="relative w-full h-80">
          <Image
            layout="fill"
            objectFit="cover"
            alt="Farmhouse pizza"
            src={foodData.img}
          />
        </div>
        <div className="p-4">
          <div className="font-bold mb-2 text-xl uppercase">{foodData?.category}</div>
          <p className="short_description text-gray-700 dark:text-gray-400 text-base">
            {foodData?.description}
          </p>
        </div>
        <div className="flex px-4 justify-between">
          <select  className=" h-100  p-1 text-black hover:font-bold font-semibold cursor-pointer dark:text-gray-300  border border-black dark:border-gray-400 rounded">
            {Array.from(Array(6), (e, i) => {
              return <option key={i + 1}>{1 + i}</option>;
            })}
          </select>

          <select  className=" h-100  p-1 text-black hover:font-bold font-semibold cursor-pointer dark:text-gray-300  border border-black dark:border-gray-400 rounded">
            {Object.keys(foodData.price).map((item, index) => {
              return <option key={index}>{item}</option>;
            })}
          </select>
        </div>
        <div className="flex p-4 font-bold justify-between">
          <button className="border dark:border-gray-400 border-gray-900 rounded p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 hover:text-gray-100">
            Add to cart
          </button> <p className="p-2 text-xl">₹100/-</p>
        </div>
       
      </div>
    </div>
  );
};

export default Card;
