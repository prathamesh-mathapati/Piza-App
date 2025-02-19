import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    <footer className="bg-[#17202C] " >   
    <div className='container text-white sticky top-0 z-50 body-font flex text-center items-center p-3 mx-auto'>
    <Link
    href={"/"}
    className="flex title-font font-extrabold items-center  uppercase text-gray-100"
  >
    <Image
      alt="Navbar Logo"
      src={"/Pizza_bizza.jpg"}
      width={60}
      height={60}
    />
    <p className="leading-5 text-xl mx-2">Pizza Wizza</p> 

  </Link> 
    <p className="text-sm mx-2 border-gray-300"> | ©2025. All Rights Reserved.</p></div>  
</footer>
  )
}
