import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";



const CarouselMain = () => {
    const [imageData,setImageData]=useState([])
  useEffect(() => {
    ["pizza", "burger ", "cool drinks"].forEach((item) => {
        console.log(item);
        
      fetch(
        `https://api.unsplash.com/photos/random?client_id=MC45yAs2lw8WV3B7RuY1Vrym8W_PGu7NXu5VkBNh0P0&query=${item}`
      )
        .then((res) => {
            console.log(res)
          return res.json();
        })
        .then((datajson) => {
            setImageData([...imageData,datajson.urls])
         
        }).catch(error=>{console.log(error,"error");
        
        })
    });
    
  }, []);
  
  return (
    <div>
      <Carousel axis="horizontal" autoPlay>
        {imageData.map((imageProps) => {
            console.log(imageProps);
            
          return (
            <div>
              <img
                src={imageProps}
                alt={imageProps}
              />
              <p className="legend">Legend 1</p>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselMain;
