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
      <div className="w-80 rounded-3xl bg-white overflow-hidden dark:bg-black  h-80 flex justify-end flex-col" style={{backgroundRepeat: "no-repeat", backgroundSize: "cover",backgroundImage:`url(${foodData?.img})`}}>
      <div style={{background: "linear-gradient(0deg, #000000 -4.12%, rgba(0, 0, 0, 0.81) 45.45%, rgba(0, 0, 0, 0) 97.13%)"}}>
      <Link href={{pathname:'/Item/[item]'}} as={`/Item/${foodData._id}`}>
        
        <div className="px-4">
          <div className="font-bold mb-2 text-xl uppercase text-white pt-1">{foodData?.name}</div>
          <p className="short_description text-gray-700 text-white ">
            {foodData?.description}
          </p>
        </div>
       
        </Link>
        <div className="flex p-4 justify-between pb-2" >
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
        <div className="flex px-4 pb-4 font-bold justify-between text-white align-middle" >
          <button className="border dark:border-gray-400 border-white rounded mt-[1px] mb-[10px] px-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 hover:text-gray-100 text-sm" onClick={handleAddtoCard}>
            Add to cart
          </button>
          
           <p className="p-2 ext-sm">₹{price}/-</p>
        </div>
      </div>
      </div>

    </div>
  );
};

export default Card;
