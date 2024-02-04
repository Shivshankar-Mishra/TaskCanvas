import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { CiLinkedin } from "react-icons/ci";
import { useStore } from "../context/StoreContext";

const Footer = () => {
  const { scrollToTop, setShowSearchInput, setShowProfile } = useStore();
  const handleSearchClick = () => {
    scrollToTop(); // Call the scrollToTop function
    setShowSearchInput(true); // Set showSearchInput state to true
  };

  const handleProfileClick = () => {
    scrollToTop();
    setShowProfile(true); // Set showProfile state to true
  };

  return (
    <footer className="mt-4 w-screen h-[593px] bg-[#141212] rounded-t-xl flex flex-col flex-wrap justify-center gap-16 md:gap-24">
      <div className="flex flex-row flex-wrap justify-around items-start gap-10 md:gap-0">
        <div className="flex flex-col justify-center md:justify-start items-center md:items-start gap-4">
          <h3 className="text-white text-[25px] font-bold">Pages</h3>
          <ul className="list-none flex flex-col justify-start items-center md:items-start gap-4">
            <li className="text-neutral-400 hover:text-green-500 text-xl font-medium">
              <Link to="/" onClick={scrollToTop}>
                Dashboard Page{" "}
              </Link>
            </li>
            <li className="text-neutral-400 hover:text-green-500 text-xl font-medium">
              <Link to="/task-page" onClick={scrollToTop}>
                Task Page{" "}
              </Link>
            </li>
            <li className="text-neutral-400 hover:text-green-500 text-xl font-medium">
              <Link to="/sticky-page" onClick={scrollToTop}>
                Sticky Notes Page{" "}
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-center md:justify-start items-center md:items-start gap-4">
          <h3 className="text-white text-[25px] font-bold">TaskCanvas</h3>
          <ul className="list-none flex flex-col justify-start items-center md:items-start gap-4">
            <li
              className="text-neutral-400 hover:text-green-500 text-xl font-medium cursor-pointer"
              onClick={handleSearchClick}
            >
              Search
            </li>
            <li
              className="text-neutral-400 hover:text-green-500 text-xl font-medium cursor-pointer"
              onClick={handleProfileClick}
            >
              Profile Page
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-center md:justify-start items-center md:items-start gap-4 ">
          <h3 className="text-white text-[25px] font-bold">Social Media</h3>
          <div className="flex flex-row justify-between items-start gap-4">
            <div className="flex flex-row justify-center items-center w-12 h-12 rounded-full hover:bg-black hover:shadow-md hover:shadow-green-500">
              <a
                rel="noreferrer noopener"
                href="https://www.instagram.com/__shiv_mishra?igsh=MXBpZnA5Mzh0ZzMwaw=="
                target="_blank"
              >
                <FaInstagram className="w-9 h-9 fill-white hover:fill-green-500" />
              </a>
            </div>
            <div className="flex flex-row justify-center items-center w-12 h-12 rounded-full hover:bg-black hover:shadow-md hover:shadow-green-500">
              <a href="mailto:shivmishankar@gmail.com">
                <MdOutlineEmail className="w-9 h-9 fill-white hover:fill-green-500" />
              </a>
            </div>
            <div className="flex flex-row justify-center items-center w-12 h-12 rounded-full hover:bg-black hover:shadow-md hover:shadow-green-500">
              <a
                rel="noreferrer noopener"
                href="https://www.linkedin.com/in/shivshankar-mishra-4b117a251?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
              >
                <CiLinkedin className="w-9 h-9 fill-white hover:fill-green-500" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-1">
        <p className="text-neutral-400 text-xl md:text-[22px] font-semibold">
          Developer: Shivshankar Mishra
        </p>
        <p className="text-neutral-400 text-lg md:text-xl font-medium">
          Email: shivmishankar@gmail.com
        </p>
      </div>
    </footer>
  );
};

export default Footer;
