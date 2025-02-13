"use client";
import React, { useEffect, useState } from "react";
import Custom404 from "../404";

const sidesPriceOption = { single: "", double: "" };
const pizzaPriceOption = { regular: "", medium: "", large: "" };
const Admin = () => {
  const [mount,setMount]=useState(false)
  const [fromData, setFromdata] = useState({
    name: "",
    category: "",
    foodType: "",
    price: "",
    description: "",
    img: "",
  });
  const handleSumit = async (e) => {
    e.preventDefault();
    if(fromData.name && fromData.img&& fromData.category){
      const logIn = await fetch("/api/adminData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fromData.name,
          category: fromData.category,
          foodType: fromData.foodType,
          price: fromData.price,
          description: fromData.description,
          img: fromData.img,
        }),
      });
      const res = await logIn.json();
      if (res.message) {
       alert("Add data on admin")
       setFromdata({
         name: "",
         category: "",
         foodType: "",
         price: "",
         description: "",
         img: "",
       });
  
      } else {
        alert(res.error);
      }
    }else{
      alert("Filed all data ");
    }

   
  
  };
  const handleChanges = (e) => {
    setFromdata((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });

    if (e.target.name === "category") {
      if (e.target.value === "Pizza") {
        setFromdata((prevData) => {
          return { ...prevData, price: pizzaPriceOption };
        });
      } else if (e.target.value === "SIDES & BEVERAGES") {
        setFromdata((prevData) => {
          return { ...prevData, price: sidesPriceOption };
        });
      } else {
        setFromdata((prevData) => {
          return { ...prevData, price: "" };
        });
      }
    }
  };

  useEffect(()=>{
    if(JSON.parse(localStorage.getItem("isAdmin"))===true){
      setMount(true)
    }
    
  })
  return (
    <>
    {
      mount ? <div
      className="flex justify-center items-center"
      style={{
        height: "83vh",
        backgroundImage:
          "url(https://as2.ftcdn.net/v2/jpg/07/60/83/17/1000_F_760831757_AEdUOhaLYYoL6DBimKUc5L19qlfRH2TT.jpg)",
        backgroundSize: "cover",
      }}
    >
      <div className="container w-full max-w-md bg-black dark:text-gray-100 border-gradinet rounded-lg shadow-2xl  dark:bg-white">
        <form className="px-8 pt-8 mb-4 pb-3" onSubmit={handleSumit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-white dark:text-gray-500  text-sm font-bold mb-2 "
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 bg-white"
              placeholder="Enter your Name"
              onChange={(e) => handleChanges(e)}
              value={fromData.name}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="foodType"
              className="block text-white dark:text-gray-500  text-sm font-bold mb-2 "
            >
              Food Type
            </label>
            <select
              name="foodType"
              onChange={(e) => handleChanges(e)}
              required
              style={{ "-webkit-appearance": "auto" }}
              value={fromData.foodType}
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select food type</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-white dark:text-gray-500  text-sm font-bold mb-2 "
            >
              Food Category
            </label>
            <select
              placeholder="Food Category"
              name="category"
              onChange={(e) => handleChanges(e)}
              required
              style={{ "-webkit-appearance": "auto" }}
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
              value={fromData.category}
            >
              <option value="">Select Food Category</option>
              <option value="Pizza">PIZZA</option>
              <option value="SIDES & BEVERAGES">SIDES & BEVERAGES</option>
            </select>
          </div>
          {fromData.category && (
            <div className="mb-4">
              <label
                htmlFor="geolocation"
                className="block text-white dark:text-gray-500  text-sm font-bold mb-2 "
              >
                Food Price
              </label>

              {fromData.price !== "" &&
                Object.keys(fromData.price).map((key) => {
                  return (
                    <div key={key} className="ml-4 mb-4">
                      <label
                        className="block text-white dark:text-gray-500  text-sm font-bold mb-2 "
                        htmlFor={key}
                      >
                        {key}
                      </label>
                      <input
                        key={key}
                        type="number"
                        name={key}
                        placeholder={`Price of ${key}`}
                        value={fromData?.price[key]}
                        required
                        onChange={(e) => {
                          setFromdata({
                            ...fromData,
                            price: {
                              ...fromData.price,
                              [key]: e.target.value,
                            },
                          });
                        }}
                        className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                  );
                })}
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-white dark:text-gray-500  text-sm font-bold mb-2 "
            >
              Description
            </label>
            <textarea
              name="description"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 bg-white"
              placeholder="description"
              onChange={(e) => handleChanges(e)}
              value={fromData.description}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-white dark:text-gray-500  text-sm font-bold mb-2 "
            >
              Enter img url
            </label>
            <input
              type="url"
              name="img"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 bg-white"
              placeholder="img"
              onChange={(e) => handleChanges(e)}
              value={fromData.img}
              required
            />
          </div>
          <div className="mb-4 flex gap-6">
            <button
              type="submit"
              className="border font-bold dark:border-gray-400 border-gray-900 rounded py-2 px-3 focus:border-indigo-700 text-gray-500 hover:bg-gradient-to-t from-indigo-700 via-violet-700 to-orange-700 hover:text-white bg-white"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>:<Custom404/>
    }
    </>
    
  );
};

export default Admin;
