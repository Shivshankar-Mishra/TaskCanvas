// import React from 'react'
import Pinicon from "../assets/pin.svg";
import { useStore } from "../context/StoreContext";
import StickyCard from "../templates/StickyCard";

const Stickynotes = () => {
  const { stickyNotes } = useStore();
  return (
    <div className="flex flex-col items-start justify-center gap-5">
      <div className="flex flex-row justify-between items-center">
        <img
          src={Pinicon}
          alt="pin icon"
          className="w-[60px] md:w-[80px] md:h-[77.52px]"
        />
        <div className="flex flex-col justify-between items-start">
          <h2 className="text-stone-900 text-2xl md:text-3xl font-bold">
            All Sticky Notes
          </h2>
          <p className="text-stone-500 text-lg font-normal">
            View and organize all the sticky notes.
          </p>
        </div>
      </div>
      <div className="w-[94vw] h-[70vh] md:w-[900px] md:h-[550px] bg-blue-100 border-2 border-solid border-blue-500 rounded-[30px] flex flex-row flex-wrap justify-center md:justify-between items-start px-5 py-2 overflow-scroll">
        {stickyNotes.length === 0 ? (
          <p className="text-stone-600 text-xl font-normal leading-[30px] mx-auto my-16 py-10">
            No Sticky notes are available.
          </p>
        ) : (
          stickyNotes.map((stickyNote,index) => (
            <StickyCard key={index} stickyNote={stickyNote} />
          ))
        )}
      </div>
    </div>
  );
};

export default Stickynotes;
