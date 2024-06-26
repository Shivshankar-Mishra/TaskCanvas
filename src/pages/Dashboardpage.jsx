// import React from 'react'

import Progress from "../components/Progress";
import Summary from "../components/Summary";

const Dashboardpage = () => {
  return (
    <div className="w-screen flex flex-col md:flex-row flex-wrap justify-center md:justify-around items-start gap-10 md:gap-0 mt-7 md:mt-10">
      <Summary />
      <Progress />
    </div>
  );
};

export default Dashboardpage;
