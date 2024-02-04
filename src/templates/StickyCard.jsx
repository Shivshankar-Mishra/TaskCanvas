// import React from 'react'
import { useState } from "react";
import { useStore } from "../context/StoreContext";
import CardPin from "../assets/Cardpin.svg";
import DeleteIcon from "../assets/delete.svg";

const StickyCard = (props) => {
  const { stickyNote } = props;
  const { togglePin, deleteSticky } = useStore();
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handlePinToggle = () => {
    togglePin(stickyNote.id);
  };

  const handleDeleteSticky = () => {
    deleteSticky(stickyNote.id);
  };

  const cardStyle = {
    backgroundColor: stickyNote.stickyColor,
    // borderColor: stickyNote.stickyColor, // Optionally, set border color as well
  };

  const titleStyle = {
    color: stickyNote.textColor,
  };
  return (
    <div
      className="relative flex flex-col justify-center items-center gap-3 w-[198px] h-[198px] bg-opacity-70 shadow-lg mt-5 md:mt-3"
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {stickyNote.pinned && (
        <img
          src={CardPin}
          alt="Pin"
          className="w-10 h-auto absolute -top-1 -left-1"
        />
      )}
      {hovered && (
        <button
          className="w-16 h-9 absolute -bottom-4 right-16 text-white bg-slate-600 hover:bg-slate-800 font-bold border-2 border-slate-800 px-1 py-[2px] rounded-xl"
          onClick={handlePinToggle}
        >
          {stickyNote.pinned ? "Unpin" : "Pin"}
        </button>
      )}
      {hovered && (
        <button
          onClick={handleDeleteSticky}
          className="w-12 absolute -bottom-4 right-2 bg-red-500 hover:bg-red-700 rounded-xl shadow-md border-2 border-red-700 px-2 py-[2px]"
        >
          <img src={DeleteIcon} alt="delete button " className="w-7 h-7" />
        </button>
      )}
      <h2
        className="w-[180px] h-auto break-words text-center text-[13px] leading-4 font-semibold mt-0"
        style={titleStyle}
      >
        {stickyNote.title}
      </h2>
      <p
        className="w-[190px] h-[130px] overflow-hidden break-words text-left text-xs font-normal pl-1"
        style={titleStyle}
      >
        {stickyNote.description}
      </p>
    </div>
  );
};

export default StickyCard;
