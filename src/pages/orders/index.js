import Link from "next/link";
import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orderData, setOrderData] = useState([]);
  const fachData = async () => {
    await fetch("/api/getcardData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      const responce = await res.json();
      setOrderData(responce?.data?.order_data);
      console.log(responce?.data?.order_data);
    });
  };

  useEffect(() => {
    fachData();
  }, []);

  return (
    <>
      {orderData.length > 0 ? (
        <div className=" container mx-auto mt-10 h-auto">
          {orderData?.map((orders, index) => {
            return (
              <div className="flex flex-wrap gap-3" key={index+"222"}>
                {orders?.map((item) => {
                  return (
                    <>
                      {item?.order_date ? (
                        <h4 className="text-xl	font-bold w-full">
                          Order No. {index + 1} {item?.order_date} <hr />
                        </h4>
                      ) : (
                        <div className="my-4 max-w-fit border-black border-gradient p-4 dark:border-white rounded-lg">
                          <img
                            src={item?.img}
                            alt="pizza img"
                            className=" rounded-lg w-72"
                          />
                          <div className="font-bold text-xl">{item?.name}</div>
                          <div className="flex justify-between items-center">
                            <div>{item?.qty}</div> <div>{item?.size}</div>
                            <div className=" font-serif">{item?.price}/-</div>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex w-screen flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold"> No previous Orders 😅</h1>
          {/* <p className="text-gray-600 mt-4">No previous Orders 😅</p> */}
          <Link
            href="/"
            className="text-violet-500 text-xl hover:font-bold mt-8"
          >
            Go back to the home
          </Link>
        </div>
      )}
    </>
  );
};

export default Orders;
