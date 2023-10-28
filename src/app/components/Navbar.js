"use client";
import React, { useState } from "react";
import Image from "next/image";
import profilePic from "../assets/profileimg.jpg";
import { BiMenu, BiBell, BiMessageAltMinus, BiLogOut } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";

export const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div className="md:px-12 px-4 md:py-6 py-4 border-b flex justify-between">
      {/* left */}
      <div className="flex items-center gap-2">
        {/* menu */}
        <button>
          <BiMenu size={25} className="text-gray-700" />
        </button>

        {/* logo text */}
        <span className="font-semibold md:text-2xl text-gray-700">
          Bookpedia
        </span>
      </div>
      {/* right */}
      <div className="flex items-center gap-4">
        {/* notification */}
        <button>
          <BiBell size={25} className="text-gray-700" />
        </button>
        {/* message icon */}
        <button>
          <BiMessageAltMinus size={25} className="text-gray-700" />
        </button>
        {/* profile setting */}
        <div className="relative">
          <button
            className="flex items-center gap-1"
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
            }}
          >
            <div className="w-7 h-7 rounded-full overflow-hidden">
              <Image src={profilePic} className="object-cover w-7 h-7" />
            </div>
            <BsChevronDown size={15} className="text-gray-700" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0  mt-2 w-48 rounded-md border shadow bg-white z-[50]">
              <div className="py-1">
                <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full cursor-pointer">
                  <span className="flex items-center gap-2 text-lg">
                    <AiOutlineSetting /> Settings
                  </span>
                </p>
                <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full cursor-pointer">
                  <span className="flex items-center gap-2 text-lg">
                    <BiLogOut /> Log Out
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
