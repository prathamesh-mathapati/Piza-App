import Card from "@/components/Home/Card";
import CarouselMain from "@/components/Home/HomeCarousel";
import { baseUrl } from "@/utlis/baseUrl";
import Head from "next/head";
import {useEffect, useState } from "react";

export default function Home({ data }) {
  const [foodtypeFilter, setfoodtypeFilter] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulate a loading state
  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);
console.log(data,"data");

  if (loading) {
    return <div>Loading...</div>;
  }

  const safeData = data || [];
  const catageres = Array.from(new Set(safeData.map((item) => item?.category)));
  const foodData = [...safeData];

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
            onClick={() => setfoodtypeFilter("Veg")}
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
            onClick={() => setfoodtypeFilter("Non-Veg")}
          >
            <span
              className={
                "lowercase bg-white border-red-500 border mr-2 px-0.1 text-red-500"
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
              <hr />
              <div className="flex flex-col justify-center items-center">
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 ">
                  {foodData
                    ?.filter((foodData) => catageres === foodData.category)
                    ?.filter((foodData) =>
                      foodtypeFilter ? foodData.foodType === foodtypeFilter : foodData
                    )
                    ?.map((data) => {
                      return <Card key={data.id} foodData={data} />;
                    })}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}


export async function getStaticProps(context) {
  let data = null;

  try {
    console.log('Fetching API in production...');
    const res = await fetch(baseUrl + "/api/foodData", { method: "GET" });
    
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const PizzaData = await res.json();
    data = PizzaData.data || null;
  } catch (error) {
    console.error("Error fetching data:", error); // Check the error
  }

  return {
    props: {
      data,
    },
    revalidate: 10, // Optional: revalidate in production
  };
}

