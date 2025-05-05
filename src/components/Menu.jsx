import React from "react";
import { Link } from "react-router-dom";
import userIcon from "../assets/user.png";
import { useAuth } from "../providers/AuthProvider";

const Menu = () => {
  const { user, loggedIn, logOut } = useAuth();

  return (
    <div className="px-4 md:px-[5%] py-3 bg-white shadow">
      <div className="flex flex-wrap items-center justify-center md:justify-between gap-4 text-sm">
        {/* Logo / Title */}
        <div className="text-lg font-bold text-white">Empty</div>

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center gap-4 text-gray-700">
          <li className="hover:scale-105 transition-transform">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:scale-105 transition-transform">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:scale-105 transition-transform">
            <Link to="/career">Career</Link>
          </li>
        </ul>

        {/* Account Section */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {loggedIn ? (
            <>
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={user.photoURL || userIcon}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-gray-800">{user.displayName || "User"}</span>
              <Link to="/profile">
                <button className="btn btn-sm btn-primary">Profile</button>
              </Link>
              <button
                onClick={logOut}
                className="btn btn-sm hover:bg-blue-400 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="btn btn-sm btn-neutral">Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;

