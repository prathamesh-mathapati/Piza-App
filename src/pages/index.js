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
    console.log(data,"data");

  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const safeData = data || [];
  const catageres = Array.from(new Set(safeData.map((item) => item?.category)));
  const foodData = [...safeData].reverse();

  return (
    <div className={`font-[family-name:var(--font-geist-sans)] bg-no-repeat`} >
      <Head>
        <title>PizzaWizza</title>
      </Head>
      <CarouselMain />
      <div className="container mx-auto" >
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
                <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 ">
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


export async function getStaticProps() {
  let data;
  try {
    const pizzaData = await fetch(baseUrl + "api/foodData", { method: "GET" })
      .then((response) => response.json())
      .catch((error) => error.message);
    data = await JSON.parse(JSON.stringify(pizzaData)); // step required during deployment in staticProps
  } catch (error) {
    console.log(error.message);
  }

  return {
    props: {
      data: data?.data || null,
    },
    revalidate: 5,
  };
}
