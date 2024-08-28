import React from "react";

function Navbar(props) {
  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-xl p-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-white tracking-wide">
          {props.logoName}
        </h1>
        <ul className="flex space-x-8">
          <li className="text-white text-lg hover:text-gray-200 transition-colors duration-300">
            Home
          </li>
          <li className="text-white text-lg hover:text-gray-200 transition-colors duration-300">
            About
          </li>
          <li className="text-white text-lg hover:text-gray-200 transition-colors duration-300">
            Contact
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
