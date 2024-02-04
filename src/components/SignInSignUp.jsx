import logo from "../assets/TaskCanvasLogo1.jpeg";
import { useStore } from "../context/StoreContext";
import SignIn from "../templates/SignIn";
import SignUp from "../templates/SignUp";


const SignInSignUp = () => {
    const { sliderToggle, setSliderToggle } = useStore();
    return (
      <div className="flex flex-row justify-center items-center my-10">
        <div className="w-[90vw] h-[78vh] md:w-[50vw] md:h-96 flex flex-col md:flex-row justify-center items-center md:items-strech bg-white shadow-md shadow-black rounded-lg p-5">
          <div className="w-full h-[31.2vh] md:w-[49%] md:h-full flex flex-col justify-center items-center gap-3 md:gap-8">
            <img
              src={logo}
              alt="TaskCanvas logo"
              className="w-28 md:w-40 h-auto rounded-sm"
            />
            <h2 className="text-slate-700 font-bold text-3xl md:text-4xl">TaskCanvas</h2>
          </div>
          <div className="hidden md:block w-[2px] h-[24rem] bg-slate-400" />
          <div className="md:hidden block w-[90vw] h-[2px] bg-slate-400 my-5" />
          <div className="w-full h-[46.02vh] md:w-[49%] md:h-full flex flex-col justify-start items-start gap-5 px-2">
            <div className="w-full  flex flex-row justify-between items-center">
              <div className="relative w-1/2 flex flex-col justify-start items-center gap-2">
                <h3
                  className="text-slate-600 text-lg font-bold cursor-pointer"
                  onClick={() => {
                    setSliderToggle(true);
                  }}
                >
                  Sign In
                </h3>
                {sliderToggle && (
                  <div className="absolute top-8 w-full h-2 bg-orange-500 rounded-md" />
                )}
              </div>
              <span className="text-2xl text-slate-400 mx-2">|</span>
              <div className="relative w-1/2 flex flex-col justify-center items-center gap-2">
                <h3
                  className="text-slate-600 text-lg font-bold cursor-pointer"
                  onClick={() => {
                    setSliderToggle(false);
                  }}
                >
                  Sign Up
                </h3>
                {!sliderToggle && (
                  <div className="absolute top-8 w-full h-2 bg-orange-500 rounded-md" />
                )}
              </div>
            </div>
            <div className="w-full flex flex-row justify-center items-center">
              {sliderToggle ? <SignIn /> : <SignUp />}
            </div>
          </div>
        </div>
      </div>
    );
  };

export default SignInSignUp