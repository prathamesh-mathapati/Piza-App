import React from "react";
import Image from "next/image";

const Card = () => {
  const priceOptions = ["medium", "regular", "large"];
  
  return (
    <div className="box">
      <div className="w-80 rounded-lg bg-white overflow-hidden dark:bg-black border-gradient">
        <div className="relative w-full h-80">
          <Image
            layout="fill"
            objectFit="cover"
            alt="Farmhouse pizza"
            src="https://images.dominos.co.in/nextgen-catalog/media/prod/Dominos/WebHomeProductV1/d6ef0e48-39e8-4b1f-908a-284f3ffd4808_farmhouse_side.webp?ver=V0.0.1"
          />
        </div>
        <div className="p-4">
          <div className="font-bold mb-2 text-xl uppercase">Pizza</div>
          <p className="short_description text-gray-700 dark:text-gray-400 text-base">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <div className="flex px-4 justify-between">
          <select>
            {Array.from(Array(6), (e, i) => {
              return <option key={i + 1}>{1 + i}</option>;
            })}
          </select>

          <select>
            {priceOptions.map((item, index) => {
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
