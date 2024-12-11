import Card from "@/components/Home/Card";
import CarouselMain from "@/components/Home/HomeCarousel";
import Head from "next/head";
import cardData from "@/store/cardData.json";
import { useEffect } from "react";

export default function Home() {
  const catageres = Array.from(new Set(cardData.map((item) => item?.category)));
  const foodData = [...cardData];

  return (
    <div className={`font-[family-name:var(--font-geist-sans)]`}>
      <Head>
        <title>PizzaWizza</title>
      </Head>
      <CarouselMain />
      <div className="container mx-auto">
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
