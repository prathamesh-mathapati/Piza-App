import CarouselMain from "@/components/Home/HomeCarousel";
import Head from "next/head";


export default function Home() {
  return (
    <div
      className={`font-[family-name:var(--font-geist-sans)]`}
    >
          <Head>
        <title>PizzaWizza</title>
      </Head>
      <CarouselMain/>
    </div>
  );
}
