// import React from 'react'

import Addtask from "../components/Addtask";
import Taskcards from "../components/Taskcards";
import Tasktable from "../components/Tasktable";
// import Input from "../templates/Input";

const Todopage = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row flex-wrap justify-around items-center gap-8 md:gap-0 my-10">
        <Addtask />
        <Taskcards />
      </div>
      <div className="flex justify-center items-center md:-mt-[40px]">
        <Tasktable />
      </div>
    </>
  );
};

export default Todopage;
