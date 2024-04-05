import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/TaskCanvasLogo1.jpeg";
import logo from "../assets/TaskCanvasLogoFirefly2.jpg";
import { IoSearchOutline, IoClose } from "react-icons/io5";
import { CiMenuFries } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useStore } from "../context/StoreContext";
import useAuth from "./useAuth";
import SearchBox from "../components/SearchBox";

const Navbar = () => {
  const {
    showSearchInput,
    setShowSearchInput,
    showProfile,
    setShowProfile,
    showMenu,
    setShowMenu,
  } = useStore();

  const location = useLocation();
  const [activeLink, setActiveLink] = useState("/");
  const { currentUser } = useAuth();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const toggleProfileOverlay = () => {
    setShowProfile(!showProfile);
  };
  const toggleMenuOverlay = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex flex-row justify-between items-center px-4">
      <div className="flex flex-row justify-between items-baseline gap-10 pt-1">
        <div className="flex flex-row justify-center items-center gap-1">
          <img src={Logo} alt="brand logo" className="w-10 h-10 rounded-lg" />
          <span className="text-3xl text-black font-bold leading-6">
            TaskCanvas
          </span>
        </div>
        <ul className="md:flex hidden flex-row justify-center gap-3 list-none">
          <li
            className={`text-slate-600 hover:text-slate-900 text-center text-lg ${
              activeLink === "/" ? "font-bold" : "font-normal"
            } p-1`}
          >
            <Link to="/" onClick={() => setActiveLink("/")}>
              Dashboard
            </Link>
          </li>
          <li
            className={`text-slate-600 hover:text-slate-900 text-center text-lg ${
              activeLink === "/task-page" ? "font-bold" : "font-normal"
            } p-1`}
          >
            <Link to="/task-page">Task Page</Link>
          </li>
          <li
            className={`text-slate-600 hover:text-slate-900 text-center  text-lg ${
              activeLink === "/sticky-page" ? "font-bold" : "font-normal"
            } p-1`}
          >
            <Link to="/sticky-page">Sticky Notes</Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-row justify-between items-start gap-3">
        {currentUser && (<div className="flex flex-row flex-wrap justify-center items-end gap-2 ">
          {!showSearchInput ? (
            <IoSearchOutline
              className="w-7 h-7 text-slate-600 hover:text-slate-900 cursor-pointer"
              onClick={() => setShowSearchInput(true)}
            />
          ) : (
            <IoClose
              className="w-7 h-7 text-slate-600 hover:text-slate-900 cursor-pointer"
              onClick={() => setShowSearchInput(false)}
            />
          )}
          <div className="hidden md:flex flex-row justify-center">
            {showSearchInput && <SearchBox />}
          </div>
        </div>)}
        <div className="flex flex-row items-center">
          {currentUser && (
            <span className="text-slate-600 mr-2 md:flex hidden">
              {currentUser.displayName}
            </span>
          )}
          {currentUser ? (
            <img
              src={
                currentUser && currentUser.photoURL
                  ? currentUser.photoURL
                  : logo
              }
              alt="Profile Image"
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={toggleProfileOverlay}
            />
          ) : (
            <CgProfile
              className="w-7 h-7 text-slate-900"
              onClick={toggleProfileOverlay}
            />
          )}
        </div>
        <div className="flex md:hidden flex-row items-center">
          <CiMenuFries
            className="w-7 h-7 text-slate-600 hover:text-slate-900 stroke-1 cursor-pointer"
            onClick={toggleMenuOverlay}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
