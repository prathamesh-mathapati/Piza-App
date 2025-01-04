import Card from "@/components/Home/Card";
import CarouselMain from "@/components/Home/HomeCarousel";
import Head from "next/head";
import { useEffect, useState } from "react";
import baseUrl from "@/utlis/baseUrl";

export default function Home({data}) {
  console.log(data,"data");
  
  const [foodtypeFilter,setfoodtypeFilter]=useState(false)
  const catageres = Array.from(new Set(data.map((item) => item?.category)));
  const foodData = [...data];

  return (
    <div className={`font-[family-name:var(--font-geist-sans)]`}>
      <Head>
        <title>PizzaWizza</title>
      </Head>
      <CarouselMain />
      <div className="container mx-auto">
      <div className="my-6 space-x-5">
          <button
            className={`border-black rounded-full dark:border-white border-2 py-1 px-3 ${
              !foodtypeFilter && "bg-slate-300 dark:bg-slate-600"
            } `}
            onClick={() => setfoodtypeFilter(false)}
          >
            All
          </button>
          <button
            className={`border-black rounded-full dark:border-white border-2 py-1 px-3 ${
              foodtypeFilter === "Veg" && "bg-slate-300 dark:bg-slate-600"
            } `}
            onClick={() => {
              setfoodtypeFilter("Veg");
            }}
          >
            <span
              className={
                "lowercase font-thin bg-white border-green-500 border mr-2 px-0.1 text-green-500"
              }
            >
              ●
            </span>
            Veg
          </button>
          <button
            className={`border-black rounded-full dark:border-white border-2 py-1 px-3 m-auto ${
              foodtypeFilter === "Non-Veg" && "bg-slate-300 dark:bg-slate-600"
            } `}
            onClick={() => {
              setfoodtypeFilter("Non-Veg");
            }}
          >
            <span
              className={
                "lowercase  bg-white border-red-500 border mr-2 px-0.1 text-red-500 "
              }
            >
              ●
            </span>
            Non Veg
          </button>
        </div>
      {catageres?.map((catageres) => {
        return (
          <>
            <div key={catageres} className="text-4xl font-bold uppercase mt-10 ">
              {catageres}
            </div>
            <hr></hr>
            <div className="flex flex-col justify-center items-center">
              <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2">
                {foodData
                  ?.filter((foodData) => catageres === foodData.category)
                  ?.filter((foodData)=>foodtypeFilter?foodData.foodType===foodtypeFilter:foodData)
                  ?.map((data) => {
                    return <Card key={data.id} foodData={data} />;
                  })}
              </div>
            </div>
          </>
        );
      })}
      </div>
      {/* <Card/> */}
    </div>
  );
}

export async function getStaticProps () {
  let data=null
  try {
    const PizzaData=await fetch(baseUrl+"/api/foodData",{method:"GET"}).then(respone=>respone.json()).catch(error=>console.log(error.message,"error"))
    data =await JSON.parse(JSON.stringify(PizzaData.data))
    
  } catch (error) {
    console.log(error.message,"error")
  }  

  return {
    props:{
      data:data
    }
  }
} 
