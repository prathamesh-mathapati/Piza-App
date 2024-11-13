'use client'
import Link from "next/link";
import React, { useState } from "react";

const Login = () => {
    const [fromData,setFromdata]=useState({email:'',password:''})
    const handleSumit=(e)=>{
      e.preventDefault();
      setFromdata({email:'',password:''})
    }
    const handleChanges =(e)=>{
      setFromdata({...fromData,[e.target.name]:e.target.value})

    }
  return (
    <div
      className="flex justify-center items-center"
      style={{
        height: "83vh",
        backgroundImage:
          "url(https://images.rawpixel.com/image_social_landscape/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L2lzMTYwNjItaW1hZ2Uta3d2eWZrd3IuanBn.jpg)",
        backgroundSize: "cover",
      }}
    >
      <div className="container w-full max-w-md bg-gray-100 dark:tex-gray-100 border-gradinet rounded-lg shadow-2xl">
        <form className="px-8 pt-8 mb-4 pb-3" onSubmit={handleSumit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="email"
              name="email"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700"
                placeholder="Enter your uaername/email"
                onChange={(e)=>handleChanges(e)}
                value={fromData.email}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700"
              placeholder="****************"
              onChange={(e)=>handleChanges(e)}
              value={fromData.password}

            />
          </div>
          <div className="mb-4 flex gap-6">
          <button type="submit" className="border font-bold dark:border-gray-400 border-gray-900 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-500 hover:bg-gradient-to-t from-indigo-700 via-violet-700 to-orange-700 hover:text-white">Login</button>

          <Link href={'/signup'} style={{all:"unset"}}><button type="submit" className="border font-bold dark:border-gray-400 border-gray-900 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-500 hover:bg-gradient-to-t from-indigo-700 via-violet-700 to-orange-700 hover:text-white">New User ?</button></Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
