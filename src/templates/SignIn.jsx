import { useState } from "react";
import { AiTwotoneMail } from "react-icons/ai";
import { TbPasswordFingerprint } from "react-icons/tb";
import Button from "../templates/Button";
import { useStore } from "../context/StoreContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const SignIn = () => {
  const { setSliderToggle } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
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

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Sign-in successful, you can redirect or perform other actions here
      console.log("Sign-in successful");
    } catch (error) {
      alert("Error signing in:", error.message);
      console.error("Error signing in:", error.message);
    }
  };

  return (
    <form
      className="flex flex-col justify-center items-center gap-7 p-2"
      onSubmit={handleSignIn}
    >
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
        buttonName="Sign In"
      />
      <p className="text-slate-600 tracking-tight">
        create new account{" "}
        <span
          onClick={() => {
            setSliderToggle(false);
          }}
          className="cursor-pointer text-blue-600 hover:text-blue-800 underline tracking-normal px-1"
        >
          Sign Up
        </span>
      </p>
    </form>
  );
};

export default SignIn;
