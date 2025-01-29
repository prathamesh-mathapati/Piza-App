import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const CarouselMain = () => {
  const [imageData, setImageData] = useState([
    "https://images.unsplash.com/photo-1624340209361-bfad6e30dbf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODA4MjZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM2NzI5MDJ8&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1465799411029-5a317ff17837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODA4MjZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzM2NzI5MDJ8&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1714799263245-4fc7cc21911e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODA4MjZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Mzc1MjU5MDh8&ixlib=rb-4.0.3&q=80&w=1080",
  ]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const queries = ["pizza", "burger", "milkshake"];
    try {
      const responses = await Promise.all(
        queries.map((query) =>
          fetch(
            `https://api.unsplash.com/photos/random?client_id=MC45yAs2lw8WV3B7RuY1Vrym8W_PGu7NXu5VkBNh0P0&query=${query}`
          ).then((res) => res.json())
        )
      );

      const newImages = responses
        .map((data) => data.urls?.regular)
        .filter((url) => !!url); // Ensure valid URLs
      setImageData((prev) => [...prev, ...newImages]);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <Carousel
      axis="horizontal"
      autoPlay
      navButtonsAlwaysVisible
      infiniteLoop
      showStatus={false}
      emulateTouch
      showThumbs={false}
    >
      {imageData.map((imageUrl, index) => (
        <div
          style={{ maxHeight: "36rem" }}
          className="object-center brightness-50"
          key={index}
        >
          <img src={imageUrl} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselMain;
