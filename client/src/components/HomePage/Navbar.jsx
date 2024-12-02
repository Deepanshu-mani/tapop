import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white p-4 w-11/12 mx-auto rounded-full py-6 shadow-md">
      <div className="flex justify-between items-center pl-6">
        <h1 className="text-black text-3xl font-bold">XT-MANI</h1>
        <div className="space-x-2 flex">
          {/* Log in Button */}
          <div className="hover:scale-95 duration-200 transition-all ease-in-out">
            <Link
              to="/login"
              className="text-black px-5 py-5 text-lg font-medium rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              Log in
            </Link>
          </div>

          {/* Sign Up Button */}
          <div className="hover:scale-95 duration-200 transition-all ease-in-out">
            <Link
              to="/signup"
              className="text-white px-6 py-5 text-lg font-medium rounded-full bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              Sign up free
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;