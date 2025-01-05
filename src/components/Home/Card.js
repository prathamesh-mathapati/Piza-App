import React, { useContext, useState } from "react";
import Image from "next/image";
import { Context } from "@/utlis/ContextReducer";
import Link from "next/link";

const Card = (props) => {
  const {foodData}=props
  const {state,dispatch}=useContext(Context)
  const priceSize=Object.keys(foodData.price)
  const [qty,setQty]=useState(1)
  const[size,setSize]=useState(priceSize[0])
  const price=qty*foodData?.price[size]

  
  const handleAddtoCard=()=>{
const cardDataUpaded=state.find(item=>item.tempId===size+foodData._id)  
if(cardDataUpaded){
  dispatch({type:"UPDATED",
    data:{
    price,
    id:foodData._id,
    tempId:size+foodData._id,
    name:foodData.name,
    img:foodData.img,
    qty,
    priceSize:size,
  }})
}  else{
  dispatch({type:"ADD",
    data:{
    price,
    id:foodData._id,
    tempId:size+foodData._id,
    name:foodData.name,
    img:foodData.img,
    qty,
    priceSize:size,
  }})
}
  
  }

  return (
    <div className="box">
      <div className="w-80 rounded-lg bg-white overflow-hidden dark:bg-black border-gradient">
      <Link href={{pathname:'/Item/[item]'}} as={`/Item/${foodData._id}`}>

        <div className="relative w-full h-80">
          <Image
            layout="fill"
            objectFit="cover"
            alt="Farmhouse pizza"
            src={foodData.img}
          />
        </div>
        <div className="p-4">
          <div className="font-bold mb-2 text-xl uppercase">{foodData?.name}</div>
          <p className="short_description text-gray-700 dark:text-gray-400 text-base">
            {foodData?.description}
          </p>
        </div>
        <div className="flex px-4 justify-between">
          <select  className=" h-100  p-1 text-black hover:font-bold font-semibold cursor-pointer dark:text-gray-300  border border-black dark:border-gray-400 rounded" onChange={e=> setQty(parseInt(e.target.value))}>
            {Array.from(Array(6), (e, i) => {
              return <option key={i + 1}>{1 + i}</option>;
            })}
          </select>

          <select  className=" h-100  p-1 text-black hover:font-bold font-semibold cursor-pointer dark:text-gray-300  border border-black dark:border-gray-400 rounded" onChange={e=> setSize(e.target.value)}>
            {priceSize.map((item, index) => {
              return <option key={index}>{item}</option>;
            })}
          </select>
        </div>
        <div className="flex p-4 font-bold justify-between">
          <button className="border dark:border-gray-400 border-gray-900 rounded p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 hover:text-gray-100" onClick={handleAddtoCard}>
            Add to cart
          </button> <p className="p-2 text-xl">₹{price}/-</p>
        </div>
        </Link>
      </div>

    </div>
  );
};

export default Card;
