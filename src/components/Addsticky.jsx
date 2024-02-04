import { useState } from "react";
import Penicon from "../assets/pencil.svg";
import Button from "../templates/Button";
import { useStore } from "../context/StoreContext";

const Addsticky = () => {
  const { stickyData, setStickyData, addStickyNote } = useStore();

  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
  });

  const [letterCount, setLetterCount] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStickyData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "description") {
      const newLetterCount = Math.min(value.length, 220);
      setLetterCount(newLetterCount);
      validateDescription(value);
    } else if (name === "title") {
      validateField("title", value);
    }
  };

  const validateDescription = (value) => {
    if (value.trim() === "") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        description: "Description is required",
      }));
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, description: "" }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const isTitleValid = validateField("title", stickyData.title);
    const isDescriptionValid = validateField(
      "description",
      stickyData.description
    );

    if (isTitleValid && isDescriptionValid) {
      try {
        // Add sticky note to Firestore
        await addStickyNote(stickyData);

        // Reset the form
        setStickyData({
          title: "",
          description: "",
          stickyColor: "#00D1FF",
          textColor: "#000000",
        });

        setLetterCount(0);
        setFormErrors({
          title: "",
          description: "",
        });
      } catch (error) {
        console.error("Error adding sticky note: ", error);
      }
    }
  };

  const validateField = (fieldName, value) => {
    if (value.trim() === "") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `${
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        } is required`,
      }));
      return false;
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
      return true;
    }
  };
  return (
    <div className="w-[94vw] h-[85vh] md:w-[420px] md:h-[650px] bg-purple-100 border-2 border-solid border-purple-600 rounded-[30px]">
      <div className="flex flex-row justify-start items-start gap-1 m-3 px-2">
        <img
          src={Penicon}
          alt="pencile icon"
          className="w-[50px] md:w-[60px] md:h-[60px]"
        />
        <div className="flex flex-col justify-center items-start">
          <h2 className="text-stone-900 text-2xl font-bold ">
            Add Sticky Notes
          </h2>
          <p className="md:w-[270px] md:h-[18px] text-stone-900 text-[13px] font-normal leading-snug">
            Share your ideas and thoughts by adding sticky notes.
          </p>
        </div>
      </div>
      <form action="" onSubmit={handleFormSubmit} className="-mt-3">
        <div className="flex flex-col justify-center items-start gap-5 mx-3 py-9">
          <div className="flex flex-col justify-center items-start gap-2 mx-3">
            <label
              htmlFor="title"
              className="text-black text-[15px] font-semibold"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={stickyData.title}
              placeholder="Please enter details here"
              onChange={handleInputChange}
              className={`w-[300px] h-[27px] bg-white rounded-[5px] border ${
                formErrors.title ? "border-red-500" : "border-stone-300"
              } placeholder:text-stone-400 placeholder:text-[10px] placeholder:font-normal placeholder:leading-[15px] px-3 py-4 hover:border-solid focus-within:border-solid hover:border-slate-600 focus:border-slate-600`}
            />
            {formErrors.title && (
              <span className="text-red-500 text-[10px] -mt-1 ml-1">
                {formErrors.title}
              </span>
            )}
          </div>
          <div className="flex flex-col justify-center gap-2 mx-3">
            <label
              htmlFor="description"
              className="text-black text-[15px] font-semibold"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              value={stickyData.description}
              placeholder="Please enter details here"
              onChange={handleInputChange}
              maxLength="220"
              className={`w-[300px] h-[118px] bg-white rounded-[5px] border ${
                formErrors.description ? "border-red-500" : "border-stone-300"
              } placeholder:text-stone-400 placeholder:text-[10px] placeholder:font-normal placeholder:leading-[15px] px-3 py-2 hover:border-solid focus-within:border-solid hover:border-slate-600 focus:border-slate-600`}
            ></textarea>
            <div className="flex justify-end text-stone-500 text-xs">
              {letterCount}/220
            </div>
            {formErrors.description && (
              <span className="text-red-500 text-[10px] -mt-7 ml-1">
                {formErrors.description}
              </span>
            )}
          </div>
          <div className="flex flex-col justify-center items-start gap-2 mx-3">
            <label
              htmlFor="stickyColor"
              className="text-black text-[15px] font-semibold"
            >
              Sticky Color
            </label>
            <input
              type="color"
              name="stickyColor"
              id="stickyColor"
              value={stickyData.stickyColor}
              onChange={(e) =>
                setStickyData((prevData) => ({
                  ...prevData,
                  stickyColor: e.target.value,
                }))
              }
              style={{ backgroundColor: stickyData.stickyColor }}
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-2 mx-3">
            <label
              htmlFor="textColor"
              className="text-black text-[15px] font-semibold"
            >
              Text Color
            </label>
            <input
              type="color"
              name="textColor"
              id="textColor"
              value={stickyData.textColor}
              onChange={(e) =>
                setStickyData((prevData) => ({
                  ...prevData,
                  textColor: e.target.value,
                }))
              }
              style={{ backgroundColor: stickyData.textColor }}
            />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center">
          <Button
            wid="w-[167px]"
            hgt="h-[35px]"
            bgColor="bg-purple-600"
            hoverBgColor="hover:bg-purple-700"
            borderColor="border-purple-700"
            buttonName="Add Sticky"
          />
        </div>
      </form>
    </div>
  );
};

export default Addsticky;
