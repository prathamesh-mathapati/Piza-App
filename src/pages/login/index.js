"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Login = () => {
  const [fromData, setFromdata] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // Track loading state
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the API call is made

    const logIn = await fetch("/api/userLoing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: fromData.email,
        password: fromData.password,
      }),
    });

    const res = await logIn.json();
    setLoading(false); // Set loading to false after API call is complete

    if (res.sucess) {
      localStorage.setItem("token", res.authToken);
      localStorage.setItem("userEmail", fromData.email);
      localStorage.setItem("isAdmin", res.admin);
      router.push("/");
    } else {
      alert(res.error);
    }

    setFromdata({ email: "", password: "" });
  };

  const handleChanges = (e) => {
    setFromdata({ ...fromData, [e.target.name]: e.target.value });
  };

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
      <div className="container w-full max-w-md bg-black dark:text-gray-100 border-gradinet rounded-lg shadow-2xl  dark:bg-white">
        <form className="px-8 pt-8 mb-4 pb-3" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block  dark:text-gray-500 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="email"
              name="email"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 bg-white"
              placeholder="Enter your username/email"
              onChange={handleChanges}
              value={fromData.email}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block  dark:text-gray-500 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 bg-white text-gray-600"
              placeholder="****************"
              onChange={handleChanges}
              value={fromData.password}
            />
          </div>
          <div className="mb-4 flex gap-6">
            <button
              type="submit"
              className="border font-bold dark:border-gray-400 border-gray-900 rounded py-2 px-3 focus:border-indigo-700 text-gray-500 hover:bg-gradient-to-t from-indigo-700 via-violet-700 to-orange-700 hover:text-white bg-white"
              disabled={loading} // Disable the button when loading
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <Link href={"/signup"} style={{ all: "unset" }}>
              <button
                type="submit"
                className="border font-bold dark:border-gray-400 border-gray-900 rounded py-2 px-3 focus:border-indigo-700 text-gray-500 hover:bg-gradient-to-t from-indigo-700 via-violet-700 to-orange-700 hover:text-white bg-white"
                disabled={loading} // Disable the button when loading
              >
                New User?
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
