// import React from 'react'

import { Link, useLocation } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { useEffect, useState } from "react";

const MenuOverlay = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("/");
  const { setShowMenu } = useStore();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <div className="relative h-auto bg-white rounded-lg shadow-md shadow-black flex flex-col justify-center items-center gap-5 p-4 z-10">
        <div
          onClick={() => {
            setShowMenu(false);
          }}
          className=" absolute top-1 right-1 w-6 h-6 bg-red-500 hover:bg-red-600 cursor-pointer text-center text-white font-bold rounded-md px-1"
        >
          X
        </div>
        <div className="flex flex-row justify-start items-start mt-2">
          <ul className="flex flex-col items-center gap-2 list-none">
            <li
              className={`text-slate-600 hover:text-slate-900 text-center text-lg ${
                activeLink === "/" ? "font-bold" : "font-normal"
              } p-1`}
            >
              <Link
                to="/"
                onClick={() => {
                  setActiveLink("/");
                  setShowMenu(false);
                }}
              >
                Dashboard
              </Link>
            </li>
            <li
              className={`text-slate-600 hover:text-slate-900 text-center text-lg ${
                activeLink === "/task-page" ? "font-bold" : "font-normal"
              } p-1`}
            >
              <Link to="/task-page" onClick={() => setShowMenu(false)}>
                Task Page
              </Link>
            </li>
            <li
              className={`text-slate-600 hover:text-slate-900 text-center  text-lg ${
                activeLink === "/sticky-page" ? "font-bold" : "font-normal"
              } p-1`}
            >
              <Link to="/sticky-page" onClick={() => setShowMenu(false)}>
                Sticky Notes
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MenuOverlay;
