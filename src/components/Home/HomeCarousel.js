import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";



const CarouselMain = () => {
    const [imageData,setImageData]=useState([])
  useEffect(() => {
    ["pizza", "burger ", "milkshake"].forEach((item) => {
        console.log(item);
        
      fetch(
        `https://api.unsplash.com/photos/random?client_id=MC45yAs2lw8WV3B7RuY1Vrym8W_PGu7NXu5VkBNh0P0&query=${item}`
      )
        .then((res) => {
            console.log(res)
          return res.json();
        })
        .then((datajson) => {
            setImageData([...imageData,datajson.urls.regular])
         
        }).catch(error=>{console.log(error,"error");
        
        })
    });
    
  }, []);
  
  return (

      <Carousel axis="horizontal"  autoPlay
      navButtonsAlwaysVisible
      infiniteLoop
      showStatus={false}
      emulateTouch
      showThumbs={false}>
        {imageData.map((imageProps) => {            
          return (
            <div style={{maxHeight:"36rem"}} className="brightness-50 object-center">
              <img
                src={imageProps}
                alt={imageProps}
              />
            </div>
          );
        })}
      </Carousel>

  );
};

export default CarouselMain;
