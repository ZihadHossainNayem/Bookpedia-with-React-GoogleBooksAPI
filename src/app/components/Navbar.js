import React from "react";
import Image from "next/image";
import profilePic from "../assets/profileimg.jpg";
import { BiMenu, BiBell, BiMessageAltMinus } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";

export const Navbar = () => {
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
        <button className="flex items-center gap-1">
          <div className="w-7 h-7 rounded-full overflow-hidden">
            <Image src={profilePic} className="object-cover w-7 h-7" />
          </div>
          <BsChevronDown size={15} className="text-gray-700" />
        </button>
      </div>
    </div>
  );
};
