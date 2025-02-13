"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Singup() {
  const [fromData, setFromdata] = useState({ email: "", password: "" });
  const router=useRouter()
  const handleSumit = async (e) => {
    e.preventDefault();
    const signupApi = await fetch("/api/unserSingIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify({
        name: fromData.name,
        email: fromData.email,
        password: fromData.password,
        address: fromData.address,
        admin:false
      }),
    });
    const res =await signupApi.json();
    console.log(res);
    
    if (res.sucess) {
      localStorage.setItem("token", res.authToken);
      localStorage.setItem("userEmail", fromData.email);
      localStorage.setItem("isAdmin", res.admin);
      router.push('/')

    }else{
      alert(res.error)
    }
    setFromdata({ name: "", email: "", password: "", address: "" });
  };
  const handleChanges = (e) => {
    setFromdata({ ...fromData, [e.target.name]: e.target.value });
  };
 
  return (
    <div
      className="flex justify-center items-center"
      style={{
        height: "83vh",
        backgroundImage: "url(/cooking-banner-7166200_1280.jpg)",
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
              type="name"
              name="name"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 bg-white"
              placeholder="Enter your Name"
              onChange={(e) => handleChanges(e)}
              value={fromData.name}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-white dark:text-gray-500  text-sm font-bold mb-2 "
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 bg-white"
              placeholder="Enter your uaername/email"
              onChange={(e) => handleChanges(e)}
              value={fromData.email}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-white dark:text-gray-500  text-sm font-bold mb-2 "
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 bg-white"
              placeholder="****************"
              onChange={(e) => handleChanges(e)}
              value={fromData.password}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-white dark:text-gray-500  text-sm font-bold mb-2 "
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 bg-white"
              placeholder="Enter your Address"
              onChange={(e) => handleChanges(e)}
              value={fromData.address}
            />
          </div>
          <div className="mb-4 flex gap-6">
            <button
              type="submit"
              className="border font-bold dark:border-gray-400 border-gray-900 rounded  py-2 px-3 focus:border-indigo-700 text-gray-500 hover:bg-gradient-to-t from-indigo-700 via-violet-700 to-orange-700 hover:text-white bg-white"
            >
              Signup
            </button>

            <Link href={"/login"} style={{ all: "unset" }}>
              <button
                type="submit"
                className="border font-bold dark:border-gray-400 border-gray-900 rounded  py-2 px-3 focus:border-indigo-700 text-gray-500 hover:bg-gradient-to-t from-indigo-700 via-violet-700 to-orange-700 hover:text-white bg-white"
              >
                Already a user ?
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Singup;
