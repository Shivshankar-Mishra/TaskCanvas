import { auth } from "../firebase/firebaseConfig";
import { useState } from "react";
import Button from "./Button";
import { AiTwotoneMail } from "react-icons/ai";
import { TbPasswordFingerprint } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import Googleicon from "../assets/google.svg";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const SignUp = () => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullnameFocused, setFullnameFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);  
    const handleFullnameChange = (event) => {
      setFullname(event.target.value);
    };
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleFullnameFocus = () => {
      setFullnameFocused(true);
    };
  
    const handleFullnameBlur = () => {
      if (!fullname) {
        setFullnameFocused(false);
      }
    };
    const handleEmailFocus = () => {
      setEmailFocused(true);
    };
  
    const handleEmailBlur = () => {
      if (!email) {
        setEmailFocused(false);
      }
    };
  
    const handlePasswordFocus = () => {
      setPasswordFocused(true);
    };
  
    const handlePasswordBlur = () => {
      if (!password) {
        setPasswordFocused(false);
      }
    };

    const handleSignUp = async (event) => {
      event.preventDefault();
  
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up successfully!");
        // You can also update the user's profile with their full name
        await updateProfile(auth.currentUser, {
          displayName: fullname
        });
      } catch (error) {
        alert("Error Signing Up: " + error.message);
        console.error("Error signing up:", error.message);
      }
    };

    const handleGoogleSignUp = async () => {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("User signed up with Google:", user);
      } catch (error) {
        alert("Error signing up:", error.message);
        console.error("Error signing up with Google:", error.message);
      }
    };
  
    return (
      <form onSubmit={handleSignUp} className="flex flex-col justify-center items-center gap-5 p-2">
        <div className="relative flex flex-row justify-center items-center mx-auto">
          <label
            className={`absolute left-0 cursor-text transition-all duration-300 ${
              fullnameFocused || fullname
                ? "text-sm -top-3 left-3 bg-white text-gray-700 px-1 rounded-lg"
                : "top-2 left-10 text-slate-600"
            }`}
            htmlFor="fullname"
          >
            Full Name
          </label>
          <FaRegUser className="absolute top-2 left-2 text-xl text-slate-500" />
          <input
            type="text"
            id="fullname"
            placeholder=""
            value={fullname}
            onChange={handleFullnameChange}
            onFocus={handleFullnameFocus}
            onBlur={handleFullnameBlur}
            className="w-[16rem] h-9 border-2 border-slate-400 rounded-lg focus:outline-none focus:border-blue-500 pl-9"
            required
          />
        </div>
        <div className="relative flex flex-row justify-center items-center mx-auto">
          <label
            className={`absolute left-0 cursor-text transition-all duration-300 ${
              emailFocused || email
                ? "text-sm -top-3 left-3 bg-white text-gray-700 px-1 rounded-lg"
                : "top-2 left-10 text-slate-600"
            }`}
            htmlFor="email"
          >
            Email
          </label>
          <AiTwotoneMail className="absolute top-2 left-2 text-2xl text-slate-500" />
          <input
            type="email"
            id="email"
            placeholder=""
            value={email}
            onChange={handleEmailChange}
            onFocus={handleEmailFocus}
            onBlur={handleEmailBlur}
            className="w-[16rem] h-9 border-2 border-slate-400 rounded-lg focus:outline-none focus:border-blue-500 pl-9"
            required
          />
        </div>
        <div className="relative flex flex-row justify-center items-center mx-auto">
          <label
            className={`absolute left-0 cursor-text transition-all duration-300 ${
              passwordFocused || password
                ? "text-sm -top-3 left-3 bg-white text-gray-700 px-1 rounded-lg"
                : "top-2 left-10 text-slate-600"
            }`}
            htmlFor="password"
          >
            Password
          </label>
          <TbPasswordFingerprint className="absolute top-2 left-2 text-2xl text-slate-500" />
          <input
            type="password"
            id="password"
            placeholder=""
            value={password}
            onChange={handlePasswordChange}
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
            className="w-[16rem] h-9 border-2 border-slate-400 rounded-lg focus:outline-none focus:border-blue-500 pl-9"
            required
          />
        </div>
        <Button
          type="submit"
          wid="w-36"
          hgt="h-10"
          bgColor="bg-slate-900"
          hoverBgColor="hover:bg-white hover:text-slate-900"
          borderColor="border-slate-900"
          buttonName="Sign Up"
        />
        <div className="flex flex-row justify-center items-start gap-2">
        <p className="text-slate-600 tracking-tight ">
          create account using{" "}
        </p>
          <img src={Googleicon} alt="google icon" className="w-6 h-6 cursor-pointer" onClick={handleGoogleSignUp} />
        </div>
      </form>
    );
  };

export default SignUp