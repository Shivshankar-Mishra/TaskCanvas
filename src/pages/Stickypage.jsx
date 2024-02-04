// import React from 'react'

import Addsticky from "../components/Addsticky";
import Stickynotes from "../components/Stickynotes";

const Stickypage = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap justify-around items-center md:items-start gap-8 md:gap-0 mt-8">
      <Addsticky />
      <Stickynotes />
    </div>
  );
};

export default Stickypage;
