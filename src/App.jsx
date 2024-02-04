import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboardpage from "./pages/Dashboardpage";
import Stickypage from "./pages/Stickypage";
import Todopage from "./pages/Todopage";
import Navbar from "./templates/Navbar";
import { useStore } from "./context/StoreContext";
import Footer from "./templates/Footer";
import SearchResult from "./components/SearchResult";
import useAuth from "./templates/useAuth";
import UserProfile from "./components/UserProfile";
import SignInSignUp from "./components/SignInSignUp";
import MenuOverlay from "./components/MenuOverlay";
import SearchBox from "./components/SearchBox";

function App() {
  const { showSearchInput, showSearchResult, showProfile, showMenu } =
    useStore();
  const { currentUser } = useAuth();
  return (
    <Router>
      <div>
        <Navbar />
        <div className="md:hidden flex flex-row justify-center mt-2">
          {showSearchInput && <SearchBox />}
        </div>
        <div
          className={` absolute right-0 ${
            showProfile ? "flex" : "hidden"
          } flex-row justify-end items-start pr-5 `}
        >
          {currentUser && <UserProfile />}
        </div>
        <div
          className={` absolute right-0 ${
            showMenu ? "flex" : "hidden"
          } flex-row justify-end items-start pr-5 `}
        >
          {showMenu && <MenuOverlay />}
        </div>
        <div
          className={`flex flex-row justify-center mt-8 ${
            showSearchResult ? "flex" : "hidden"
          } `}
        >
          <SearchResult />
        </div>
        {currentUser ? (
          <Routes>
            <Route path="/" element={<Dashboardpage />} />
            <Route path="/task-page" element={<Todopage />} />
            <Route path="/sticky-page" element={<Stickypage />} />
            {/* <Route path="/profile-page" element={<Profilepage />} /> */}
          </Routes>
        ) : (
          <SignInSignUp />
        )}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
