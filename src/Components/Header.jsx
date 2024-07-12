//src Header.jsx
import React from "react";
import "./CSS/Title.css";

const Header = () => {
  return (
    <div
      className="
    bg-main
    w-full 
    h-[6vh] 
    fixed
    bg-opacity-100
    z-50
    border-b-2
    border-yellow
    "
    >
      <h1 className="text-white">QuietBites</h1>
    </div>
  );
};

export default Header;
